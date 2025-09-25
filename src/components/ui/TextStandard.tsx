import type { JSX } from "react";

interface TextStandardProps {
    text: string;
    importance?: `important` | `supporting` | `metadata`;
}

const TextStandard = ({text, importance}: TextStandardProps): JSX.Element => {
    const getImportanceStyle = () => {
        switch(importance) {
            case `important`:
                return `text-base font-medium text-gray-50`;
            case `supporting`:
                return `text-base font-normal text-gray-400`;
            case `metadata`:
                return `text-base font-normal text-gray-500`;
            default:
                return `text-base font-normal text-gray-200`;
        }
    }
    
    return (
        <p className={`${getImportanceStyle()} text-base leading-relaxed max-w-prose`}>{text}</p>
    )
}

export default TextStandard