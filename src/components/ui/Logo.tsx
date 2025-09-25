import type { JSX } from "react"
import TextStandard from "./TextStandard"

const Logo = (): JSX.Element => {
    return (
        <a >
            <div className="flex gap-0.5 items-baseline">
                <TextStandard text={"Rafael"} importance="important"></TextStandard>
                <span className="inline-block w-2 h-2 bg-[var(--color-accent-primary)]"></span>
                <TextStandard text={"Antoniassi"} importance="important"></TextStandard>
                <span className="inline-block w-2 h-2 bg-[var(--color-accent-primary)]"></span>
            </div>
        </a>
    )
}

export default Logo