import { useEffect, useRef, useState} from "react";
import { useScroll } from "../components/contexts/ScrollContext";
import { AnimatePresence } from "motion/react";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import TextStandard from "../components/ui/TextStandard";

const Projects = () => {

    // TODO: Redo card design
    // TODO: Add supporting for portuguese
    const projects = [
        {
            id: 1,
            title: "Portfolio",
            icon: {
                iconType: "solid",
                icon: "address-card",
            },
            image: "src/assets/images/thx.png",
            type: "Portfolio",
            Year: "2025",
            stack: " Tailwind CSS, HTML, React.JS , UX, UI, NPM, Motion, GSAP, Vite, OGL, WebGl, GLSL, JSON, Media Production, Art Direction, ",
        },
        {
            id: 2,
            title: "DND Monster Codex",
            icon: {
                iconType: "solid",
                icon: "dungeon",
            },
            image: "src/assets/images/dnd.png",
            type: "Project",
            Year: "2024",
            stack: " CSS, SASS, HTML, JS, UX, UI, NPM, Media Production, Art Direction, API, Vercel, ",
        },
        {
            id: 3,
            title: "SLS",
            icon: {
                iconType: "brands",
                icon: "ubuntu",
            },
            image: "src/assets/images/thx.png",
            type: "Project",
            Year: "2023",
            stack: "C, Linux, CLI, ",
        },
        {
            id: 4,
            title: "To Do App",
            icon: {
                iconType: "solid",
                icon: "list-check",
            },
            image: "src/assets/images/todo.png",
            type: "Project",
            Year: "2025",
            stack: " JavaScript, CSS, HTML, UX, UI, NPM, ",
        },
        {
            id: 5,
            title: "THX Digital",
            icon: {
                iconType: "solid",
                icon: "table",
            },
            image: "src/assets/images/thx.png",
            type: "Product",
            Year: "2024",
            stack: " CSS, SASS, HTML, UX, UI, NPM, Brand Design, Media Production, Naming & Copywriting, ",
        },
        {
            id: 6,
            title: "Prime Led",
            icon: {
                iconType: "solid",
                icon: "lightbulb",
            },
            image: "src/assets/images/prime.png",
            type: "Product",
            Year: "2025",
            stack: " CSS, SASS, HTML, UX, UI, NPM, Media Production, Naming & Copywriting, ",
        }
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
                className='flex items-center justify-center w-full h-full px-6 lg:px-8 py-8 lg:py-12 pr-20'
            >
                <div className="grid flex-1 grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-[1500px] max-h-full py-4">
                    {projects.slice(0, 2).map(project => (
                        <article key={project.id} className="bg-[var(--color-bg-secondary)] border-[1px] border-gray-700 rounded-xl overflow-hidden shadow-black col-span-2"
                        >
                            <div className="border-b-[1px] border-gray-700">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto aspect-[10/3] object-cover mix-blend-screen"
                                />
                            </div>
                            <div className="p-4 lg:p-6 space-y-1">
                                <div className="flex items-baseline gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-shrink-0">
                                            <PrimaryIcon
                                                icon={project.icon.icon}
                                                iconType={project.icon.iconType}
                                                className="text-[var(--color-accent-primary)]"
                                            />
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
                    ))}
                    {projects.slice(2).map(project => (
                        <article 
                            key={project.id} 
                            className="overflow-hidden bg-[var(--color-bg-secondary)]  border-[1px] border-gray-700 rounded-xl  shadow-black"
                        >
                            <div className="border-b-[1px] border-gray-700">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto aspect-[2/1] object-cover mix-blend-screen"
                                />
                            </div>
                            <div className="p-4 lg:p-6 space-y-1">
                                <div className="flex items-baseline gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-shrink-0">
                                            <PrimaryIcon
                                                icon={project.icon.icon}
                                                iconType={project.icon.iconType}
                                                className="text-[var(--color-accent-primary)]"
                                            />
                                        </div>
                                        <h3 className="text-base font-semibold leading-tight tracking-tight text-gray-300">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="flex-1"></div>
                                    <TextStandard text={project.Year} importance="supporting"></TextStandard>
                                </div>
                                <div className="overflow-hidden relative pt-2 lg:pt-3">
                                    <div className="marquee flex whitespace-nowrap animate-marquee gap-1">
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
                    ))}
                </div>
            </section>}
        </AnimatePresence>
    )
};

export default Projects;