import type { JSX } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryIcon from "../components/ui/PrimaryIcons";
import Logo from "../components/ui/Logo";

function NavBar(): JSX.Element  {
    return (
        <>
            <nav className="m-auto max-w-5xl text-base font-medium leading-normal">
                <div className="flex justify-between items-center">
                    <div>
                        <Logo></Logo>
                    </div>
                    <div>
                        <ul className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <li >
                                    <a href="">
                                        <PrimaryIcon icon={"linkedin-in"}></PrimaryIcon>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <PrimaryIcon icon={"github"}></PrimaryIcon>
                                    </a>
                                </li>
                            </div>
                            <li>
                                <PrimaryButton text={"Work with me"}></PrimaryButton>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="h-[1px] rounded-full bg-[var(--color-bg-tertiary)]"></div>
            </nav>
        </>
    )
}

export default NavBar;