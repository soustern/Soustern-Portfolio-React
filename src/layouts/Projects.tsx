import { forwardRef, type ForwardedRef} from "react";

const Projects = forwardRef<HTMLElement>((props, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section ref={ref} id='Projects' className=' fixed inset-0 z-5 grid items-center justify-center w-full h-full'>
            <div className="bg-amber-400 w-full">OLA</div>
        </section>
    )
});

export default Projects;