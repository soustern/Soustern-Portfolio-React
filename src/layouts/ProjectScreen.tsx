import { useEffect } from "react";
import { useProject } from "../components/contexts/ProjectContext";
import PranceCompany from "../components/ui/PranceCompany";

const ProjectScreen = () => {
    const {currentProject} = useProject(); 

    useEffect(() => {

    }, [currentProject])

    return (
        <article className="fixed inset-0 h-[100vh] w-[100vw] z-60 py-15 flex justify-center items-center">
            <div className="absolute inset-0 w-full h-full backdrop-blur-sm z-60">
            </div>
            <PranceCompany/>
        </article>
    )
}

export default ProjectScreen;