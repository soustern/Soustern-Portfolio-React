import type { IconType } from "react-icons";
import TextStandard from "./TextStandard";

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
    invisible?: boolean
}

const ProjectCard = ({project, invisible = false}: ProjectCardProps) => {
    const Icon = project.icon;
    return (
        <article className={`max-w-sm md:max-w-xl xl:max-w-[600px] w-full bg-[var(--color-bg-secondary)] border-[1px] border-gray-700 rounded-xl overflow-hidden shadow-black ${invisible ? " pointer-events-none invisible" : ""}`}>
            <div className="border-b-[1px] border-gray-700">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[100px] md:max-h-[150px] object-cover mix-blend-screen"
                />
            </div>
            <div className="p-3 md:p-4 lg:p-6 space-y-1">
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
                <div className="overflow-hidden relative pt-2 lg:pt-3">
                    <div className="marquee flex whitespace-nowrap animate-marquee gap-1 relative">
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <TextStandard importance="metadata">{project.stack}</TextStandard>
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-bg-secondary)] from-5% to-transparent to-100% pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg-secondary)] from-5% to-transparent to-100% pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard;