import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getMatchAction } from "../../helpers/slices/matchActionSlice";
import classes from "./LoaderBox.module.css";
import React from "react";

function LoaderBox({ loaderType, userName }) {
    const { player, room } = useLoaderData();

    const { turnStartedAt, playerAction, playerTurn } = useSelector(getMatchAction);
    const isMyTurn = playerTurn === player.userName;

    const timeLeft = Math.round(Math.max((parseInt(turnStartedAt) + (parseInt(room.timeLimit) * 1000) - parseInt(Date.now())) / 1000 , 0));    

    useEffect(() => {
        const dropLoader = document.getElementById("PlayerCardsloader");
        const pickLoader = document.getElementById("MatchCardsloader");

        if (dropLoader && pickLoader) {
            if (isMyTurn) {
                if (loaderType === "PlayerCards") {
                    if (playerAction === "Drop") {
                        dropLoader.classList.add(classes.active);
                    } else {
                        dropLoader?.classList.remove(classes.active);
                    }
                }
                if (loaderType === "MatchCards") {
                    if (playerAction === "Pick") {
                        pickLoader.classList.add(classes.active);
                    } else {
                        pickLoader?.classList.remove(classes.active);
                    }
                }
            } else {
                pickLoader?.classList.remove(classes.active);
                dropLoader?.classList.remove(classes.active);
            }
        }
        
        if (loaderType === "SinglePlayer") {
            const playerTurnLoader = document.querySelector(
                `#${userName.replace(/\./g, '_').replace(/\s/g, '-') || "player"} > #SinglePlayerloader`
            );
            
            if (playerTurnLoader && playerTurn === userName) {
                playerTurnLoader.classList.add(classes.active);
            } else {
                playerTurnLoader?.classList.remove(classes.active);
            }
        }

        return () => {
            dropLoader?.classList.remove(classes.active);
            pickLoader?.classList.remove(classes.active);            
        };
        
    }, [turnStartedAt, playerTurn, playerAction, isMyTurn, loaderType, userName]);

    return (
        <div id={loaderType + "loader"} style={{ "--timeLeft": `${timeLeft}s` }} className={classes.box}>
            <div className={classes.bl}></div>
        </div>
    );
}

export default React.memo(LoaderBox);