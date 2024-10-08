import { memo, useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import socket from "../../helpers/socket/socketService";
import { getPlayerCardGroups } from "../../helpers/slices/playerCardsSlice";
import { toast } from "react-toastify";

function MatchEndTimer() {
    const [showMessage, setShowMessage] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [redirectURL, setRedirectURL] = useState("#");
    const [timer, setTimer] = useState(0);

    const timeoutRef = useRef();
    const timeIntervalRef = useRef();

    const { token, room } = useLoaderData();
    const playerCards = useSelector(getPlayerCardGroups);
    const playerCardsRef = useRef(playerCards);

    useEffect(() => {
        playerCardsRef.current = playerCards;
    }, [playerCards]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on("matchEndTimer", ({ redirectURL, timeLimit, showBy }) => {
            setRedirectURL(redirectURL);
            setPlayerName(showBy || "");
            setShowMessage(true);
            setTimer(() => parseInt(timeLimit));

            timeIntervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            timeoutRef.current = setTimeout(() => {
                // socket.emit("setMyPoints", { token, playerCards, inGame: false }, (res) => {
                //     if (res && res?.err) {
                //         toast.warn(res.err);
                //     }
                // });
                navigate(redirectURL);
            }, parseInt(timeLimit) * 1000 + 1000 || 5000);

            socket.emit("setMyPoints", { token, playerCards: playerCardsRef.current, matchID: room.matchID }, (res) => {
                    if (res && res?.err) {
                        toast.warn(res.err);
                    }
                }
            );
        });

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                console.log(playerCardsRef.current, "cleanup");
                socket.emit("setMyPoints", { token, playerCards: playerCardsRef.current, matchID: room.matchID }, (res) => {
                        if (res && res?.err) {
                            toast.warn(res.err);
                            return;
                        }
                        if (res.redirectURL) {
                            navigate(res.redirectURL);
                        }
                    }
                );
            }
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
            socket.off("matchEndTimer");
        };
    }, []);

    return (
        <>
            {showMessage && (
                <div className="absolute inset-0 p-3 rounded z-20 bg-[rgba(0,0,0,0.85)]">
                    <p>
                        {playerName} has won the match. Match ends in {timer} seconds,
                        arrange the cards before timer ends and continue to get lower
                        points.
                    </p>
                    <Link
                        to={redirectURL}
                        type="button"
                        className="block font-semibold w-fit mx-auto bg-[var(--mainColor)] p-3 rounded text-[var(--terColor)]"
                    >
                        Continue
                    </Link>
                </div>
            )}
        </>
    );
}

export default memo(MatchEndTimer);
