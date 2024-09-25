import { useState, memo } from "react";

function ChatUpdates({ onClose, title, id, showPopup, children }) {
    const [minimize, setMinimize] = useState(false);

    return (
        <div className={`transition-[max-height] w-full pointer-events-auto lg:max-w-[35vw] overflow-hidden rounded-t${showPopup === true ? " max-h-[44vh] lg:max-h-[60vh]" : " max-h-0 lg:max-h-0"}`}>
            <div className="w-full relative flex items-center">
                <button onClick={() => setMinimize(prev => !prev)} className="w-full text-left p-3 sticky top-0 bg-[var(--mainColor)]">
                    {
                        title && <p className="text-[var(--terColor)] font-semibold">{title}</p>
                    }
                </button>
                <div className="flex absolute right-0 gap-3 items-center px-3 z-10">
                    <button onClick={() => setMinimize(prev => !prev)} className="text-[var(--terColor)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
                        </svg>
                    </button>
                    <button className="text-[var(--terColor)]" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="bg-[#0006] backdrop-blur flex flex-col items-end">                    
                    <div className={`flex flex-col-reverse customScrollBar overflow-auto w-full max-h-full transition-[height]${minimize ? " lg:h-[calc(60vh-100px)] h-[calc(44vh-100px)]" : " h-20"}`}>
                        <div className="flex flex-col p-3 gap-2" id={id}>

                        </div>
                    </div>
                {children}
            </div>
        </div>
    );
}

export default memo(ChatUpdates);