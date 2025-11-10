import type { JSX } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LiaGithub } from 'react-icons/lia';
import { useEffect, useRef } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useProject } from "../contexts/ProjectContext";


interface SeeMoreCardProps {
    invisible?: boolean;
    className?: string
}

const SeeMoreCard = ({ invisible = false, className }: SeeMoreCardProps): JSX.Element => {
    const {language} = useLanguage();
    const seeMoreArticleRef = useRef<HTMLElement>(null);
    const {changeProject} = useProject();

    useEffect(() => {
            const article = seeMoreArticleRef.current;
            if (!article) return;
            
            const initNavigate = () => {
                window.open("https://github.com/soustern?tab=repositories", "_blank");
                // This is necessary to fix a weird bug where project Screen is coming up even though pointer events are disabled on the parent card
                changeProject(null);
            };
    
            article.addEventListener("click", initNavigate);
    
            return () => {
                article.removeEventListener("click", initNavigate);
            };
            
        },);
 
    return (
        <article ref={seeMoreArticleRef} className={`max-w-sm md:max-w-xl xl:max-w-[600px] w-full bg-[var(--color-bg-secondary)] border-[1px] border-gray-700 rounded-xl overflow-hidden shadow-black/20 ${invisible ? " pointer-events-none invisible" : ""} cursor-pointer transform hover:shadow-xl transition-shadow flex flex-col justify-center items-center ${className}`}>
            <div className="">
                <MdOutlineOpenInNew size={20} color="#6a7282" className="absolute top-2 right-2"></MdOutlineOpenInNew>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-1 -mt-4">
                <LiaGithub size={85} color="#6a7282"></LiaGithub>
                <h3 className="text-base font-semibold leading-tight tracking-tight text-gray-300">{language === "En" ? "See more at GitHub" : "Veja mais no github"}</h3>
            </div>
        </article>
    )
}

export default SeeMoreCard;