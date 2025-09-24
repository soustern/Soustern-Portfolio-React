import type { JSX } from "react"

const Logo = (): JSX.Element => {
    return (
        <a >
            <div className="flex gap-0.5 items-baseline">
                <span className="inline-block text-lg">Rafael</span>
                <span className="inline-block w-1 h-1 bg-black"></span>
                <span className="inline-block text-lg">Antoniassi</span>
                <span className="inline-block w-1 h-1 bg-black"></span>
            </div>
        </a>
    )
}

export default Logo