import { useEffect, useRef, type JSX, type ReactNode } from "react";
import { createWebGLScene as createWebGLBackgroundPattern } from "../utils/webglBackgroundPattern";
import TextStandard from "../components/ui/TextStandard";
import { createTrailingStack } from "../utils/trailingStackBackground";
import { useLanguage } from "../components/contexts/LanguageContext";


interface BackgroundProps {
  BackgroundColor: string;
  children: ReactNode;
};

const Background = ({BackgroundColor, children}: BackgroundProps): JSX.Element => {
  const trailingStack = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    let trailingStackCleanup: (() => void) | undefined;
    let webglBackgroundCleanup: (() => void) | undefined;

    const init = async () => {
        // Initialize trailing stack
        if (trailingStack.current) {
            trailingStackCleanup = createTrailingStack(trailingStack.current);
        }

        // Initialize WebGL scenes
        if (!heroRef.current) return;

        try {
            // Create WebGL scenes and store their cleanup functions
            const backgroundScene = await createWebGLBackgroundPattern(heroRef.current);
            
            // Set opacity
            backgroundScene.program.uniforms.uOpacity.value = 0.008;

            // Store cleanup functions
            webglBackgroundCleanup = backgroundScene.cleanup;
        }
        catch (error) {
            console.log(`WebGL failed: `, error);
        }
    };

    init();
    
    return () => {
        console.log("Cleaning up Hero component resources...");
        
        // Clean up trailing stack
        if (trailingStackCleanup) {
            trailingStackCleanup();
        }

        if (webglBackgroundCleanup) {
            webglBackgroundCleanup();
        }
    };
  }, [language])

  // TODO: Make background gradient change as section changes

  return (
    <>
      <div className={`${BackgroundColor} min-h-screen w-screen`}>
          <div ref={heroRef} className="[&>canvas]:z-0 [&>canvas]:pointer-events-none h-[100vh] w-[100vw] absolute left-1/2 top-1/2 transform -translate-1/2"></div>
          {children}
      </div>
      <div ref={trailingStack} className="z-10 pointer-events-none font-mono fixed w-full h-[75%] left-1/2 top-1/2 transform -translate-1/2">
        <TextStandard className="stack-paragraph absolute opacity-85 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-50 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>    
        <TextStandard className="stack-paragraph absolute opacity-50 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-85 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>       
      </div>
    </>
  );
};

export default Background;

