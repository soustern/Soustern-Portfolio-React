import type { JSX } from "react";
import { motion } from "motion/react"
import TextStandard from "./TextStandard";

interface PrimaryButtonProps {
    text: string;
}

function PrimaryButton({ text }: PrimaryButtonProps): JSX.Element {
    const leftArrowVariants = {
        idle: { left: "0%", opacity: "20%"},
        hover: { left: "-2%", opacity: "100%" }     
    };

    const rightArrowVariants = {
        idle: { left: "80%", opacity: "20%"},
        hover: { left: "92%", opacity: "100%" }     
    };

    return (
        <>
             <motion.button whileHover="hover" whileTap={{scale: 0.9}} transition={{duration: 0.1,}} className="relative px-3 py-1.5 font-heading font-semibold text-sm tracking-wider flex items-center cursor-pointer">
                <motion.div variants={leftArrowVariants}  className="z-0 absolute left-[0%]  text-[var(--color-accent-primary)] text-lg font-bold opacity-0">&lt;</motion.div>
                <TextStandard text={`${text}`} className="z-10" importance="important"></TextStandard>
                <motion.div variants={rightArrowVariants} className="z-0 absolute left-[85%] text-[var(--color-accent-primary)] text-lg font-bold opacity-0">/&gt;</motion.div>
            </motion.button>
        </>
    );
}

export default PrimaryButton