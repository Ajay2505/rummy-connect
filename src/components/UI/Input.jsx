import { useState } from "react";
import classes from "./Input.module.css";

export default function Input({ inputAttributes, options, children }) {
    const [inputValue, setInputValue] = useState("");
    const [activeOptions, setActiveOptions] = useState(false);

    return (
        <>
            <div className="w-full relative mb-4">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} readOnly={options ? true : false} className={`${classes.input} ${children ? "pr-10" : ""} rounded-md`} {...inputAttributes} />
                <label className={classes.label}>{inputAttributes?.placeholder}</label>
                {
                    !!options && options &&
                    <>
                        <ul className={`${classes.options} ${activeOptions ? classes.active : ""} shadow-md rounded-md overflow-hidden`}>
                            {
                                options.map(option => {
                                   return <li key={option + " key"}>
                                        <button onFocus={() => setActiveOptions(true)} onBlur={() => setActiveOptions(false)} onClick={() => { setInputValue(option); setActiveOptions(false)}} type="button">{option}</button>
                                    </li>                                   
                                })
                            }
                        </ul>
                    </>
                }
                {
                    <div className="absolute right-3 top-0 bottom-0 flex items-center flex-shrink-0">
                        {children}
                    </div>
                }
            </div>
        </>
    );
}