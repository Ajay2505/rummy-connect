import { memo, useEffect, useState } from "react";
import socket from "../../helpers/socket/socketService";

function CurrentEvent() {

    const [message, setMessage] = useState("");    

    useEffect(() => {
        socket.on("currentEvent", ({ message }) => {
            if (message) {
                setMessage(message);
            }
        });
        
        return () => {
            socket.off("currentEvent");
        }
    }, []);

    return (
        <>
            {
                message && message.length > 1 ?
                <div className="bg-[#0006] p-2 animate-pulse">
                    <p>{message}</p>
                </div>
                : 
                <></>
            }        
        </>
    )
}

export default memo(CurrentEvent);