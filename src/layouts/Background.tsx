import { useEffect, useRef, type JSX, type ReactNode } from "react";
import { createWebGLScene as createWebGLBackgroundPattern } from "../utils/webglBackgroundPattern";
import TextStandard from "../components/ui/TextStandard";
import { createTrailingStack } from "../utils/trailingStackBackground";
import { useLanguage } from "../components/contexts/LanguageContext";
import { useWindowSize } from "../hooks/useWindowSize";


interface BackgroundProps {
  BackgroundColor: string;
  children: ReactNode;
};

const Background = ({BackgroundColor, children}: BackgroundProps): JSX.Element => {
  const trailingStack = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const pageSize = useWindowSize();

  useEffect(() => {
    // This is for performance sake, trying to minimize effects on mobile
    if (pageSize.width <= 900) {
      return;
    }

    let trailingStackCleanup: (() => void) | undefined;
    let webglBackgroundCleanup: (() => void) | undefined;

    // Flag for proper lifecycle management
    // This works because of closures in JS
    let isMounted = true;

    const init = async () => {
        // Initialize WebGL scenes
        if (!heroRef.current) return;

        try {
            // Create WebGL scenes and store their cleanup functions
            const backgroundScene = await createWebGLBackgroundPattern(heroRef.current);
            
            // Even when useEffect is returned with is cleanup function
            // Closures keep IsMounted alive with is current value to be referenced by the async func
            if (!isMounted) {
                backgroundScene.cleanup();
                return;
            };

            // Set opacity
            backgroundScene.program.uniforms.uOpacity.value = 0.0069;

            // Store cleanup functions
            webglBackgroundCleanup = backgroundScene.cleanup;
        }
        catch (error) {
            console.log(`WebGL failed: `, error);
        }
    };

    // Initialize trailing stack synchronously
    if (trailingStack.current) {
        trailingStackCleanup = createTrailingStack(trailingStack.current);
    }

    init();
    
    return () => {
        console.log("Cleaning up Hero component resources...");
        isMounted = false;
        
        // Clean up trailing stack
        if (trailingStackCleanup) {
            trailingStackCleanup();
        }

        if (webglBackgroundCleanup) {
            webglBackgroundCleanup();
        }
    };
  }, [language, pageSize.width]);

  // TODO: Make background gradient change as section changes
  // TODO: Make a responsive padding y and padding x system

  return (
    <>
      <div className={`${BackgroundColor} min-h-screen w-screen`}>
          <div ref={heroRef} className="[&>canvas]:z-0 [&>canvas]:pointer-events-none h-[100vh] w-[100vw] absolute left-1/2 top-1/2 transform -translate-1/2"></div>
          {children}
      </div>
      <div ref={trailingStack} className={`z-0 pointer-events-none font-mono fixed w-full h-[75%] left-1/2 top-1/2 transform -translate-1/2 ${pageSize.width > 900 ? "" : "hidden"}`}>
        <TextStandard className="stack-paragraph absolute opacity-85 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-40 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>    
        <TextStandard className="stack-paragraph absolute opacity-40 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-sm"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-75 flex text-md"></TextStandard>
        <TextStandard className="stack-paragraph absolute opacity-95 flex text-sm"></TextStandard>       
      </div>
    </>
  );
};

export default Background;

