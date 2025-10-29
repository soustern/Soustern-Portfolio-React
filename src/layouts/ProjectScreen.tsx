import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { useProject } from "../components/contexts/ProjectContext";
import { LiaTimesSolid } from 'react-icons/lia';
import { motion } from "motion/react";
import dnd from "../assets/images/dnd.png";
import TextStandard from "../components/ui/TextStandard";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const ProjectScreen = () => {
    const {currentProject} = useProject(); 
    const asideDesktopRef = useRef<HTMLElement>(null);

    useEffect(() => {

    }, [currentProject])

    return (
        <article className="fixed inset-0 h-[100vh] w-[100vw] z-60 py-15 flex justify-center items-center">
            <div className="absolute inset-0 w-full h-full backdrop-blur-sm z-60">
            </div>
            <div className="px-8 py-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] w-full h-full max-w-[1200px] z-70 rounded-xl border-[1px] border-gray-700 shadow-black/20 shadow-xl flex flex-col gap-4">
                <nav className="flex justify-between items-center text-gray-50 text-3xl ">
                    <h3>Boilerplate Project Name</h3>
                    <motion.button whileTap={{scale: 0.8}} transition={{duration: 0.2, type: "spring"}} aria-controls="Close Project" className="cursor-pointer p-1 rounded-xl border-[1px] border-gray-700 hover:bg-gray-50/5 transition-colors" aria-label="Close Button"><LiaTimesSolid className="text-[50px] text-gray-300"></LiaTimesSolid></motion.button>
                </nav>
                <div className="flex gap-12 overflow-hidden">
                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                        <div>
                            <div>
                                <img src={dnd} alt="" className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                            <div>
                                <img src={dnd} alt="" className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                            <div>
                                <img src={dnd} alt="" className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                            <div>
                                <img src={dnd} alt="" className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                        </div>
                    </div>
                    <aside ref={asideDesktopRef} className="">
                            <ul className="flex flex-col gap-8">
                                <TextStandard text="CONTENTS" importance="supporting"></TextStandard>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Overview" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Highlights" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Context" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="The Problem" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Update Flow" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Layout" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Interactions" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Visual Design" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Final Designs" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                                <li className="cursor-pointer group">
                                    <TextStandard text="Retrospective" importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </li>
                            </ul>
                    </aside>
                </div>
            </div>
        </article>
    )
}

export default ProjectScreen;