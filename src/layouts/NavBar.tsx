import { useState, type JSX, type ReactNode, useRef } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import Logo from "../components/ui/Logo";
import {  AnimatePresence, motion } from "motion/react";
import TextStandard from "../components/ui/TextStandard";
import BorderButton from "../components/ui/BorderButton";


function NavBar(): JSX.Element  {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(hoverColor);
    }

    const languageMenu = (): ReactNode => {
        if (isOpen && ref.current)
        {
            ref.current.style.color = "";
            return (
                <>
                    <TextStandard text={"Language"} importance={`important`} ref={ref}></TextStandard>
                    <PrimaryIcon iconType="solid" className="text-sm" icon={"minus"}></PrimaryIcon>
                </> 
            )
        }
        else 
        {
            return(
                <>
                    <motion.div variants={hoverColor} transition={{duration: 0.1}} className="flex items-baseline gap-1 text-[#6a7282]">
                        <TextStandard text={"Language"} importance={`blank`} ref={ref}></TextStandard>
                        <PrimaryIcon iconType="solid" className="text-sm" color="text-inherit" icon={"plus"}></PrimaryIcon>
                    </motion.div>
                </>
            )
        };
    }

    const hoverColor = {
        idle: { color: "#6a7282" },
        hover: { color: "#f9fafb" }
    };

    return (
        <nav className="flex flex-col gap-3 m-auto max-w-5xl text-base font-medium leading-normal">
            <div className="flex justify-between items-center">
                <div>
                    <Logo></Logo>
                </div>
                <div>
                    <ul className="flex items-center">
                        <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{duration: 0.05, type: "spring", bounce: 0.5}}>
                            <a className="mr-1" href="">
                                <PrimaryIcon iconType="brands" className="text-xl" icon={"linkedin-in"}></PrimaryIcon>
                            </a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{duration: 0.05, type: "spring", bounce: 0.5}}>
                            <a className="mr-2" href="">
                                <PrimaryIcon iconType="brands" className="text-xl" icon={"github"}></PrimaryIcon>
                            </a>
                        </motion.li>
                        <li>
                            <PrimaryButton text={"Work with me"}></PrimaryButton>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="h-[1px] rounded-full bg-[var(--color-bg-tertiary)]"></div>
            <div className="flex gap-2">
                <motion.button onClick={handleClick} whileHover="hover" className="w-fit flex gap-1 items-baseline rounded-lg cursor-pointer">
                    {languageMenu()} 
                </motion.button>
                {isOpen && 
                <AnimatePresence>
                    <motion.div className="flex gap-1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                        <BorderButton text="En"></BorderButton>
                        <BorderButton text="Pt-Br"></BorderButton>
                    </motion.div>
                </AnimatePresence>}
            </div>
        </nav>
    )
}

export default NavBar;