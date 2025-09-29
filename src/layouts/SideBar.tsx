import { useRef, type JSX } from "react";
import TextStandard from "../components/ui/TextStandard";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import gsap from "gsap";
import {useGSAP} from "@gsap/react"
import { SplitText } from "gsap/all";

const SideBar = (): JSX.Element => {
    const text = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!text.current) return; 
        const split = SplitText.create(text.current, {type: "chars"});
        gsap.from(split.chars, {scaleX: -1, transformOrigin: "center", duration: 1, yoyo: true, repeat: -2, ease: "power3.inOut", stagger: {each: 0.2}});
    })

    return (
        <aside className="z-100 py-10 px-20 fixed right-0 top-1/2 transform -translate-y-1/2">
            <nav aria-label="Main navigation">
                <ul className="flex flex-col">
                    <li className="flex gap-3 relative">
                        <div className="w-[1px] h-[50px] relative bg-[var(--color-bg-tertiary)]"></div>
                        <div className="w-[1px] h-0 absolute left-0 top-0 bg-gray-200"></div>
                        <div className="flex items-baseline">
                            <PrimaryIcon icon={"circle"} iconType={"solid"} className="text-[0.7rem] absolute -left-1.5 top-1.5 text-[var(--color-bg-tertiary)]"></PrimaryIcon>
                            <TextStandard ref={text}  text="Hero"></TextStandard>
                        </div>
                    </li>
                    <li className="flex gap-3 relative">
                        <div className="w-[1px] h-[50px] relative bg-[var(--color-bg-tertiary)]"></div>
                        <div className="w-[1px] h-0 absolute left-0 top-0 bg-gray-200"></div>                        
                        <div className="flex items-baseline">
                            <PrimaryIcon icon={"circle"} iconType={"solid"} className="text-[0.7rem] absolute -left-1.5 top-1.5 text-[var(--color-bg-tertiary)]"></PrimaryIcon>
                            <TextStandard  text="Projects"></TextStandard>
                        </div>
                    </li>
                    <li className="flex gap-3 relative">
                        <div className="w-[1px] h-[50px] relative bg-[var(--color-bg-tertiary)]"></div>
                        <div className="w-[1px] h-0 absolute left-0 top-0 bg-gray-200"></div>
                        <div className="flex items-baseline">
                            <PrimaryIcon icon={"circle"} iconType={"solid"} className="text-[0.7rem] absolute -left-1.5 top-1.5 text-[var(--color-bg-tertiary)]"></PrimaryIcon>
                            <TextStandard  text="About"></TextStandard>
                        </div>
                    </li>
                    <li className="flex gap-3 relative">
                        <div className="w-[1px] h-[50px] relative bg-[var(--color-bg-tertiary)]"></div>
                        <div className="w-[1px] h-0 absolute left-0 top-0 bg-gray-200"></div>
                        <div className="flex items-baseline">
                            <PrimaryIcon icon={"circle"} iconType={"solid"} className="text-[0.7rem] absolute -left-1.5 top-1.5 text-[var(--color-bg-tertiary)]"></PrimaryIcon>
                            <TextStandard  text="Education"></TextStandard>
                        </div>
                    </li>
                    <li className="flex gap-3 relative">
                        <div className="w-[1px] relative bg-[var(--color-bg-tertiary)]"></div>
                        <div className="w-[1px] h-0 absolute left-0 top-0 bg-gray-200"></div>
                        <div className="flex items-baseline">
                            <PrimaryIcon icon={"circle"} iconType={"solid"} className="text-[0.7rem] absolute -left-1.5 top-1.5 text-[var(--color-bg-tertiary)]"></PrimaryIcon>
                            <TextStandard  text="Work with me"></TextStandard>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;