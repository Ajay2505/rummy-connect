import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
    return (
        <>
            <header id={classes.siteHeader} className="fixed left-0 right-0 z-40 px-10 py-2 bg-[var(--terColor)] border-b border-[var(--mainColor)] flex items-center justify-between gap-5 shadow-md shadow-slate-950">
                <div className={classes.logoWrapper}>
                    <h2>
                        <NavLink to={"/"}>
                            <b>R</b>ummy <b>C</b>onnect
                        </NavLink>
                    </h2>
                </div>
                {/* <ul className={classes.navlinks}>
                    <li>
                        <NavLink to={"/auth"}>
                            Sign Up
                        </NavLink>
                    </li>
                </ul> */}
            </header>
        </>
    );
}