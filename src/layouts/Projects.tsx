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
    const [progressPercent, setProgressPercent] = useState(0);

    const cardsContainerDesktopRef = useRef<HTMLDivElement>(null);
    const progressBarDesktopRef = useRef<HTMLDivElement>(null);

    const exitTimelineRef = useRef<gsap.core.Timeline>(null);
    const entryTimelineRef = useRef<gsap.core.Timeline>(null);
    const page = useRef<number>(1);
    const direction = useRef<number>(1);

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

        if (!cardsContainerDesktopRef.current || !progressBarDesktopRef.current) return;

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

    useGSAP (() => {
        if (!progressBarDesktopRef.current) return;
        gsap.to(progressBarDesktopRef.current, {
            transformOrigin: () => direction.current === 1 ? 'right center' : 'left center',
            scaleX: 2,
            xPercent: () => progressPercent,
            duration: 0.35,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(progressBarDesktopRef.current, {
                    transformOrigin: () => direction.current === -1 ? 'left center' : 'right center',
                    scaleX: 1,
                    duration: 0.35,
                    fill: "forwards",
                    ease: "power2.inOut",
                });
                // gsap.to(progressBarDesktopRef.current, {
                //     xPercent: () => progressPercent,
                //     duration: 0.35,
                //     ease: "power2.inOut",
                // })
            }
        });
    }, [progressPercent]);

    function handleNext(): void {
        if (currentIndex >= projects.length - 1) return;
        if (isAnimating) return;
         direction.current = 1;
         setProgressPercent(progressPercent + 101);

        const entry = entryTimelineRef.current;
        const exit = exitTimelineRef.current;
        if (!exit || !entry) return;

        exit.restart();
        exit.eventCallback("onStart", () => {
            setIsAnimating(true);
        })
        exit.eventCallback("onComplete", () => {
            ++page.current;
            setIsAnimating(false);
            setCurrentIndex(currentIndex + 2);
            entry.restart();
        });
    }

    function handleBack(): void {
        if (currentIndex <= 0) return;
        if (isAnimating) return;
        direction.current = -1;
        setProgressPercent(progressPercent - 101);

        const entry = entryTimelineRef.current;
        const exit = exitTimelineRef.current;
        if (!exit || !entry) return;

        exit.restart();
        exit.eventCallback("onStart", () => {
            setIsAnimating(true);
        })
        exit.eventCallback("onComplete", () => {
            --page.current;
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
                <div className="flex max-w-[1200px] w-full flex-col gap-8 md:py-8 items-center">
                    <div className="max-w-[600px] w-full h-1 relative rounded-xl">
                        <div className="absolute inset-0 grid place-items-center grid-cols-3 w-full h-full gap-4">
                            <div className="h-1 border border-gray-700 w-full"></div>
                            <div className="h-1 border border-gray-700 w-full"></div>
                            <div className="h-1 border border-gray-700 w-full"></div>
                        </div>
                        <div className="w-full h-full gap-4 relative">
                            <div ref={progressBarDesktopRef} className={`h-1 bg-gray-400 w-[33%]`}></div>
                        </div>
                    </div>
                    <div  className="flex w-full justify-between gap-4 md:gap-8 ">
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