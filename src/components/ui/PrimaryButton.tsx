import type { JSX } from "react";
import TextStandard from "./TextStandard";

interface PrimaryButtonProps {
    text: string;
}

function PrimaryButton({ text }: PrimaryButtonProps): JSX.Element {
    return (
        <>
             <button className="px-3 py-1.5 font-heading font-semibold text-sm tracking-wider">
                <TextStandard text={`${text}`} importance="important"></TextStandard>
            </button>
        </>
    );
}

export default PrimaryButton