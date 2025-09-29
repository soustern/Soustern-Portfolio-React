import type { JSX } from "react";
import TextStandard from "../components/ui/TextStandard";

const SideBar = (): JSX.Element => {
    return (
        <aside>
            <nav aria-label="Main navigation">
                <ul>
                    <li><a href=""><TextStandard text="Hero"></TextStandard></a></li>
                    <li><a href=""><TextStandard text="Projects"></TextStandard></a></li>
                    <li><a href=""><TextStandard text="Work with me"></TextStandard></a></li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;