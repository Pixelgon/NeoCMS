import { FC, useState, useEffect, useContext } from "react";
import { TagType } from "@/types/TagType";
import { Btn } from "./Btn";
import Input from "./Input";
import { Dialog } from "./Dialog";
import { LayoutContext } from "@/context/LayoutContext";
import { useTopLoader } from "nextjs-toploader";
import { Modal } from "./Modal";
import Image from "next/image";

interface TagEditorProps {
   modalState: boolean;
   setModalState: (state: boolean) => void;
}

export const TagEditor: FC<TagEditorProps> = ({ modalState, setModalState }) => {
   const [tags, setTags] = useState<TagType[]>([]);
   const [newTagName, setNewTagName] = useState("");
   const [editedTags, setEditedTags] = useState<Record<string, string>>({});
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [tagToDelete, setTagToDelete] = useState<TagType | null>(null);
   const [loading, setLoading] = useState(false);
   
   const layoutData = useContext(LayoutContext);
   const loader = useTopLoader();

   // Načtení tagů při otevření editoru
   useEffect(() => {
      if (modalState) {
         loadTags();
      }
   }, [modalState]);

   const loadTags = async () => {
      try {
         setLoading(true);
         const response = await fetch('/api/tags');
         if (response.ok) {
            const data = await response.json();
            setTags(data);
         }
      } catch (error) {
         layoutData?.showToast({ message: 'Chyba při načítání tagů', type: 'error' });
      } finally {
         setLoading(false);
      }
   };

   const createTag = async () => {
      if (!newTagName.trim()) return;

      try {
         loader.start();
         const response = await fetch('/api/tags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newTagName.trim() }),
         });

         if (response.ok) {
            const newTag = await response.json();
            setTags(prev => [...prev, newTag]);
            setNewTagName("");
            layoutData?.showToast({ message: 'Tag byl vytvořen', type: 'success' });
         } else {
            layoutData?.showToast({ message: 'Chyba při vytváření tagu', type: 'error' });
         }
      } catch (error) {
         layoutData?.showToast({ message: 'Chyba při vytváření tagu', type: 'error' });
      } finally {
         loader.done();
      }
   };

   const updateTag = async (tagId: string) => {
      const newName = editedTags[tagId];
      if (!newName?.trim()) return;
      
      const originalTag = tags.find(t => t.id === tagId);
      if (!originalTag) return;
      
      // Zabránit uložení, pokud se nic nezměnilo
      if (newName.trim() === originalTag.name) {
         setEditedTags(prev => {
            const updated = { ...prev };
            delete updated[tagId];
            return updated;
         });
         return;
      }

      try {
         loader.start();
         const response = await fetch('/api/tags', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: tagId, name: newName.trim() }),
         });

         if (response.ok) {
            const updatedTag = await response.json();
            setTags(prev => prev.map(tag => tag.id === updatedTag.id ? updatedTag : tag));
            setEditedTags(prev => {
               const updated = { ...prev };
               delete updated[tagId];
               return updated;
            });
            layoutData?.showToast({ message: 'Tag byl aktualizován', type: 'success' });
         } else {
            layoutData?.showToast({ message: 'Chyba při aktualizaci tagu', type: 'error' });
         }
      } catch (error) {
         layoutData?.showToast({ message: 'Chyba při aktualizaci tagu', type: 'error' });
      } finally {
         loader.done();
      }
   };

   const deleteTag = async (tag: TagType) => {
      try {
         loader.start();
         const response = await fetch('/api/tags', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: tag.id }),
         });

         if (response.ok) {
            setTags(prev => prev.filter(t => t.id !== tag.id));
            layoutData?.showToast({ message: 'Tag byl smazán', type: 'success' });
         } else {
            layoutData?.showToast({ message: 'Chyba při mazání tagu', type: 'error' });
         }
      } catch (error) {
         layoutData?.showToast({ message: 'Chyba při mazání tagu', type: 'error' });
      } finally {
         loader.done();
         setDeleteDialog(false);
         setTagToDelete(null);
      }
   };

   const handleTagChange = (tagId: string, value: string) => {
      setEditedTags(prev => ({
         ...prev,
         [tagId]: value
      }));
   };

   const cancelEdit = (tagId: string) => {
      setEditedTags(prev => {
         const updated = { ...prev };
         delete updated[tagId];
         return updated;
      });
   };

   const openDeleteDialog = (tag: TagType) => {
      setTagToDelete(tag);
      setDeleteDialog(true);
   };

   const handleDeleteConfirm = (confirm: boolean) => {
      if (confirm && tagToDelete) {
         deleteTag(tagToDelete);
      } else {
         setDeleteDialog(false);
         setTagToDelete(null);
      }
   };

   return (
      <>
         <Modal modalState={modalState} setModalState={setModalState} title="Správa tagů">
                         {/* Seznam tagů */}
               <div className="flex flex-col gap-2">
                  {loading ? (
                     <p className="text-wh text-center">Načítám tagy...</p>
                  ) : tags.length === 0 ? (
                     <p className="text-wh text-center">Žádné tagy</p>
                  ) : (
                     tags.map((tag) => {
                        const currentValue = editedTags[tag.id] ?? tag.name;
                        const isChanged = editedTags[tag.id] !== undefined && editedTags[tag.id] !== tag.name;
                        
                        return (
                           <div key={tag.id} className="flex items-center gap-2">
                              <Input
                                 type="text"
                                 value={currentValue}
                                 onChange={(e) => handleTagChange(tag.id, e.target.value)}
                                 name={`tag-${tag.id}`}
                                 id={`tag-${tag.id}`}
                                 label=""
                                 className="flex-grow"
                                 required={false}
                              />
                              
                              {isChanged && (
                                 <>
                                    <Btn 
                                       type="button" 
                                       onClick={() => updateTag(tag.id)}
                                       prim 
                                       disabled={!currentValue.trim()}
                                    >
                                       💾
                                    </Btn>
                                    <Btn type="button" onClick={() => cancelEdit(tag.id)}       
>
                                       revert
                                    </Btn>
                                 </>
                              )}
                              <Btn 
                                 type="button" 
                                 onClick={() => openDeleteDialog(tag)}
                                 prim
                              >
                                 <Image src={'/images/icons/binSolid.svg'} alt={'Delete'} width={16} height={16} className={'w-4 h-4'}/>
                              </Btn>
                           </div>
                        );
                     })
                  )}
               </div>
               {/* Přidání nového tagu */}
               <form onSubmit={(e) => { e.preventDefault(); createTag(); }} className="flex gap-2 mt-2">
                  <Input
                     type="text"
                     placeholder="Název nového tagu"
                     value={newTagName}
                     onChange={(e) => setNewTagName(e.target.value)}
                     name="new-tag"
                     id="new-tag"
                     label="Vytvořit nový tag"
                     className="flex-grow"
                     required={false}
                  />
                  <Btn type="submit" prim disabled={!newTagName.trim()}>
                     Přidat
                  </Btn>
               </form>
         </Modal>

         {/* Potvrzení mazání */}
         <Dialog DialogState={deleteDialog}>
            <h4 className="text-wh font-quicksand text-lg">
               Opravdu chcete smazat tag "{tagToDelete?.name}"?
            </h4>
            <div className="flex flex-wrap gap-4 w-full">
               <Btn className="flex-grow" onClick={() => handleDeleteConfirm(true)} type="button" prim>
                  Ano
               </Btn>
               <Btn className="flex-grow" onClick={() => handleDeleteConfirm(false)} type="button">
                  Ne
               </Btn>
            </div>
         </Dialog>
      </>
   );
};

export default TagEditor;
