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
             <motion.button whileHover="hover" transition={{duration: 0.1,}} className="relative px-3 py-1.5 font-heading font-semibold text-sm tracking-wider flex items-center cursor-pointer">
                <motion.div variants={leftArrowVariants}  className="absolute left-[0%]  text-[var(--color-accent-primary)] text-xl font-bold opacity-0">&lt;</motion.div>
                <TextStandard text={`${text}`} importance="important"></TextStandard>
                <motion.div variants={rightArrowVariants} className="absolute left-[80%] text-[var(--color-accent-primary)] text-xl font-bold opacity-0">/&gt;</motion.div>
            </motion.button>
        </>
    );
}

export default PrimaryButton