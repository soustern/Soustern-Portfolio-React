import type { JSX } from "react";

interface PrimaryButtonProps {
    text: string;
}

function PrimaryButton({ text }: PrimaryButtonProps): JSX.Element {
    return (
        <>
             <button className="px-3 py-1.5 font-heading font-semibold text-sm tracking-wider">
                <span className="">{ text }</span>
            </button>
        </>
    );
}

export default PrimaryButton