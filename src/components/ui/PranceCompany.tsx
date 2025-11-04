import { LiaTimesSolid } from 'react-icons/lia';
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import pranceCompany from "../../services/PranceCompany.json";
import { useLanguage } from '../contexts/LanguageContext';
import TextStandard from './TextStandard';
import pranceCompanyHero from "../../assets/images/pranceCompanyHero.webp";
import pranceCompanyFlowImg from "../../assets/images/PranceCompanyHeroFlowImg.webp";
import pranceCompanyServiceDifference from "../../assets/images/PranceCompanyHeroServiceDifferenceImg.webp";
import pranceCompanyServiceStacking from "../../assets/images/pranceCompanyServiceStacking.gif";
import pranceCompanyMobileNav from "../../assets/images/pranceCompanyMobileNav.gif";
import pranceCompanyClientsImg from "../../assets/images/pranceCompanyClientsImg.webp";
import { useEffect, useRef } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useGSAP } from '@gsap/react';
import { useWindowSize } from '../../hooks/useWindowSize';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface PranceCompanyProps {
    fontsReady: boolean;
}

const PranceCompany = ({fontsReady}: PranceCompanyProps) => {
    const { language } = useLanguage();
    const {changeProject} = useProject();
    const buttonNavDesktopRef = useRef<HTMLButtonElement>(null);

    const pageSize = useWindowSize();

    console.log(fontsReady)

    const strings = language === "En" ? pranceCompany.En : pranceCompany["Pt-Br"];

    const scrollerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const pranceCompanyHeroRef = useRef<HTMLImageElement>(null);
    const pranceCompanyOverview = useRef<HTMLDivElement>(null);
    const pranceCompanyContext = useRef<HTMLDivElement>(null);
    const pranceCompanyHighlights = useRef<HTMLDivElement>(null);
    const pranceCompanyProblem = useRef<HTMLDivElement>(null);
    const pranceCompanyFlow = useRef<HTMLDivElement>(null);
    const pranceCompanyLayout = useRef<HTMLDivElement>(null);
    const pranceCompanyInteractions = useRef<HTMLDivElement>(null);
    const pranceCompanyVisual = useRef<HTMLDivElement>(null);
    const pranceCompanyFinalDesign = useRef<HTMLDivElement>(null);
    const pranceCompanyRetrospective = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!fontsReady) return;

        const refs = [pranceCompanyHighlights, pranceCompanyProblem, pranceCompanyFlow, pranceCompanyLayout, pranceCompanyInteractions, pranceCompanyVisual, pranceCompanyFinalDesign, pranceCompanyRetrospective,];
        
        if (!sectionRef.current || !scrollerRef.current || !pranceCompanyHeroRef.current || !pranceCompanyOverview.current || !pranceCompanyContext.current) return;
        if (refs.some(ref => !ref)) return;

        gsap.from(pranceCompanyHeroRef.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(pranceCompanyOverview.current, {
            x: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power4.inOut", 
        });

        gsap.from(pranceCompanyContext.current, {
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

    if (pageSize.width <= 900)
    {
        return (
        <AnimatePresence>
            <motion.div key="prance-company" id="prance-company"  exit={{opacity: 0}} transition={{ duration: 0.2 }} initial={{opacity: 0}} animate={{opacity: 1}} className="px-8 py-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] w-full h-full max-w-[1200px] z-70 rounded-xl border-[1px] border-gray-700 shadow-black/20 shadow-xl flex flex-col gap-4">
                <nav className="flex justify-between items-center text-gray-50 text-3xl">
                    <h3>Prance Company</h3>
                    <motion.button ref={buttonNavDesktopRef} whileTap={{scale: 0.8}} transition={{duration: 0.2, type: "spring"}} aria-controls="Close Project" className="cursor-pointer p-1 rounded-xl border-[1px] border-gray-700 hover:bg-gray-50/5 transition-colors" aria-label="Close Button"><LiaTimesSolid className="text-[30px] text-gray-300"></LiaTimesSolid></motion.button>
                </nav>
                <div className="flex gap-8 overflow-hidden">
                    <div ref={scrollerRef} className="overflow-y-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-400/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/60">
                        <div ref={sectionRef} className='flex flex-col gap-12'>
                            <div>
                                <img alt={language === "en" ? "Prance Company Hero Image" : "Imagem de apresentação da Prance Company"} title={language === "en" ? "Prance Company Hero Image" : "Imagem de apresentação da Prance Company"} ref={pranceCompanyHeroRef} fetchPriority='high' src={pranceCompanyHero} className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                            <section ref={pranceCompanyOverview} className=' scroll-mt-50 flex flex-col gap-4' id='Overview'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.title}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.overview}></TextStandard>
                                <div className='flex gap-8'>
                                    <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://github.com/soustern/Prance-Company/tree/main" target="_blank"  rel="noopener noreferrer">Github Repo</a>
                                    <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://www.prancecompany.com/" target="_blank" rel="noopener noreferrer">Website</a>
                                </div>
                            </section>
                            <section ref={pranceCompanyContext} className=' scroll-mt-50 flex flex-col gap-4' id='Context'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.contextTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextProject}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextRole}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextTimeline}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextClient}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextIndustry}></TextStandard></li>
                                </ul>
                            </section>
                            <section ref={pranceCompanyHighlights} className=' scroll-mt-50 flex flex-col gap-4' id='Highlights'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlightsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.performanceTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.performanceDesc}></TextStandard>
                                    <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                        <li className=''><TextStandard className='text-lg' text={strings.caseStudy.desktopScores}></TextStandard></li>
                                        <li><TextStandard className='text-lg' text={strings.caseStudy.mobileScores}></TextStandard></li>
                                    </ul>
                                    <TextStandard className='text-lg' text={strings.caseStudy.performanceTech}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.animationTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.animationDesc}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.responsiveTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.responsiveDesc}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.ciCdTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.ciCdDesc}></TextStandard>
                                </div>
                            </section>
                            <section ref={pranceCompanyProblem} className=' scroll-mt-50 flex flex-col gap-4' id='Problems'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.problemTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.problemDesc}></TextStandard>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal1}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal2}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal3}></TextStandard></li>
                                </ul>
                            </section>
                            <section ref={pranceCompanyFlow} className=' scroll-mt-50 flex flex-col gap-4' id='Flow'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.flowTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.flowDesc}></TextStandard>
                                <img alt={language === 'en' ? "Github Actions Flow Code Snippet" : "Pedaço de código do Github Actions"} title={language === 'en' ? "Github Actions Flow Code Snippet" : "Pedaço de código do Github Actions"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyFlowImg} />
                            </section>
                            <section ref={pranceCompanyLayout} className=' scroll-mt-50 flex flex-col gap-4' id='Layout'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutDesc}></TextStandard>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutBenefit1Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutBenefit1Desc}></TextStandard>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutBenefit2Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutBenefit2Desc}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutTech}></TextStandard>
                                <img alt={language === 'en' ? "Image Demonstration of the Services Section Layout" : "Imagem demonstrativa do layout da seção de serviços"} title={language === 'en' ? "Image Demonstration of the Services Section Layout" : "Imagem demonstrativa do layout da seção de serviços"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyServiceDifference} />
                            </section>
                            <section ref={pranceCompanyInteractions} className=' scroll-mt-50 flex flex-col gap-4' id='Interactions'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.interactionsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.interactionsDesc}></TextStandard>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.interactionsGsap}></TextStandard></li>
                                    <br />
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.interactionsFramer}></TextStandard></li>
                                </ul>
                                <img alt={language === 'en' ? "Gif Demonstration of the Services Section Animations" : "Gif demonstrativo das animações da seção de serviços"} title={language === 'en' ? "Gif Demonstration of the Services Section Animations" : "Gif demonstrativo das animações da seção de serviços"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyServiceStacking} />
                            </section>
                            <section ref={pranceCompanyVisual} className=' scroll-mt-50 flex flex-col gap-4' id='VisualDesign'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.visualTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.visualDesc}></TextStandard>
                            </section>
                            <section ref={pranceCompanyFinalDesign} className=' scroll-mt-50 flex flex-col gap-4' id='FinalDesign'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.finalDesignsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.navTitle}></TextStandard>
                                <img alt={language === 'en' ? "Gif Demonstration of the Mobile Navbar Animations" : "Gif demonstrativo das animações da navegação da versão mobile"} title={language === 'en' ? "Gif Demonstration of the Mobile Navbar Animations" : "Gif demonstrativo das animações da navegação da versão mobile"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyMobileNav} />
                                <TextStandard className='text-lg' text={strings.caseStudy.clientsTitle}></TextStandard>
                                <img alt={language === 'en' ? "GifDemonstration of the Client Section Layout" : "demonstrativo do layout da seção de clientes"} title={language === 'en' ? "GifDemonstration of the Client Section Layout" : "demonstrativo do layout da seção de clientes"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyClientsImg} />
                            </section>
                            <section ref={pranceCompanyRetrospective} className=' scroll-mt-50 flex flex-col gap-4' id='Retrospective'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.retrospectiveTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc1}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc2}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc3}></TextStandard>
                            </section>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>)   
    }
    else {
        return (
        <AnimatePresence>
            <motion.div key="prance-company" id="prance-company"  exit={{opacity: 0}} transition={{ duration: 0.2 }} initial={{opacity: 0}} animate={{opacity: 1}} className="px-8 py-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] w-full h-full max-w-[1200px] z-70 rounded-xl border-[1px] border-gray-700 shadow-black/20 shadow-xl flex flex-col gap-4">
                <nav className="flex justify-between items-center text-gray-50 text-3xl ">
                    <h3>Prance Company</h3>
                    <motion.button ref={buttonNavDesktopRef} whileTap={{scale: 0.8}} transition={{duration: 0.2, type: "spring"}} aria-controls="Close Project" className="cursor-pointer p-1 rounded-xl border-[1px] border-gray-700 hover:bg-gray-50/5 transition-colors" aria-label="Close Button"><LiaTimesSolid className="text-[30px] text-gray-300"></LiaTimesSolid></motion.button>
                </nav>
                <div className="flex gap-8 overflow-hidden">
                    <div ref={scrollerRef} className="overflow-y-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-400/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/60">
                        <div ref={sectionRef} className='flex flex-col gap-12'>
                            <div>
                                <img alt={language === "en" ? "Prance Company Hero Image" : "Imagem de apresentação da Prance Company"} title={language === "en" ? "Prance Company Hero Image" : "Imagem de apresentação da Prance Company"} ref={pranceCompanyHeroRef} fetchPriority='high' src={pranceCompanyHero} className="rounded-xl border-[1px] border-gray-700" />
                            </div>
                            <section ref={pranceCompanyOverview} className=' scroll-mt-50 flex flex-col gap-4' id='Overview'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.title}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.overview}></TextStandard>
                                <div className='flex gap-8'>
                                    <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://github.com/soustern/Prance-Company/tree/main" target="_blank"  rel="noopener noreferrer">Github Repo</a>
                                    <a className='text-lg font-semibold leading-tight tracking-tight text-gray-300 underline decoration-accent-secondary decoration-1' href="https://www.prancecompany.com/" target="_blank" rel="noopener noreferrer">Website</a>
                                </div>
                            </section>
                            <section ref={pranceCompanyContext} className=' scroll-mt-50 flex flex-col gap-4' id='Context'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.contextTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextProject}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextRole}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextTimeline}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextClient}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.contextIndustry}></TextStandard></li>
                                </ul>
                            </section>
                            <section ref={pranceCompanyHighlights} className=' scroll-mt-50 flex flex-col gap-4' id='Highlights'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.highlightsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.performanceTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.performanceDesc}></TextStandard>
                                    <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                        <li className=''><TextStandard className='text-lg' text={strings.caseStudy.desktopScores}></TextStandard></li>
                                        <li><TextStandard className='text-lg' text={strings.caseStudy.mobileScores}></TextStandard></li>
                                    </ul>
                                    <TextStandard className='text-lg' text={strings.caseStudy.performanceTech}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.animationTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.animationDesc}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.responsiveTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.responsiveDesc}></TextStandard>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.ciCdTitle}</h4>
                                    <TextStandard className='text-lg' text={strings.caseStudy.ciCdDesc}></TextStandard>
                                </div>
                            </section>
                            <section ref={pranceCompanyProblem} className=' scroll-mt-50 flex flex-col gap-4' id='Problems'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.problemTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.problemDesc}></TextStandard>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal1}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal2}></TextStandard></li>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.problemGoal3}></TextStandard></li>
                                </ul>
                            </section>
                            <section ref={pranceCompanyFlow} className=' scroll-mt-50 flex flex-col gap-4' id='Flow'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.flowTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.flowDesc}></TextStandard>
                                <img alt={language === 'en' ? "Github Actions Flow Code Snippet" : "Pedaço de código do Github Actions"} title={language === 'en' ? "Github Actions Flow Code Snippet" : "Pedaço de código do Github Actions"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyFlowImg}/>
                            </section>
                            <section ref={pranceCompanyLayout} className=' scroll-mt-50 flex flex-col gap-4' id='Layout'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutDesc}></TextStandard>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutBenefit1Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutBenefit1Desc}></TextStandard>
                                <h4 className='text-lg font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.layoutBenefit2Title}</h4>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutBenefit2Desc}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.layoutTech}></TextStandard>
                                <img alt={language === 'en' ? "Image Demonstration of the Services Section Layout" : "Imagem demonstrativa do layout da seção de serviços"} title={language === 'en' ? "Image Demonstration of the Services Section Layout" : "Imagem demonstrativa do layout da seção de serviços"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyServiceDifference} />
                            </section>
                            <section ref={pranceCompanyInteractions} className=' scroll-mt-50 flex flex-col gap-4' id='Interactions'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.interactionsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.interactionsDesc}></TextStandard>
                                <ul className='list-disc list-outside ml-6 marker:text-gray-400'>
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.interactionsGsap}></TextStandard></li>
                                    <br />
                                    <li><TextStandard className='text-lg' text={strings.caseStudy.interactionsFramer}></TextStandard></li>
                                </ul>
                                <img alt={language === 'en' ? "Gif Demonstration of the Services Section Animations" : "Gif demonstrativo das animações da seção de serviços"} title={language === 'en' ? "Gif Demonstration of the Services Section Animations" : "Gif demonstrativo das animações da seção de serviços"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyServiceStacking} />
                            </section>
                            <section ref={pranceCompanyVisual} className=' scroll-mt-50 flex flex-col gap-4' id='VisualDesign'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.visualTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.visualDesc}></TextStandard>
                            </section>
                            <section ref={pranceCompanyFinalDesign} className=' scroll-mt-50 flex flex-col gap-4' id='FinalDesign'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.finalDesignsTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.navTitle}></TextStandard>
                                <img alt={language === 'en' ? "Gif Demonstration of the Mobile Navbar Animations" : "Gif demonstrativo das animações da navegação da versão mobile"} title={language === 'en' ? "Gif Demonstration of the Mobile Navbar Animations" : "Gif demonstrativo das animações da navegação da versão mobile"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyMobileNav} />
                                <TextStandard className='text-lg' text={strings.caseStudy.clientsTitle}></TextStandard>
                                <img alt={language === 'en' ? "GifDemonstration of the Client Section Layout" : "demonstrativo do layout da seção de clientes"} title={language === 'en' ? "GifDemonstration of the Client Section Layout" : "demonstrativo do layout da seção de clientes"} className="rounded-xl border-[1px] border-gray-700" src={pranceCompanyClientsImg} />
                            </section>
                            <section ref={pranceCompanyRetrospective} className=' scroll-mt-50 flex flex-col gap-4' id='Retrospective'>
                                <h3 className='text-xl font-semibold leading-tight tracking-tight text-gray-300'>{strings.caseStudy.retrospectiveTitle}</h3>
                                <div className='w-full h-1 border-b-1 border-gray-600'></div>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc1}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc2}></TextStandard>
                                <TextStandard className='text-lg' text={strings.caseStudy.retrospectiveDesc3}></TextStandard>
                            </section>
                        </div>
                    </div>
                    <aside className="">
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
}

export default PranceCompany;