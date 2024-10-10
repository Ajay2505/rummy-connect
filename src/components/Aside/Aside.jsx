import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatUpdates from "./ChatUpdates";
import socket from "../../helpers/socket/socketService";

import classes from "./Aside.module.css";

export default function Aside() {
    const [showUpdates, setShowUpdates] = useState(false);
    const [showChat, setShowChats] = useState(false);
    const navigate = useNavigate();

    const sendMessage = (evt) => {
        const chatBox = document.getElementById("chatBox");
        if (!chatBox) {
            return;
        }
        evt.preventDefault();
        socket.emit("sendMessage", ({ message: evt.target.message.value }), (res) => {
            if (res.err) {
                const messageEL = document.createElement("p");
                messageEL.innerText = res.err;
                chatBox.appendChild(messageEL);
                evt.target.reset();
                evt.target.message.focus();
                return;
            }
            
            const messageEL = document.createElement("div");
            messageEL.classList.add("w-full", "py-1", "rounded", "max-w-[90%]", "min-w-[50%]", "bg-[var(--mainColor)]", "text-[var(--terColor)]", "px-2", "self-end");
            messageEL.innerHTML = `
                <p class="text-xs">${res.userName}</p>
                <p>${evt.target.message.value}</p>
                <p class="text-right text-xs">${res.timeStamp}</p>
            `;
            // messageEL.innerText = evt.target.message.value;
            chatBox.appendChild(messageEL);
            evt.target.reset();
            evt.target.message.focus();
        });
    }

    useEffect(() => {
        const matchUpdatesEl = document.getElementById("matchUpdates");
        const chatBox = document.getElementById("chatBox");

        socket.on("updates", update => {
            if (matchUpdatesEl) {
                const updateEl = document.createElement("p");
                updateEl.innerText = update.message;
                matchUpdatesEl.appendChild(updateEl);
            }
        });

        socket.on("recieveMessage", message => {
            if (chatBox) {
                const messageEL = document.createElement("div");
                messageEL.classList.add("w-full", "py-1", "rounded", "max-w-[90%]", "min-w-[50%]", "bg-[var(--mainColor)]", "text-[var(--terColor)]", "px-2", "self-start");
                messageEL.innerHTML = `
                    <p class="text-xs">${message.userName}</p>
                    <p>${message.message}</p>
                    <p class="text-right text-xs">${message.timeStamp}</p>
                `;
                chatBox.appendChild(messageEL);
            }
        });

        socket.on("redirect", ({ redirectURL }) => {
            navigate(redirectURL);
        });

        return () => {
            socket.off("updates");
            socket.off("redirect"); 
            socket.off("recieveMessage");
            if (matchUpdatesEl) {
                matchUpdatesEl.innerHTML = "";
            }
            if (chatBox) {
                chatBox.innerHTML = "";
            }
        }
    }, [navigate]);
    

    return (
        <div className="fixed z-20 inset-0 flex flex-col md:flex-row lg:gap-7 justify-end items-end pointer-events-none">
            <div id="popupBox" className="flex items-end justify-end lg:flex-row flex-col lg:gap-3 w-full h-full lg:ps-5">
                <ChatUpdates showPopup={showChat} id={"chatBox"} title={"Room Chat"} onClose={() => setShowChats(false)}>
                    <form onSubmit={sendMessage} className="flex w-full bottom-0 z-10 gap-1 p-2 bg-[var(--mainColor)]">
                        <input rows={2} name="message" required placeholder="Send a message in Room" type="text" className="w-full min-h-7 appearance-none resize-none ps-2 text-[var(--terColor)] bg-transparent border-none outline-none" />
                        <button type="submit" name="button" className="bg-[var(--terColor)] p-3 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </form>
                </ChatUpdates>
                <ChatUpdates showPopup={showUpdates} id={"matchUpdates"} title={"Match Updates"} onClose={() => setShowUpdates(false)} />
            </div>
            <aside className={classes.aside}>
                <Link to={"#"} className="flex gap-6 items-center p-1 lg:p-3 w-full max-md:justify-center rounded hover:bg-[var(--terColor)]">
                    <div className="w-8 lg:w-10 flex-shrink-0">
                        <img className="w-full invert" src="/icons/home-button.png" alt="Home Icon" />
                    </div>
                    <p className="text-nowrap hidden md:inline-block">Home</p>
                </Link>
                <button onClick={() => setShowUpdates(prev => !prev)} className="flex gap-6 items-center p-1 lg:p-3 w-full max-md:justify-center rounded hover:bg-[var(--terColor)]">
                    <div className="w-8 lg:w-10 flex-shrink-0">
                        <img loading="lazy" className="w-full" src="/icons/match-updates-white-v2.png" alt="Match Updates Icon" />
                    </div>
                    <p className="text-nowrap hidden md:inline-block">Match Updates</p>
                </button>
                <button onClick={() => setShowChats(prev => !prev)} className="flex gap-6 items-center p-1 lg:p-3 w-full max-md:justify-center rounded hover:bg-[var(--terColor)]">
                    <div className="w-8 lg:w-10 flex-shrink-0">
                        <img className="w-full invert" src="/icons/chat.png" alt="Chat Icon" />
                    </div>
                    <p className="text-nowrap hidden md:inline-block">Chat</p>
                </button>
            </aside>
        </div>
    )
}