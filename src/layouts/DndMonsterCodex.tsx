import { LiaTimesSolid } from 'react-icons/lia';
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import DndMonsterCodexHero from "../assets/images/dnd_monster_codex/dndMonsterCodexHero_11zon.webp";
import highlights from "../assets/images/dnd_monster_codex/highlights.gif";
import layout from "../assets/images/dnd_monster_codex/layout.gif";
import menu from "../assets/images/dnd_monster_codex/menu_11zon.webp";
import zombie from "../assets/images/dnd_monster_codex/zombie_11zon.webp";
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../components/contexts/LanguageContext';
import { useProject } from '../components/contexts/ProjectContext';
import TextStandard from '../components/ui/TextStandard';
import dndMonsterCodex from "../services/DndMonsterCodex.json";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface DndMonsterCodexProps {
    fontsReady: boolean;
}

const DndMonsterCodex = ({fontsReady}: DndMonsterCodexProps) => {
    const { language } = useLanguage();
    const {changeProject} = useProject();
    const buttonNavDesktopRef = useRef<HTMLButtonElement>(null);

    const strings = language === "En" ? dndMonsterCodex.En : dndMonsterCodex["Pt-Br"];

    const scrollerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const DndMonsterCodexHeroRef = useRef<HTMLImageElement>(null);
    const DndMonsterCodexOverview = useRef<HTMLDivElement>(null);
    const DndMonsterCodexContext = useRef<HTMLDivElement>(null);
    const DndMonsterCodexHighlights = useRef<HTMLDivElement>(null);
    const DndMonsterCodexProblem = useRef<HTMLDivElement>(null);
    const DndMonsterCodexFlow = useRef<HTMLDivElement>(null);
    const DndMonsterCodexLayout = useRef<HTMLDivElement>(null);
    const DndMonsterCodexInteractions = useRef<HTMLDivElement>(null);
    const DndMonsterCodexVisual = useRef<HTMLDivElement>(null);
    const DndMonsterCodexFinalDesign = useRef<HTMLDivElement>(null);
    const DndMonsterCodexRetrospective = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!fontsReady) return;

        const refs = [DndMonsterCodexHighlights, DndMonsterCodexProblem, DndMonsterCodexFlow, DndMonsterCodexLayout, DndMonsterCodexInteractions, DndMonsterCodexVisual, DndMonsterCodexFinalDesign, DndMonsterCodexRetrospective,];
        
        if (!sectionRef.current || !scrollerRef.current || !DndMonsterCodexHeroRef.current || !DndMonsterCodexOverview.current || !DndMonsterCodexContext.current) return;
        if (refs.some(ref => !ref)) return;

        gsap.from(DndMonsterCodexHeroRef.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(DndMonsterCodexOverview.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(DndMonsterCodexContext.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        const initAnimation = () => {
            refs.forEach(ref => {
                gsap.from(ref.current, {
                    x: -100, 
                    opacity: 0, 
                    duration: 0.3, 
                    ease: "power4.inOut", 
                    scrollTrigger:{
                        trigger: ref.current,
                        scroller: scrollerRef.current,
                        start: "top 85%",
                        once: true,
                    }
                });
            })
        }

        // This is necessary to make the full layout after rendering be taken into consideration when calculating the ScrollTrigger
        const initTimeout = setTimeout(initAnimation, 50);
        
        return () => {
            clearTimeout(initTimeout);
        }

    }, {dependencies: [fontsReady]});

    useEffect(() => {
        const button = buttonNavDesktopRef.current;
        if (!button) return;

        const handleChangeProject = () => {
            changeProject(null);
        }
        button.addEventListener("click", handleChangeProject)

        return () => {
            button.removeEventListener("click", handleChangeProject)
        }
    }, )
    
    // TODO: Add default padding to this sections
    // TODO: Add media queries to texts

    return (
    <AnimatePresence>
        <motion.div key="dnd-monster-codex" id="dnd-monster-codex"  exit={{opacity: 0}} transition={{ duration: 0.2 }} initial={{opacity: 0}} animate={{opacity: 1}} className="px-8 py-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] w-full h-full max-w-[1200px] z-70 rounded-xl border-[1px] border-gray-700 shadow-black/20 shadow-xl flex flex-col gap-4">
            <nav className="flex justify-between items-center text-gray-50 text-3xl ">
                <h3>Dnd Monster Codex</h3>
                <motion.button ref={buttonNavDesktopRef} whileTap={{scale: 0.8}} transition={{duration: 0.2, type: "spring"}} aria-controls="Close Project" className="cursor-pointer p-1 rounded-xl border-[1px] border-gray-700 hover:bg-gray-50/5 transition-colors" aria-label="Close Button"><LiaTimesSolid className="text-[30px] text-gray-300"></LiaTimesSolid></motion.button>
            </nav>
            <div className="flex gap-8 overflow-hidden">
                <div ref={scrollerRef} className="overflow-y-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-400/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/60">
                    <div ref={sectionRef} className='flex flex-col gap-12'>
                        <div>
                            <img alt={language === "en" ? "dnd-monster-codex Hero Image" : "Imagem de apresentação da dnd-monster-codex"} title={language === "en" ? "dnd-monster-codex Hero Image" : "Imagem de apresentação da dnd-monster-codex"} ref={DndMonsterCodexHeroRef} fetchPriority='high' src={DndMonsterCodexHero} className="rounded-xl border-[1px] border-gray-700" />
                        </div>
                        <section ref={DndMonsterCodexOverview} className=' scroll-mt-50 flex flex-col gap-4' id='Overview'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.title}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.overview}></TextStandard>
                            <div className='flex gap-8'>
                                <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://github.com/soustern/DND5-Monster-Codex" target="_blank"  rel="noopener noreferrer">Github Repo</a>
                                <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://dnd-5-monster-codex-fsuu6cic3-soustern.vercel.app/" target="_blank" rel="noopener noreferrer">Website</a>
                            </div>
                        </section>
                        <section ref={DndMonsterCodexContext} className=' scroll-mt-50 flex flex-col gap-4' id='Context'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.contextTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextProject}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextRole}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextTimeline}></TextStandard></li>
                                <li><TextStandard className='text-lg' text={strings.caseStudy.contextFocus}></TextStandard></li>
                            </ul>
                        </section>
                        <section ref={DndMonsterCodexHighlights} className=' scroll-mt-50 flex flex-col gap-4' id='Highlights'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlightsTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight1Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight1Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight2Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight2Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight3Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight3Desc}></TextStandard>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlight4Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.highlight4Desc}></TextStandard>
                            </div>
                            <img alt={language === 'en' ? "Main menu animation" : "Animação do menu principal"} title={language === 'en' ? "Main menu animation" : "Animação do menu principal"} className="rounded-xl border-[1px] border-gray-700" src={highlights}/>
                        </section>
                        <section ref={DndMonsterCodexProblem} className=' scroll-mt-50 flex flex-col gap-4' id='Problems'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.problemTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.problemDesc}></TextStandard>
                        </section>
                        <section ref={DndMonsterCodexFlow} className=' scroll-mt-50 flex flex-col gap-4' id='Flow'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.flowTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.flowDesc}></TextStandard>
                        </section>
                        <section ref={DndMonsterCodexLayout} className=' scroll-mt-50 flex flex-col gap-4' id='Layout'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.layoutDesc}></TextStandard>
                            <img alt={language === 'en' ? "Main menu animation Mobile" : "Animação do menu principal Mobile"} title={language === 'en' ? "Main menu animation Mobile" : "Animação do menu principal Mobile"} className="rounded-xl border-[1px] border-gray-700" src={layout} />
                        </section>
                        <section ref={DndMonsterCodexInteractions} className=' scroll-mt-50 flex flex-col gap-4' id='Interactions'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.interactionsTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.interactionsDesc}></TextStandard>
                        </section>
                        <section ref={DndMonsterCodexVisual} className=' scroll-mt-50 flex flex-col gap-4' id='VisualDesign'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.visualTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.visualDesc}></TextStandard>
                        </section>
                        <section ref={DndMonsterCodexFinalDesign} className=' scroll-mt-50 flex flex-col gap-4' id='FinalDesign'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.finalDesignsTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.design1Title}></TextStandard>
                            <img alt={language === 'en' ? "Menu on both mobile and desktop" : "Menu principal no mobile e desktop"} title={language === 'en' ? "Menu on both mobile and desktop" : "Menu principal no mobile e desktop"} className="rounded-xl border-[1px] border-gray-700" src={menu} />
                            <TextStandard className='text-lg' text={strings.caseStudy.design2Title}></TextStandard>
                            <img alt={language === 'en' ? "Information of the zombie query" : "Pesquisa do monstro zumbi"} title={language === 'en' ? "Information of the zombie query" : "Pesquisa do monstro zumbi"} className="rounded-xl border-[1px] border-gray-700" src={zombie} />
                        </section>
                        <section ref={DndMonsterCodexRetrospective} className=' scroll-mt-50 flex flex-col gap-4' id='Retrospective'>
                            <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.retrospectiveTitle}</h3>
                            <div className='w-full h-1 border-b-1 border-gray-600'></div>
                            <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc}></TextStandard>
                            <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveLearning}></TextStandard>
                        </section>
                    </div>
                </div>
                <aside className="hidden md:block">
                        <ul className="flex flex-col gap-8">
                            <TextStandard text="CONTENTS"></TextStandard>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Overview");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Overview" : "Visão geral"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Context");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Context" : "Contexto"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Highlights");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Highlights" : "Destaques"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Problems");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "The Problem" : "O Problema"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Flow");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Update Flow" : "Fluxo"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Layout");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Layout" : "Interface"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Interactions");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Interactions" : "Interações"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#VisualDesign");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Visual Design" : "Design Visual"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#FinalDesign");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Final Design" : "Design Final"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                            <li className="cursor-pointer group">
                                <button onClick={() => {
                                    const section = document.querySelector("#Retrospective");
                                    section?.scrollIntoView({ behavior: "smooth" });
                                }} className='cursor-pointer'>
                                    <TextStandard text={language === "En" ? "Retrospective" : "Retrospectiva"} importance="metadata" className="group-hover:text-gray-400"></TextStandard>
                                </button>
                            </li>
                        </ul>
                </aside>
            </div>
        </motion.div>
    </AnimatePresence>)
}


export default DndMonsterCodex;