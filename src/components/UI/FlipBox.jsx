import classes from "./FlipBox.module.css";
import { useState } from "react";

export default function FlipBox({ className, children }) {
    const [frontBox, setFrontBox] = useState(false);

    return (
        <>
            <div className={`${className ? className : ""} ${classes.box} ${frontBox ? classes.active : ""}`}>
                {children}
            </div>
            <div className="flex gap-3 mt-6">
                <button onClick={() => setFrontBox(false)} type="button" className={`${frontBox ? "bg-[var(--mainColor)] text-[var(--terColor)]" : "text-[var(--mainColor)] border border-[var(--mainColor)]"} rounded-md w-full block font-semibold px-4 py-2`}>SIGNUP</button>
                <button onClick={() => setFrontBox(true)} type="button" className={`${frontBox ? "text-[var(--mainColor)] border border-[var(--mainColor)]" : "bg-[var(--mainColor)] text-[var(--terColor)]"} rounded-md w-full block font-semibold px-4 py-2`}>LOGIN</button>
            </div>
        </>
    );
}