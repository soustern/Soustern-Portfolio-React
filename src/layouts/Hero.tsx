import { use, useEffect, useRef, useState, type JSX } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as createWebGLScenePainter } from "../utils/webglPainter";
import { createWebGLScene as createWebGLSceneBackgroundPattern } from "../utils/webglBackgroundPattern";
import languageStrings from "../services/localisation.json"
import { useLanguage } from "../components/contexts/LanguageContext";
import TextStandard from "../components/ui/TextStandard";
import { createTrailingStack } from "../utils/trailingStackBackground";
import BorderButton from "../components/ui/BorderButton";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import { AnimatePresence, motion } from "motion/react";

const Hero = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const trailingStack = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();
    const hoverTip = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const strings = {
        heading: () => {
            if (language === "En") {
                console.log("here en");
                return languageStrings.en.hero.heading;
            }
            if (language === "Pt-Br") {
                console.log("here Pt-Br");
                return languageStrings["Pt-Br"].hero.heading;
            }
        }
    }

    useEffect(() => {
        // Store all cleanup functions
        let trailingStackCleanup: (() => void) | undefined;
        let webglPainterCleanup: (() => void) | undefined;
        let webglBackgroundCleanup: (() => void) | undefined;
        
        if (hoverTip.current) {
            hoverTip.current.addEventListener("mouseenter", () => {
                setIsHovered(true);
            })
            hoverTip.current.addEventListener("mouseleave", () => {
                setIsHovered(false);
            })
        }

        const init = async () => {
            // Initialize trailing stack
            if (trailingStack.current) {
                trailingStackCleanup = createTrailingStack(trailingStack.current);
            }

            // Initialize WebGL scenes
            if (!containerRef.current || !heroRef.current || !videoRef.current) return;

            try {
                // Create WebGL scenes and store their cleanup functions
                const painterScene = await createWebGLScenePainter(containerRef.current, videoRef.current);
                const backgroundScene = await createWebGLSceneBackgroundPattern(heroRef.current);
                
                // Set opacity
                backgroundScene.program.uniforms.uOpacity.value = 0.01;

                // Store cleanup functions
                webglPainterCleanup = painterScene.cleanup;
                webglBackgroundCleanup = backgroundScene.cleanup;
            }
            catch (error) {
                console.log(`WebGL failed: `, error);
            }
        };

        init();

        // Comprehensive cleanup function
        return () => {
            console.log("Cleaning up Hero component resources...");
            
            // Clean up trailing stack
            if (trailingStackCleanup) {
                trailingStackCleanup();
            }

            // Clean up WebGL scenes
            if (webglPainterCleanup) {
                webglPainterCleanup();
            }

            if (webglBackgroundCleanup) {
                webglBackgroundCleanup();
            }
        };
    }, [language]); // Re-run when language changes
    
    return (
        <section id='hero' className='flex flex-col h-screen items-center relative justify-center py-12 md:py-16 lg:py-24'>
            <div ref={heroRef} className="[&>canvas]:z-0 [&>canvas]:pointer-events-none h-full w-full absolute left-1/2 top-1/2 transform -translate-1/2"></div>
            <div ref={containerRef} className="modern-arch z-10 [&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 relative container rounded-lg overflow-hidden w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] flex pointer-events-auto mb-8 ">
                <video ref={videoRef} autoPlay muted playsInline loop className='object-fill' src="src\assets\videos\hero.mp4"></video>
            </div>
            <div className="space-y-6 z-10 relative">
                <TextHeadline className="font-mono" text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>{strings.heading()}<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
                <div className="absolute left-0 -top-75 w-full">
                    {isHovered && 
                    <AnimatePresence><motion.div initial={{opacity: 0,}} animate={{opacity: 1}} exit={{ opacity: 0, scale: 0 }} className="absolute -left-26 top-0.5 w-fit">
                        <TextStandard className="" text="Try hovering" ></TextStandard>
                    </motion.div></AnimatePresence>}
                    <div ref={hoverTip} className="w-fit rounded-lg px-4 py-1 bg-[var(--color-bg-tertiary)]">
                        <PrimaryIcon className={isHovered ? "" : "animate-pulse"} icon={isHovered ? "arrow-right" : "exclamation"} iconType={"solid"}></PrimaryIcon>
                    </div>
                </div>
            </div>
            <div ref={trailingStack} className="font-mono absolute w-full h-[65%] left-1/2 top-1/2 transform -translate-1/2">
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard> 
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard> 
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-58 flex" ></TextStandard>                             
            </div>
        </section>
    )
}

export default Hero;