"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockProjects, Project } from "@/lib/mockData";

interface ProjectContextType {
  selectedProject: Project;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  projects: Project[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>("proj-amar-chsl");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("ashapura_selected_project");
    if (saved && mockProjects.some(p => p.id === saved)) {
      setSelectedProjectIdState(saved);
    }
  }, []);

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id);
    localStorage.setItem("ashapura_selected_project", id);
  };

  const selectedProject = mockProjects.find(p => p.id === selectedProjectId) || mockProjects[0];

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        selectedProjectId,
        setSelectedProjectId,
        projects: mockProjects,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
