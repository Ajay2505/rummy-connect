import { memo, useEffect, useRef, useState } from "react";
import socket from "../../helpers/socket/socketService";
import classes from "./RommChat.module.css";

function RoomChat() {

    const [showChat, setShowChats] = useState(false);
    const chatBox = useRef();

    const [msgCounter, setMsgCounter] = useState(0);

    const sendMessage = (evt) => {
        if (!chatBox.current) {
            return;
        }
        evt.preventDefault();
        socket.emit("sendMessage", ({ message: evt.target.message.value }), (res) => {
            if (res.err) {
                const messageEL = document.createElement("p");
                messageEL.innerText = res.err;
                chatBox.current.appendChild(messageEL);
                evt.target.reset();
                evt.target.message.focus();
                return;
            }
            
            const messageEL = document.createElement("div");
            messageEL.classList.add("w-full", "py-1", "rounded", "max-w-[90%]", "min-w-[50%]", "bg-[var(--mainColor)]", "text-[var(--terColor)]", "px-2", "self-end");
            messageEL.innerHTML = `
                <p class="text-xs">${res.userName}</p>
                <p>${evt.target.message.value}</p>
                <p class="text-right text-xs">${res.timeStamp}</p>`;
            
            chatBox.current.appendChild(messageEL);
            evt.target.reset();
            evt.target.message.focus();
        });
    }

    useEffect(() => {
        socket.on("recieveMessage", message => {
            if (chatBox.current) {
                if(showChat === false) {
                    console.log(msgCounter);
                    setMsgCounter((prev) => prev+1);
                }
                const messageEL = document.createElement("div");
                messageEL.classList.add("w-full", "py-1", "rounded", "max-w-[90%]", "min-w-[50%]", "bg-[var(--mainColor)]", "text-[var(--terColor)]", "px-2", "self-start");
                messageEL.innerHTML = `
                    <p class="text-xs">${message.userName}</p>
                    <p>${message.message}</p>
                    <p class="text-right text-xs">${message.timeStamp}</p>
                `;
                chatBox.current.appendChild(messageEL);
            }
        });

        return () => {
            socket.off("recieveMessage");
        }
    }, [msgCounter, showChat]);
    
    function showChatBtnHandler() {
        if (!showChat) {
            setMsgCounter(0);
        }
        setShowChats(prev => !prev);
    }

    return (
        <>
            <button onClick={showChatBtnHandler} className="relative w-8 pointer-events-auto lg:w-12 bg-[rgba(0,0,0,0.3)] p-1 lg:p-2 rounded ml-auto block">
                {
                    !showChat ?
                    <img className="w-full invert" src="/icons/chat.png" alt="Chat Icon" />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                }
                {
                    msgCounter > 0 ?
                    <p className="absolute -bottom-2 text-xs leading-4 px-1 rounded-full -left-2 bg-[var(--mainColor)] text-[var(--terColor)]">{msgCounter}</p>
                    : <></>
                }
            </button>
            <div className={`${classes.chatBox} ${showChat ? classes.showChat : ""} max-w-3xl ml-auto bg-[rgba(0,0,0,0.3)] rounded-md overflow-hidden`}>
                <div className="w-full text-left p-2 text-[var(--terColor)] sticky top-0 bg-[var(--mainColor)]">
                    <p><strong>Room Chat</strong></p>
                </div>
                <div className="backdrop-blur flex flex-col items-end">
                    <div className="flex flex-col-reverse customScrollBar overflow-auto w-full max-h-full h-72 max-h-[40dvh] transition-[height]">
                        <div ref={chatBox} className="flex flex-col p-3 gap-2">

                        </div>
                    </div>
                    <form onSubmit={sendMessage} className="flex w-full bottom-0 z-10 gap-1 p-2 bg-[var(--mainColor)]">
                        <input rows={2} name="message" required placeholder="Send a message in Room" type="text" className="w-full min-h-7 appearance-none resize-none ps-2 text-[var(--terColor)] bg-transparent border-none outline-none" />
                        <button type="submit" name="button" className="bg-[var(--terColor)] p-3 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(RoomChat);