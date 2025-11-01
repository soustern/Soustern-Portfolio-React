import { useEffect, useRef } from "react";
import { useProject } from "../components/contexts/ProjectContext";
import PranceCompany from "../components/ui/PranceCompany";
import { AnimatePresence, motion } from "motion/react";

interface ProjectScreenProps {
    fontsReady: boolean
}

const ProjectScreen = ({fontsReady}: ProjectScreenProps) => {
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
        <AnimatePresence>
            <motion.article key="project-screen" id="project-screen" className="fixed inset-0 h-[100vh] w-[100vw] z-60 py-15 flex justify-center items-center">
                <motion.div key="blur-background" id="blur-background" exit={{opacity: 0}} transition={{ duration: 0.2 }} initial={{opacity: 0}} animate={{opacity: 1}} ref={projectScreenBackgroundDesktopRef} className="absolute inset-0 w-full h-full backdrop-blur-sm z-60">
                </motion.div>
                {currentProject === 2 && <PranceCompany fontsReady={fontsReady}/>}
            </motion.article>
        </AnimatePresence>
    )
}

export default ProjectScreen;