import {  useEffect, useRef, useState,  } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as createWebGLScenePainter } from "../utils/webglPainter";
import languageStrings from "../services/localisation.json"
import { useLanguage } from "../components/contexts/LanguageContext";
import TextStandard from "../components/ui/TextStandard";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import { AnimatePresence, motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScroll } from "../components/contexts/ScrollContext";
import heroVideo from "../assets/videos/hero.mp4";

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

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

        gsap.fromTo(scrollToExploreLeft.current, {x: -180, ease: "power3.in", opacity: 1}, {x: 180, opacity: 1, duration: 1.7,  delay: 1, repeat: -1, repeatDelay: 4});
        gsap.fromTo(scrollToExploreRight.current, {x: 180, ease: "power3.in", opacity: 1}, {x: -180, opacity: 1, duration: 1.7,  delay: 1, repeat: -1, repeatDelay: 4});
    }, [shouldRender]);

    // TODO: Make WebGl thing be more responsive and smaller in most cases
    // TODO: Make WebGl canvas resize correctly when returning to this section
    // TODO: Make this more interesting

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
            className='fixed inset-0 z-10 flex flex-col items-center justify-center w-full h-full'>

                <div ref={containerRef} className="modern-arch z-10 [&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 relative container rounded-lg overflow-hidden w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] flex pointer-events-auto mb-8 transform">
                    <video ref={videoRef} autoPlay muted playsInline loop className='object-fill' src={heroVideo}></video>
                </div>
                <div className="space-y-4 z-10 relative">
                    <TextHeadline className="font-mono" text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>{strings.heading()}<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
                    <div className="flex items-center w-full gap-2">
                        <div className="flex-1 h-[1px] bg-[var(--color-bg-tertiary)] overflow-hidden relative rounded-full">
                            <div ref={scrollToExploreLeft} className="absolute transform -translate-y-1/2  w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                        </div>
                        <TextStandard text={strings.subHeading()} importance="supporting"></TextStandard>
                        <div className="flex-1 h-[1px] bg-[var(--color-bg-tertiary)] overflow-hidden relative rounded-full">
                            <div ref={scrollToExploreRight} className="absolute transform -translate-y-1/2 w-full h-full bg-[radial-gradient(115px_circle,#f9fafb,transparent_40%)]"></div>
                        </div>
                    </div>
                    <div id="hover-tip" className="absolute left-0 -top-75 w-full opacity-0 lg:opacity-100">   
                        <AnimatePresence>
                            {isHovered && <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{ opacity: 0,    scale: 0.9 }} transition={{ duration: 0.2 }} className={`absolute ${language === `En` ? `-left-26` : `-left-30`}  top-0.5 w-fit`}>
                                <TextStandard className="" text={strings.heroTip()} ></TextStandard>
                            </motion.div>}
                        </AnimatePresence>
                        <div ref={hoverTip} className="w-fit rounded-lg px-4 py-1 bg-[var(--color-bg-secondary)] transform scale-[0.8]">
                            <PrimaryIcon className={isHovered ? "" : "animate-pulse"} icon={isHovered ? "arrow-right" : "exclamation"} iconType={"solid"}></PrimaryIcon>
                        </div>
                    </div>
                </div>
            </motion.section>)}
        </AnimatePresence>
)};

export default Hero;