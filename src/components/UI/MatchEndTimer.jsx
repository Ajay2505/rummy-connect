import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import socket from "../../helpers/socket/socketService";
import { getPlayerCardGroups } from "../../helpers/slices/playerCardsSlice";

function MatchEndTimer() {
    const [showMessage, setShowMessage] = useState(false);
    const { token } = useLoaderData();
    const navigate = useNavigate();  

    const [timer, setTimer] = useState(0);
    const [playerName, setPlayerName] = useState("");

    const playerCards = useSelector(getPlayerCardGroups);
    const timeIntervalRef = useRef(null);  // useRef for interval
    const timeoutRef = useRef(null);  // useRef for timeout

    useEffect(() => {
        function decrementTimer() {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
            timeIntervalRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(timeIntervalRef.current);
                        return 0;
                    }
                });
            }, 1000);
        }

        const handleMatchEndTimer = ({ redirectURL, timeLimit, showBy }) => {
            socket.emit("setMyPoints", { token, playerCards }, (error) => {
                if (error) {
                    console.error(error);
                }
            });

            setShowMessage(true);
            setTimer(parseInt(timeLimit));

            setPlayerName(showBy?.userName || "Unknown Player");

            decrementTimer();

            timeoutRef.current = setTimeout(() => {
                navigate(redirectURL);
            }, parseInt(timeLimit) * 1000); 
        };

        socket.on("matchEndTimer", handleMatchEndTimer);

        return () => {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            socket.off("matchEndTimer", handleMatchEndTimer);
        };
    }, [playerCards, token, navigate]);

    return (
        <>
            {showMessage && (
                <div className="absolute inset-0 p-3 rounded z-20 bg-[rgba(0,0,0,0.8)]">
                    <p>{playerName} has won the match. Match ends in {timer}, arrange the cards before that to get lower points.</p>
                </div>
            )}
        </>
    );
}

export default React.memo(MatchEndTimer);