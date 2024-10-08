import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import socket from "../../helpers/socket/socketService";

import { getMatchAction, setMatchAction } from "../../helpers/slices/matchActionSlice";
import { addPlayerCard } from "../../helpers/slices/playerCardsSlice";
import Utils from "../../helpers/utils";

export default function DroppedCards({ type }) {

    const { playerAction, playerTurn } = useSelector(getMatchAction);
    const { player, token, room } = useLoaderData();
    const isMyTurn = playerTurn === player.userName;
    const dispatch = useDispatch();

    const [cards, setCards] = useState(room.droppedCards.map(cardObj => cardObj.card) || []);

    const cardsWrapRef = useRef();
    const cardPickBtnRef = useRef();
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        socket.on("dropCardAnimate", async ({ userName, card }) => {
            try {
                await Utils.dropPlayerCardAnimate({ userName: userName.replace(/\./g, '_').replace(/\s/g, '-'), card });
                setCards(prev => [...prev, card]);  
            } catch (error) {
                toast.warn(error);
            }
        });

        return () => {
            socket.off("dropCardAnimate");
        }
    }, [socket]);

    const cardPickHandler = () => {
        if (cardsWrapRef.current && cardsWrapRef.current.children && cardsWrapRef.current.children.length > 0) {
            socket.emit("pickCard", ({ cardType: type, token, timeStamp: Date.now() }), async (res) => {
                if (res?.error) {
                    toast.warn(res.error);
                    return;
                }
                const topCard = cardsWrapRef.current.children[cardsWrapRef.current.children.length - 1];
                await Utils.pickCardAnimate({ animateAndDelete: topCard, locationID: "playerCards" });
                
                dispatch(addPlayerCard({ card: res.addCard }));
                dispatch(setMatchAction({ playerAction: res.playerAction }));
            });
        }
    }

    useEffect(() => {
        socket.on("pickCardAnimate", async ({ cardType, userName }) => {
            if (cardType === type) {
                const topCard = cardsWrapRef.current.children[cardsWrapRef.current.children.length - 1];
                await Utils.pickCardAnimate({ animateAndDelete: topCard, locationID: userName });
            }
        });

        return () => {
            socket.off("pickCardAnimate");
        }
    }, [type, cardsWrapRef.current]);

    useEffect(() => {
        if (playerAction === "Pick" && cardPickBtnRef.current && cardsWrapRef.current && cardsWrapRef.current.children && cardsWrapRef.current.children.length > 0) {
            const transform = 0.25 * cardsWrapRef.current.children.length;
            cardPickBtnRef.current.style.transform = `translate(${transform}px, -${transform}px)`;
        }
    }, [isMyTurn, playerAction, cardsWrapRef.current]);

    return (
       <>
            {
                isMyTurn === true && playerAction === "Pick" ? 
                <div style={{ transition: `clip-path .1s ease-in ${isFocused ? "0s" : ".2s"}`, clipPath: `${isFocused ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"}` }} ref={cardPickBtnRef} className="z-[110] flex items-center bg-[rgba(0,0,0,0.3)] rounded-md justify-center absolute inset-0">
                    <button onClick={cardPickHandler} className="lg:px-4 px-2 font-medium rounded-md lg:py-2 py-1 bg-[var(--terColor)] text-[var(--mainColor)]">Pick</button>
                </div>                
                : 
                <>
                
                </>
            }
            <button id={type} ref={cardsWrapRef} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} role="button" onClick={(e) => e.preventDefault()} className={`absolute inline-block inset-0${isMyTurn === true && playerAction === "Pick" ? "" : " pointer-events-none"}`}>
                {!!cards && cards.length > 0 && (
                    cards.map((card, index) => {
                        const transform = 0.25 * index;
                        return (
                            <div style={{ transform: `translate(${transform}px, -${transform}px)` }} key={card + " " + type + " " + index} className="absolute inset-0 border border-[rgba(0,0,0,0.3)] rounded-lg">
                                <img className="pointer-events-none select-none" src={"/cards/" + card.toLowerCase().replace(/ /g, "-") + ".png"} alt={card} loading="lazy" />
                            </div>
                        );
                    })
                )}
            </button>
       </>
    );
}