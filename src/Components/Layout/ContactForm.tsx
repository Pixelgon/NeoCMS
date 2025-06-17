'use client'
import { FC, FormEvent, useState, ChangeEvent, use } from "react";
import { Btn } from "./Btn";
import Input from "./Input";
import { Modal } from "./Modal";
import Textarea from "./TextArea";
import { FormType } from "@/types/FormType";
import { LayoutContext } from "@/context/LayoutContext";
import { useTopLoader } from 'nextjs-toploader';



interface ModalProps {
  setModalState: (state: boolean) => void;
  modalState: boolean;
}

export const ContactForm: FC<ModalProps> = ({ setModalState, modalState }) => {

  const loader = useTopLoader(); 

  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    message: "",
  });

  const layoutData = use(LayoutContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    loader.start();
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      loader.done();
      setModalState(false);
      setFormData({ name: "", email: "", message: "" });
      layoutData.showToast({ message: 'Zpráva byla úspěšně odeslána.', type: 'success' });
    } else {
      loader.done();
      const errorData = await response.json();
      layoutData.showToast({ message: `Něco se pokazilo.`, type: 'error' });
    }
  };

  return (
    <Modal modalState={modalState} setModalState={setModalState} title="Kontaktujte nás" asking>
      <form className="flex flex-col gap-2 w-full justify-center" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Jméno příjmení"
          name="name"
          id="name"
          label="Jméno*"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          placeholder="jmeno@email.cz"
          name="email"
          id="email"
          label="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Textarea
          placeholder="Vaše zpráva"
          name="message"
          id="message"
          label="Zpráva*"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Btn prim type="submit" className="mt-5">
          Odeslat
        </Btn>
      </form>
    </Modal>
  );
};

export default ContactForm;