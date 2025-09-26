import { motion } from "motion/react"
import type { JSX } from "react"
import TextStandard from "./TextStandard"

interface BorderButtonProps {
    text: string;
    active?: boolean;
    onClick?: () => void
}

const BorderButton = ({text, active = false, onClick}: BorderButtonProps): JSX.Element => {
    return (
        <motion.button whileHover={{borderColor: "#f9fafb"}} onClick={onClick} transition={{duration: 0.1, type: `spring`}} className={`border-1  rounded-lg px-4 py-1 cursor-pointer ${active ? `border-[#f9fafb]` : `border-[#1e2939]`}`}>
            <TextStandard text={text}></TextStandard>
        </motion.button>
    )
}

export default BorderButton