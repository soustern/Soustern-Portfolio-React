import {  useEffect, useRef, useState,  } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as createWebGLScenePainter } from "../utils/webglPainter";
import languageStrings from "../services/localisation.json"
import { useLanguage } from "../components/contexts/LanguageContext";
import TextStandard from "../components/ui/TextStandard";
import { AnimatePresence, motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScroll } from "../components/contexts/ScrollContext";
import heroVideo from "../assets/videos/hero.webm";
import { FaExclamation } from 'react-icons/fa6';
import { LiaArrowRightSolid } from 'react-icons/lia';
import { useWindowSize } from "../hooks/useWindowSize";

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const pageSize = useWindowSize();

    const { language } = useLanguage();
    const {scrollProgress} = useScroll();

    const hoverTip = useRef<HTMLDivElement>(null);
    const scrollToExploreLeft = useRef<HTMLDivElement>(null);
    const scrollToExploreRight = useRef<HTMLDivElement>(null);

    const strings = {
        heading: () => {
            if (language === "En") {
                return languageStrings.en.hero.heading;
            }
            if (language === "Pt-Br") {
                return languageStrings["Pt-Br"].hero.heading;
            }
        },
        heroTip: () => {
            if (language === "En") {
                return languageStrings.en.hero.heroTip;
            }
            if (language === "Pt-Br") {
                return languageStrings["Pt-Br"].hero.heroTip;
            }
        },
        subHeading: () => {
            if (language === "En") {
                return languageStrings.en.hero.subHeading;
            }
            if (language === "Pt-Br") {
                return languageStrings["Pt-Br"].hero.subHeading;
            }
        }
    }

    useEffect(() => {
        if (scrollProgress < 15 )
        {
            setShouldRender(true);
        }
        else 
        {
            setShouldRender(false);
        };
    }, [scrollProgress]);

    useEffect(() => {
        if (!containerRef.current || !videoRef.current || !shouldRender) return;

        let webglPainterCleanup: (() => void) | undefined;
        
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        const hoverTipElement = hoverTip.current;
        if (hoverTip.current) {
            hoverTipElement?.addEventListener("mouseenter", handleMouseEnter);
            hoverTipElement?.addEventListener("mouseleave", handleMouseLeave);
        }

        const init = async () => {
            // Initialize WebGL scenes
            if (!containerRef.current ||  !videoRef.current) return;

            try {
                // Create WebGL scenes and store their cleanup functions
                const painterScene = await createWebGLScenePainter(containerRef.current, videoRef.current);                

                // Store cleanup functions
                webglPainterCleanup = painterScene.cleanup;
            }
            catch (error) {
                console.log(`WebGL failed: `, error);
            }
        };

        init();

        return () => {
            // Clean up WebGL scenes
            if (webglPainterCleanup) {
                webglPainterCleanup();
            }

            if (hoverTip.current) {
                hoverTipElement?.removeEventListener("mouseenter", handleMouseEnter)
                hoverTipElement?.removeEventListener("mouseleave", handleMouseLeave)
            }
        };
    }, [language, shouldRender]);

    useGSAP(() => {
        if (!scrollToExploreLeft.current || !scrollToExploreRight.current || !shouldRender) return;

        gsap.fromTo(scrollToExploreLeft.current, {x: -180, ease: "power3.in", opacity: 1}, {x: 180, opacity: 1, duration: 1.6,  delay: 1, repeat: -1, repeatDelay: 2});
        gsap.fromTo(scrollToExploreRight.current, {x: 180, ease: "power3.in", opacity: 1}, {x: -180, opacity: 1, duration: 1.6,  delay: 1, repeat: -1, repeatDelay: 2});
    }, [shouldRender]);

    // TODO: Make WebGl thing be more responsive and smaller in most cases
    // TODO: Make WebGl canvas resize correctly when returning to this section

    return (
        <AnimatePresence>
            {shouldRender && 
            (<motion.section 
            key="hero" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }} 
            ref={sectionRef} 
            id='hero' 
            className='fixed inset-0 z-10 flex flex-col items-center justify-center w-full h-full defaultPadding'>
                {pageSize.height <= 920 && <div className="w-full h-full max-h-29 ">

                    </div>}
                <motion.div initial={{y: -100, opacity: 0 }} animate={{y: 0, opacity: 1 }} transition={{ duration: 0.3, type: "spring" }} ref={containerRef} className={`modern-arch z-10 [&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 relative container rounded-lg overflow-hidden ${pageSize.height > 920 ? "lg:w-[500px] lg:h-[500px]" : ""} w-[300px] h-[300px] flex pointer-events-auto mb-8 transform`}>
                    <video ref={videoRef} preload={shouldRender ? "auto" : "none"}  autoPlay muted playsInline loop className='object-fill' src={heroVideo}></video>
                </motion.div>
                <div className="space-y-4 z-10 relative">
                    <TextHeadline className="font-mono" text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>{strings.heading()}<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
                    <div className="flex items-center w-full gap-2">
                        <motion.div initial={{x: -100, opacity: 0 }} animate={{x: 0, opacity: 1}}  className="flex-1 h-[1px] bg-[var(--color-bg-tertiary)] overflow-hidden relative rounded-full">
                            <div ref={scrollToExploreLeft} className="absolute transform -translate-y-1/2  w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                        </motion.div>
                        <motion.div initial={{y: 100, opacity: 0 }} animate={{y: 0, opacity: 1}}>
                            {pageSize.width  > 900 && <TextStandard text={strings.subHeading()} importance="supporting"></TextStandard>}
                            {pageSize.width  <= 900 && <TextStandard text={language === `En` ? "Touch the liquid" : "Toque na superfície"} importance="supporting" textSecond={language === `En` ? "surface above!" : "líquida acima!"} className="text-center"></TextStandard>}
                        </motion.div>
                        <motion.div initial={{x: 100, opacity: 0 }} animate={{x: 0, opacity: 1}} className="flex-1 h-[1px] bg-[var(--color-bg-tertiary)] overflow-hidden relative rounded-full">
                            <div ref={scrollToExploreRight} className="absolute transform -translate-y-1/2 w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                        </motion.div>
                    </div>
                    <div id="hover-tip" className={`absolute left-0 w-full opacity-0 lg:opacity-100 flex items-center ${pageSize.height <= 920 ? "-top-55" : "-top-75"}`}>   
                        <AnimatePresence>
                                {isHovered && <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{ opacity: 0,    scale: 0.9 }} transition={{ duration: 0.2 }} className={`absolute ${language === `En` ? `-left-26` : `-left-30`} top-0.3 w-fit`}>
                                <TextStandard className="" text={strings.heroTip()} ></TextStandard>
                            </motion.div>}
                        </AnimatePresence>
                        <div ref={hoverTip} className={`w-fit rounded-lg p-5 py-2 bg-[var(--color-bg-secondary)] border-[1px] border-gray-700  transform scale-[0.8] `}>
                            {isHovered ? <LiaArrowRightSolid size="27" className="text-gray-300"></LiaArrowRightSolid> : <FaExclamation size="27" className="animate-pulse text-gray-300"></FaExclamation>}
                        </div>
                    </div>
                </div>
            </motion.section>)}
        </AnimatePresence>
)};

export default Hero;