import { useEffect, useRef, type JSX, type ReactNode } from "react";
import { createWebGLScene as createWebGLBackgroundPattern } from "../utils/webglBackgroundPattern";
import TextStandard from "../components/ui/TextStandard";
import { createTrailingStack } from "../utils/trailingStackBackground";


interface BackgroundProps {
  BackgroundColor: string;
  children: ReactNode;
};

const Background = ({BackgroundColor, children}: BackgroundProps): JSX.Element => {
  const trailingStack = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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
            backgroundScene.program.uniforms.uOpacity.value = 0.01;

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
  },)

  return (
    <>
      <div className={`${BackgroundColor} w-screen h-screen font-sans`}>
          <div ref={heroRef} className="[&>canvas]:z-0 [&>canvas]:pointer-events-none h-full w-full absolute left-1/2 top-1/2 transform -translate-1/2"></div>
          {children}
      </div>
      <div ref={trailingStack} className="font-mono absolute w-full h-[75%] left-1/2 top-1/2 transform -translate-1/2 overflow-hidden">
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
    </>
  );
};

export default Background;

