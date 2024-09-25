import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { getMatchAction } from "../../../helpers/slices/matchActionSlice";
import socket from "../../../helpers/socket/socketService";

function DropBtn() {
    const { playerAction, playerTurn } = useSelector(getMatchAction);
    const { player, token } = useLoaderData();
    const isMyTurn = playerTurn === player.userName;

    const dropBtnHandler = () => {
        socket.emit("matchDrop", ({ token }), (error) => {
            if (error && error.err) {
                toast.warn(error.err);
            }
        });
    }
    

    return (
        <>
            {
                (isMyTurn && playerAction === "Pick") ?
                <>
                    <button onClick={dropBtnHandler}>Drop</button>
                </> 
                : <></>
            }
        </>
    )
}

export default React.memo(DropBtn);