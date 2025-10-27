import { useEffect, useRef, useState} from "react";
import { useScroll } from "../components/contexts/ScrollContext";
import { AnimatePresence, motion } from "motion/react";
import dnd from "../assets/images/dnd.png";
import thx from "../assets/images/thx.png";
import todo from "../assets/images/todo.png";
import { LiaAddressCard } from 'react-icons/lia';
import { LiaDungeonSolid } from 'react-icons/lia';
import { LiaCogSolid } from 'react-icons/lia';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { LiaNetworkWiredSolid } from 'react-icons/lia';
import { LiaLongArrowAltLeftSolid } from 'react-icons/lia';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import ProjectCard from "../components/ui/ProjectCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Projects = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const cardsContainerDesktopRef = useRef<HTMLDivElement>(null);
    const exitTimelineRef = useRef<gsap.core.Timeline>(null);
    const entryTimelineRef = useRef<gsap.core.Timeline>(null);

    // TODO: Redo card design
    // TODO: Add supporting for portuguese
    const projects = [
        {
            id: 1,
            title: "Portfolio",
            icon: LiaAddressCard,
            image: thx,
            type: "Portfolio",
            Year: "2025",
            stack: " Tailwind CSS, HTML, React.JS , UX, UI, NPM, Motion, GSAP, Vite, OGL, WebGl, GLSL, JSON, Media Production, Art Direction, ",
            next: 2,
        },
        {
            id: 2,
            title: "DND Monster Codex",
            icon: LiaDungeonSolid,
            image: dnd,
            type: "Project",
            Year: "2024",
            stack: " CSS, SASS, HTML, JS, UX, UI, NPM, Media Production, Art Direction, API, Vercel, ",
            next: 3,
        },
        {
            id: 3,
            title: "SLS",
            icon: LiaCogSolid,
            image: thx,
            type: "Project",
            Year: "2023",
            stack: "C, Linux, CLI, ",
            next: 4,
        },
        {
            id: 4,
            title: "To Do App",
            icon: LiaClipboardListSolid,
            image: todo,
            type: "Project",
            Year: "2025",
            stack: " JavaScript, CSS, HTML, UX, UI, NPM, ",
            next: 5,
        },
        {
            id: 5,
            title: "Prance Company",
            icon: LiaNetworkWiredSolid,
            image: thx,
            type: "Product",
            Year: "2024",
            stack: " Tailwind CSS, React, TypeScript, UX, UI, NPM, Brand Design, Naming & Copywriting, Google Search Console, Google Analytics, Github Pages, DevOps, ",
            next: null
        },
    ];

    const sectionRef = useRef<HTMLElement>(null)
    const [shouldRender, setShouldRender] = useState(true);

    const {scrollProgress} = useScroll();

    useEffect(() => {
        if (scrollProgress >= 19 && scrollProgress <= 38)
        {
            setShouldRender(true);
        }
        else 
        {
            setShouldRender(false);
        };
    }, [scrollProgress]);

    useGSAP (() => {

        if (!cardsContainerDesktopRef.current) return;

        const [upperCard, lowerCard] = cardsContainerDesktopRef.current.children;

        exitTimelineRef.current = gsap.timeline({ paused: true })
        .to([upperCard, lowerCard], {
             y: 100, 
             opacity: 0, 
             stagger: 0.15, 
             duration: 0.15, 
             ease: "power4.out" 
        });

        entryTimelineRef.current = gsap.timeline()
        .from([upperCard, lowerCard], {
            y: 100,
            opacity: 0,
            duration: 0.15,
            ease: "power4.in",
            stagger: 0.15
        });
    }, [shouldRender]);

    function handleNext(): void {
        if (currentIndex >= projects.length - 1) return;
        if (isAnimating) return;

        const entry = entryTimelineRef.current;
        const exit = exitTimelineRef.current;
        if (!exit || !entry) return;

        exit.restart();
        exit.eventCallback("onStart", () => {
            setIsAnimating(true);
        })
        exit.eventCallback("onComplete", () => {
            setIsAnimating(false);
            setCurrentIndex(currentIndex + 2);
            entry.restart();
        });

        console.log(currentIndex);
    }

    function handleBack(): void {
        if (currentIndex <= 0) return;
        if (isAnimating) return;

        const entry = entryTimelineRef.current;
        const exit = exitTimelineRef.current;
        if (!exit || !entry) return;

        exit.restart();
        exit.eventCallback("onStart", () => {
            setIsAnimating(true);
        })
        exit.eventCallback("onComplete", () => {
            setIsAnimating(false);
            setCurrentIndex(currentIndex - 2);
            entry.restart();
        });
    }

    // TODO: Make responsive version
    // TODO: Make transition animations
    // TODO: Make hover animations
    // TODO: Make pages

    return (
        <AnimatePresence>
            {shouldRender && 
            <section 
                ref={sectionRef} 
                id='Projects' 
                className='flex items-center justify-center w-full h-full'
            >
                <div className="flex max-w-[1200px] max height aqui w-full flex-col gap-4 md:py-8 ">
                    <div className="max-w-[600px] w-full bg-amber-100 h-1 ">

                    </div>
                    <div className="flex w-full justify-between gap-4 md:gap-8 ">
                        <motion.button onClick={handleBack} whileTap={{scale: 0.95}} transition={{duration: 0.2, type: "spring"}} className={`w-full max-w-[70px] flex justify-center items-center border border-gray-700 rounded-xl hover:bg-gray-50/2 hover:cursor-pointer hover:border-gray-400 group transition-colors transition-opacity p-3 ${isAnimating ? "pointer-events-none" : ""} ${currentIndex <= 0 ? "pointer-events-none opacity-0" : ""}`}>
                            <LiaLongArrowAltLeftSolid className="text-4xl text-gray-700 group-hover:text-gray-400 transition-colors"></LiaLongArrowAltLeftSolid>
                        </motion.button>
                        <div ref={cardsContainerDesktopRef} className="flex flex-col gap-4 w-full items-center min-h-0">
                                <ProjectCard project={projects[currentIndex]}></ProjectCard>
                                {currentIndex === projects.length - 1 ? <ProjectCard project={projects[currentIndex]} invisible={true}></ProjectCard> : <ProjectCard project={projects[currentIndex + 1]}></ProjectCard>}
                        </div>
                        <motion.button onClick={handleNext} whileTap={{scale: 0.95}} transition={{duration: 0.2, type: "spring"}} className={`w-full max-w-[70px] flex justify-center items-center border border-gray-700 rounded-xl hover:bg-gray-50/2 hover:cursor-pointer hover:border-gray-400 group transition-colors transition-opacity p-3 ${isAnimating ? "pointer-events-none" : ""} ${currentIndex >= projects.length - 1 ? "pointer-events-none opacity-0" : ""}`}>
                            <LiaLongArrowAltRightSolid className="text-4xl text-gray-700 group-hover:text-gray-400 transition-colors"></LiaLongArrowAltRightSolid>
                        </motion.button>
                    </div>
                </div>
            </section>}
        </AnimatePresence>
    )
};

export default Projects;