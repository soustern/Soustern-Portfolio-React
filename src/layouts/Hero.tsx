import { useEffect, useRef, type JSX } from "react";
import TextHeadline from "../components/ui/TextHeadline";
import { createWebGLScene as  createWebGLScenePainter } from "../utils/webglPainter";

const Hero = (): JSX.Element => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            if (!containerRef.current || !videoRef.current) return;

            try {
                await createWebGLScenePainter(containerRef.current, videoRef.current)
            }
            catch (error) {
                console.log(`WebGL failed: `, error);
            }
        };

        init();
    },);
    
    return (
        <section id='hero' className='flex flex-col h-screen items-center justify-center py-12 md:py-16 lg:py-24'>
            <div ref={containerRef} className="[&>canvas]:absolute [&>canvas]:left-1/2 [&>canvas]:top-1/2 [&>canvas]:transform [&>canvas]:-translate-1/2 [&>canvas]:rounded-lg relative container rounded-lg overflow-hidden w-110 h-110 flex pointer-events-auto mb-8">
                <video ref={videoRef} autoPlay muted playsInline loop className='object-fill h-110 w-110' src="src\assets\videos\hero.mp4"></video>
            </div>
            <div className="space-y-6">
                <TextHeadline className="font-mono"  text={""}><span className="text-[var(--color-accent-primary)]">&lt;</span>Future.Ready.Developer<span className="text-[var(--color-accent-primary)]">/&gt;</span></TextHeadline>
            </div>
        </section>
    )
}

export default Hero;