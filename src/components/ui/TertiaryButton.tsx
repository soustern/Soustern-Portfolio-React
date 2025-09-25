import { motion } from "motion/react";
import type { JSX } from "react";
import TextStandard from "./TextStandard";
import PrimaryIcon from "./PrimaryIcons";

interface TertiaryButtonProps {
    text: string;
    icon?: string;
}

const TertiaryButton = ({text, icon}: TertiaryButtonProps): JSX.Element => {
    const iconPresence = () => icon ? <PrimaryIcon  icon={icon} className="text-gray-500"></PrimaryIcon> : null;
 
    
    return (
        <motion.button whileHover={{backgroundColor: "var(--color-bg-secondary)"}} transition={{duration: 0.05}} className="w-fit flex gap-1 items-center rounded-lg cursor-pointer py">
            <TextStandard text={text} importance="metadata"></TextStandard>
            {iconPresence()}
        </motion.button>
    )
}

export default TertiaryButton