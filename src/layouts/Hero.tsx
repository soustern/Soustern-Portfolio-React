import { useEffect, useRef, useState, type JSX } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as createWebGLScenePainter } from "../utils/webglPainter";
import languageStrings from "../services/localisation.json"
import { useLanguage } from "../components/contexts/LanguageContext";
import TextStandard from "../components/ui/TextStandard";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import { AnimatePresence, motion } from "motion/react";

const Hero = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();
    const hoverTip = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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
        }
    }

    useEffect(() => {
        // Store all cleanup functions
        let webglPainterCleanup: (() => void) | undefined;
        
        if (hoverTip.current) {
            hoverTip.current.addEventListener("mouseenter", () => {
                setIsHovered(true);
            })
            hoverTip.current.addEventListener("mouseleave", () => {
                setIsHovered(false);
            })
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

        // Comprehensive cleanup function
        return () => {
            // Clean up WebGL scenes
            if (webglPainterCleanup) {
                webglPainterCleanup();
            }

            if (hoverTip.current) {
                hoverTip.current.removeEventListener("mouseenter", () => {})
                hoverTip.current.removeEventListener("mouseleave", () => {})
            }
        };
    }, [language]); // Re-run when language changes
    
    return (
        <section id='hero' className='flex flex-col h-screen items-center relative justify-center py-12 md:py-16 lg:py-24'>
            <div ref={containerRef} className="modern-arch z-10 [&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 relative container rounded-lg overflow-hidden w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] flex pointer-events-auto mb-8 ">
                <video ref={videoRef} autoPlay muted playsInline loop className='object-fill' src="src\assets\videos\hero.mp4"></video>
            </div>
            <div className="space-y-6 z-10 relative">
                <TextHeadline className="font-mono" text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>{strings.heading()}<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
                <div id="hover-tip" className="absolute left-0 -top-75 w-full opacity-0 lg:opacity-100">   
                    <AnimatePresence>
                        {isHovered && <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{ opacity: 0,    scale: 0.9 }} transition={{ duration: 0.2 }} className={`absolute ${language === `En` ? `-left-26` : `-left-30`}  top-0.5 w-fit`}>
                            <TextStandard className="" text={strings.heroTip()} ></TextStandard>
                        </motion.div>}
                    </AnimatePresence>
                    <div ref={hoverTip} className="w-fit rounded-lg px-4 py-1 bg-[var(--color-bg-tertiary)]">
                        <PrimaryIcon className={isHovered ? "" : "animate-pulse"} icon={isHovered ? "arrow-right" : "exclamation"} iconType={"solid"}></PrimaryIcon>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;