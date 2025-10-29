import { createContext, useContext, useState } from "react";

type ProjectContextType = {
    currentProject: number | null;
    changeProject:(projectNumber: number | null) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({children}: {children: React.ReactNode}) {
    // TODO: This state should be initialized as null after testing is done
    const [currentProject, setCurrentProject] = useState<number | null>(1);

    const changeProject = (projectNumber: number | null) => {
        setCurrentProject(projectNumber);
    }

    return (
        <ProjectContext.Provider value={{currentProject, changeProject}}>
            {children}
        </ProjectContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error(`useProject must be used inside a Project Provider`);
    }
    return context;
}