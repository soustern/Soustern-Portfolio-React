import { forwardRef, useEffect, useRef, useState, type ForwardedRef} from "react";
import { useScroll } from "../components/contexts/ScrollContext";
import { AnimatePresence } from "motion/react";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import TextCardTitle from "../components/ui/TextCardTitle";
import TextStandard from "../components/ui/TextStandard";

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const [shouldRender, setShouldRender] = useState(true);
    const {scrollProgress, pageNumber} = useScroll();

    useEffect(() => {
        if (scrollProgress < 0.7 && pageNumber === 2)
        {
            setShouldRender(true);
        }
        else 
        {
            setShouldRender(false);
        };
    }, [scrollProgress, pageNumber]);

    return (
        <AnimatePresence>
            {shouldRender && 
            <section ref={sectionRef} id='Projects' className=' fixed inset-0 z-5 grid items-center justify-center w-full h-full'>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    <article>
                        <img src="" alt="" />
                        <div>
                            <div>
                                <PrimaryIcon icon={""} iconType={""}></PrimaryIcon>
                                <TextStandard text={"Portfolio"}></TextStandard>
                            </div>
                            <div className="marquee">
                                <TextStandard text=""></TextStandard>
                            </div>
                        </div>
                    </article>
                </div>
            </section>}
        </AnimatePresence>
    )
};

export default Projects;