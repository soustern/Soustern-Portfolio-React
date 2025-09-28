import { useEffect, useRef, type JSX } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as  createWebGLScenePainter } from "../utils/webglPainter";
import { createWebGLScene as  createWebGLSceneBackgroundPattern } from "../utils/webglBackgroundPattern";
import languageStrings from "../services/localisation.json"
import { useLanguage } from "../components/contexts/LanguageContext";
import TextStandard from "../components/ui/TextStandard";
import { createTrailingStack } from "../utils/trailingStackBackground";



const Hero = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const trailingStack = useRef<HTMLDivElement>(null);
    const {language, } = useLanguage();

    const strings = {
        heading: () => {
            if (language === "En" )
            {
                console.log("here en");
                return languageStrings.en.hero.heading;
            }
            if (language === "Pt-Br")
            {
                console.log("here Pt-Br");
                return languageStrings["Pt-Br"].hero.heading;
            }
        }
    }

    useEffect(() => {
        if (trailingStack.current)
        {
            createTrailingStack(trailingStack.current);
        }

        const init = async () => {
            if (!containerRef.current || !heroRef.current || !videoRef.current) return;

            try {
                await createWebGLScenePainter(containerRef.current, videoRef.current);
                const backgroundPattern = await createWebGLSceneBackgroundPattern(heroRef.current);
                backgroundPattern.program.uniforms.uOpacity.value = 0.01;
            }
            catch (error) {
                console.log(`WebGL failed: `, error);
            }
        };

        init();
    },);
    
    return (
        <section id='hero' className='flex flex-col h-screen items-center relative justify-center py-12 md:py-16 lg:py-24'>
            <div ref={heroRef} className="[&>canvas]:z-0 [&>canvas]:pointer-events-none h-full w-full absolute left-1/2 top-1/2 transform -translate-1/2"></div>
            <div ref={containerRef} className="modern-arch z-10 [&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 relative container rounded-lg overflow-hidden w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex pointer-events-auto mb-8 ">
                <video ref={videoRef} autoPlay muted playsInline loop className='object-fill' src="src\assets\videos\hero.mp4"></video>
            </div>
            <div className="space-y-6 z-10">
                <TextHeadline className="font-mono"  text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>{strings.heading()}<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
            </div>
            <div ref={trailingStack} className="font-mono absolute w-full h-[65%] left-1/2 top-1/2 transform -translate-1/2">
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard> 
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>       
                <TextStandard className="stack-paragraph absolute opacity-48 flex" ></TextStandard>                             
            </div>
        </section>
    )
}

export default Hero;