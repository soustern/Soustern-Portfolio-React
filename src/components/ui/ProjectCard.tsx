import type { IconType } from "react-icons";
import TextStandard from "./TextStandard";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useProject } from "../contexts/ProjectContext";

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        image: string;
        icon: IconType;
        type: string;
        Year: string;
        stack: string;
    }; 
    invisible?: boolean,
    page?: number
}

const ProjectCard = ({project, invisible = false, page}: ProjectCardProps) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLElement>(null);
    const {currentProject, changeProject} = useProject();

    useGSAP(() => {
        const marquee = marqueeRef.current;
        const article = articleRef.current;
        if (!marquee || !article) return;

        const marqueeWidth = marquee.offsetWidth;

        const tl = gsap.timeline({paused: true});
        tl.to(marquee, {
            x: -marqueeWidth,
            ease: "none",
            repeat: -1,
            fill: "forwards",
            duration: 10,
        });

        const initAnimationEnter = () => tl.play();
        const initAnimationExit = () => tl.pause();

        article.addEventListener("mouseenter", () => {
            initAnimationEnter();
        });

        article.addEventListener("mouseout", () => {
            initAnimationExit();
        });

        return () => {
            article.removeEventListener("mouseenter", initAnimationEnter)
            article.removeEventListener("mouseout", initAnimationExit)
        };
    }, [page]);

    useEffect(() => {
        const article = articleRef.current;
        if (!article) return;
        
        // TODO: See why there is a delay on the change here
        const initChangeProject = () => {
            changeProject(project.id);
            console.log(currentProject);
        };

        article.addEventListener("click", initChangeProject);

        return () => {
            article.removeEventListener("click", initChangeProject);
        };
        
    },);

    const Icon = project.icon;
    return (
        <article ref={articleRef} className={`max-w-sm md:max-w-xl xl:max-w-[600px] w-full bg-[var(--color-bg-secondary)] border-[1px] border-gray-700 rounded-xl overflow-hidden shadow-black/20 ${invisible ? " pointer-events-none invisible" : ""} cursor-pointer transform hover:shadow-xl transition-shadow`}>
            <div className="border-b-[1px] border-gray-700 pointer-events-none">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[100px] md:max-h-[150px] object-cover mix-blend-screen"
                />
            </div>
            <div className="p-3 md:p-4 lg:p-6 space-y-1 pointer-events-none">
                <div className="flex items-baseline gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                            <Icon className="w-6 h-6 text-[var(--color-accent-primary)]" />
                        </div>
                        <h3 className="text-base font-semibold leading-tight tracking-tight text-gray-300">
                            {project.title}
                        </h3>
                    </div>
                    <div className="flex-1"></div>
                    <TextStandard text={project.Year} importance="supporting"></TextStandard>
                </div>
                <div className="overflow-x-hidden relative pt-2 lg:pt-3">
                    <div ref={marqueeRef} className="flex flex-nowrap gap-2 relative whitespace-nowrap">
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                        <TextStandard className="" importance="metadata">{project.stack}</TextStandard>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-bg-secondary)] from-5% to-transparent to-100% pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg-secondary)] from-5% to-transparent to-100% pointer-events-none"></div>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard;