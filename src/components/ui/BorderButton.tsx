import { motion } from "motion/react"
import type { JSX, ReactElement } from "react"
import TextStandard from "./TextStandard"

interface BorderButtonProps {
    text: string;
    active?: boolean;
    onClick?: () => void,
    children?: ReactElement,
    className?: string
}

const BorderButton = ({text, active = false, onClick, children, className}: BorderButtonProps): JSX.Element => {
    return (
        <motion.button onClick={onClick} whileTap={{scale: 0.9}} className={`border-1  rounded-lg px-4 py-1 cursor-pointer ${active ? `border-[#f9fafb] ${className}` : `border-[#1e2939]`}`}>
            <TextStandard text={text}>{children}</TextStandard>
        </motion.button>
    )
}

export default BorderButton