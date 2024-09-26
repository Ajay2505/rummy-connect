import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import socket from "../../../helpers/socket/socketService";
import { getMatchAction } from "../../../helpers/slices/matchActionSlice";
import { getPlayerCardGroups } from "../../../helpers/slices/playerCardsSlice";

function ShowBtn() {
    const { playerAction, playerTurn } = useSelector(getMatchAction);
    const { player, token } = useLoaderData();
    const isMyTurn = playerTurn === player.userName;

    const playerCards = useSelector(getPlayerCardGroups);

    const showBtnHandler = () => {
        socket.emit("matchShow", ({ token, playerCards }), (error) => {
            if (error && error.err) {
                toast.warn(error.err);
            }
        });
    }

    return <>
        {
            (isMyTurn && playerAction === "Drop") ?            
            <button onClick={showBtnHandler}>Show</button>
            : <></>
        }
    </>
}

export default React.memo(ShowBtn);