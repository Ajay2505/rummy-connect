import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import socket from "../../helpers/socket/socketService";
import Utils from "../../helpers/utils";
import { getMatchAction } from "../../helpers/slices/matchActionSlice";
import { removePlayerCard } from "../../helpers/slices/playerCardsSlice";

export default function SingleCard({ ids = { ind: 0, index: 0 }, card = {} }) {
    const { player, token } = useLoaderData();
    const { playerAction, playerTurn } = useSelector(getMatchAction);
    const isMyTurn = player.userName === playerTurn;
    const cardRef = useRef();
    const dispatch = useDispatch();

    const [isFocused, setIsFocused] = useState(false);
    const dropBtnClickHander = () => {
        if (!isMyTurn || playerAction !== "Drop") {
            toast.warn("Please wait for your turn!");
            return;
        }
        socket.emit("dropCard", { token, card: card.replace(/__dup$/, ''), timeStamp: Date.now() }, async (res) => {
            if (res && res.err) {
                toast.warn(res.err);
                return;
            }
        
            try {
                await Utils.dropMyCardAnimate({ dropedEl: cardRef.current, card: card.replace(/__dup$/, '') });
                dispatch(removePlayerCard({ card, ids }));
            } catch (error) {
                console.error("Animation failed", error); // Handle animation failure if necessary
            }
        });
    }

    return (
        <>
            {
                card ?                
                <div ref={cardRef} style={{ zIndex: isFocused && "10" }} className="relative inline-block transition-transform z-1 h-full">
                    <div style={{ transition: `clip-path .1s ease-in ${isFocused ? "0s" : ".2s"}`, clipPath: `${isFocused ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}` }} className="z-10 flex items-center bg-[rgba(0,0,0,0.1)] rounded-md justify-center absolute inset-0">
                        <button onClick={dropBtnClickHander} className="lg:px-4 px-2 font-medium rounded-md lg:py-2 py-1 bg-[var(--terColor)] text-[var(--mainColor)]">Drop</button>
                    </div>
                    <button onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={`max-w-16 lg:max-w-28 h-full w-full inline-block pointer-events-${isMyTurn && playerAction === "Drop" ? "auto" : "none"}`}>
                        <img className="pointer-events-none select-none" src={"/cards/" + card.replace(/__dup$/, '').toLowerCase().replace(/ /g, "-") + ".png"} alt={card} title={card} loading="lazy" />
                    </button>
                </div>
                :
                <></>
            }
        </>
    );
}