'use client';
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Project from "./project";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { TagFilter } from "../tag/tagFilter";
import { Tag } from "@prisma/client";

interface ProjectData {
   id: string;
   name: string;
   slug: string;
   photo: string;
   description: string;
   tags: Tag[];
}

interface ProjectsListProps {
   projects: ProjectData[];
   availableTags: Tag[];
   initialTagSlugs?: string[];
}

export default function ProjectsList({ projects, availableTags, initialTagSlugs = [] }: ProjectsListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    // Funkce pro filtrování projektů
    const filterProjectsByTags = useCallback((tagIds: string[]) => {
        if (tagIds.length === 0) {
            setFilteredProjects(projects);
            return;
        }

        const filtered = projects.filter(project => 
            tagIds.some(tagId => 
                project.tags.some(tag => tag.id === tagId)
            )
        );
        setFilteredProjects(filtered);
    }, [projects]);

    // Inicializace tagů z URL při mount
    useEffect(() => {
        if (initialTagSlugs.length > 0) {
            const tagIds = availableTags
                .filter(tag => initialTagSlugs.includes(tag.slug))
                .map(tag => tag.id);
            
            if (tagIds.length > 0) {
                setSelectedTags(tagIds);
                filterProjectsByTags(tagIds);
            }
        }
    }, [initialTagSlugs, availableTags, filterProjectsByTags]);


    // Aktualizace URL při změně tagů
    const updateURL = (tagIds: string[]) => {
        const tagSlugs = availableTags
            .filter(tag => tagIds.includes(tag.id))
            .map(tag => tag.slug);

        const params = new URLSearchParams(searchParams);
        
        if (tagSlugs.length > 0) {
            params.delete('tag'); // Vymaž existující tag parametry
            tagSlugs.forEach(slug => params.append('tag', slug));
        } else {
            params.delete('tag');
        }

        const newURL = tagSlugs.length > 0 
            ? `/projekty?${params.toString()}`
            : '/projekty';

        router.push(newURL);
    };

    const handleTagToggle = (tagId: string) => {
        const newSelectedTags = selectedTags.includes(tagId)
            ? selectedTags.filter(id => id !== tagId)
            : [...selectedTags, tagId];
        
        setSelectedTags(newSelectedTags);
        filterProjectsByTags(newSelectedTags);
        updateURL(newSelectedTags);
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setFilteredProjects(projects);
        updateURL([]);
    };

    return (
        <>
            <TagFilter
                availableTags={availableTags}
                selectedTags={selectedTags}
                handleTagToggle={handleTagToggle}
                clearFilters={clearFilters}
            />

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-reg w-full">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <Project
                            key={project.id}
                            name={project.name}
                            photo={project.photo}
                            slug={project.slug}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <p className="text-center text-wh mt-8">
                    Žádné projekty neodpovídají vybraným filtrům.
                </p>
            )}
        </>
    );
}