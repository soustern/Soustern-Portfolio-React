import { useEffect, useRef } from "react";
import { useProject } from "../components/contexts/ProjectContext";
import PranceCompany from "../components/ui/PranceCompany";

const ProjectScreen = () => {
    const {currentProject, changeProject} = useProject(); 
    const projectScreenBackgroundDesktopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const background = projectScreenBackgroundDesktopRef.current;
        if (!background) return;

        const handleChangeProject = () => {
            changeProject(null);
        }
        background.addEventListener("click", handleChangeProject)

        return () => {
            background.removeEventListener("click", handleChangeProject)
        }

    }, )

    if (currentProject === null) return null;

    return (
        <article className="fixed inset-0 h-[100vh] w-[100vw] z-60 py-15 flex justify-center items-center">
            <div ref={projectScreenBackgroundDesktopRef} className="absolute inset-0 w-full h-full backdrop-blur-sm z-60">
            </div>
            {currentProject === 2 && <PranceCompany/>}
        </article>
    )
}

export default ProjectScreen;