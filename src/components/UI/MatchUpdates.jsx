import { memo, useEffect, useRef } from "react"
import socket from "../../helpers/socket/socketService";
import CurrentEvent from "./CurrentEvent";

function MatchUpdates() {

    const updatesRef = useRef();

    useEffect(() => {
        
        socket.on("updates", update => {
            if (updatesRef.current) {
                const updateEl = document.createElement("p");
                updateEl.innerText = update.message;
                updatesRef.current.appendChild(updateEl);
            }
        });

        return () => {
            if (updatesRef.current) {
                updatesRef.innerHTML = "";
            }
            socket.off("updates");
        }
    }, [updatesRef.current]);

    return (
        <div className="w-full bg-[rgba(0,0,0,0.3)] rounded-md overflow-hidden">
            {/* <div className="w-full text-left p-2 text-[var(--terColor)] sticky top-0 bg-[var(--mainColor)]">
                <p><strong>Match Updates</strong></p>
            </div> */}
            <div className="backdrop-blur flex flex-col items-end">
                <div className="flex flex-col-reverse customScrollBar overflow-auto w-full max-h-full h-20 transition-[height]">
                    <div ref={updatesRef} className="flex flex-col p-3 gap-2">

                    </div>
                </div>
            </div>
            <CurrentEvent />
        </div>
    )
}

export default memo(MatchUpdates);