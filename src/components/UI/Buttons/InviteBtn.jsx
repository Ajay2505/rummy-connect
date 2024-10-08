import { memo, useState } from "react";

function InviteBtn() {

    const [clicked, setClicked] = useState(false);
    
    function copyLobbyUrl() {
        navigator.clipboard.writeText(`${window.location}`);
        if (!clicked) {
            setClicked(true);
            setTimeout(() => {
                setClicked(false);
            }, 3000);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 border p-2 rounded">
            <p>Invite your friends</p>
            <button onClick={copyLobbyUrl} className="px-4 py-2 text-center flex gap-2 items-center font-semibold rounded text-[var(--terColor)] bg-[var(--mainColor)]">
                {
                    clicked ?
                    <>
                        Copied                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </>
                    :
                    <>
                        Copy Link 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-fill" viewBox="0 0 16 16">
                            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                            <path d="M3.5 1h.585A1.5 1.5 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5q-.001-.264-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1"/>
                        </svg>                    
                    </>
                }
            </button>
        </div>
    )
}

export default memo(InviteBtn);