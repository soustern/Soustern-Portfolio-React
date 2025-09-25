import type { JSX } from "react";
import { motion } from "motion/react"

interface PrimaryIconProps {
    icon: string;
}

function PrimaryIcon({ icon }: PrimaryIconProps): JSX.Element {
    return (
        <>
            <motion.i whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{duration: 0.05, type: "spring", bounce: 0.5}} className={`fa-brands fa-${icon} text-xl text-gray-50`}></motion.i>
        </>
    );
}

export default PrimaryIcon