import {  motion, type Variants } from "motion/react";
import type { JSX, ReactNode } from "react";
import TextStandard from "./TextStandard";
import PrimaryIcon from "./PrimaryIcons";

interface TertiaryButtonProps {
    text: string;
    icon?: string;
    onClick?: () => void;
    children?: ReactNode;
}

const TertiaryButton = ({text, icon, onClick, children}: TertiaryButtonProps): JSX.Element => {
    const iconPresence = (color?: string, variants?: Variants) => icon ? <PrimaryIcon variants={variants} iconType="solid"  icon={icon} color={color} className={`text-sm`}></PrimaryIcon> : null;
    const hoverColor = {
        idle: { color: "#6a7282" },
        hover: { color: "#f9fafb" }
    };
    
    return (
        <motion.button onClick={onClick} whileHover="hover" transition={{duration: 0.02}} className="w-fit flex gap-1 items-center rounded-lg cursor-pointer py">
            {!children ? <TextStandard variants={hoverColor} text={text} importance="metadata"></TextStandard> : children}
            {iconPresence(`text-[#6a7282]`, hoverColor)}
        </motion.button>
    )
}

export default TertiaryButton