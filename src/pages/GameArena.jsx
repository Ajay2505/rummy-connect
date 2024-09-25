import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import SetPlayersPage from "../components/PlayersPages/SetPlayersPage";
import RummyCardsBox from "../components/GameArena/RummyCardsBox";
import PlayerCardsWrap from "../components/GameArena/PlayerCardsWrap";

import socket from "../helpers/socket/socketService";
import { Constants } from "../helpers/Constants";

import { resetMatchAction, setMatchAction } from "../helpers/slices/matchActionSlice";
import { resetPlayerCards, setPlayerCardGroups } from "../helpers/slices/playerCardsSlice";

export default function GameArena() {
    const { room, playerStatus, playerState, token } = useLoaderData();
    const dispatch = useDispatch();
    const [showPlayerCards, setShowPlayerCards] = useState(playerStatus === "InGame");

    useEffect(() => {
        socket.on("playerLost", () => {
            setShowPlayerCards(false);
        });

        const activePLayer = room.players.find(p => p.isMyTurn);
        if (activePLayer) {
            dispatch(setMatchAction({ playerAction: activePLayer.playerAction, playerTurn: activePLayer.userName, turnStartedAt: activePLayer.turnStartedAt }));
        }
        
        dispatch(setPlayerCardGroups({ cards: playerState, joker: room.joker, powerCards: room.powerCards }));        

        socket.emit("joinMatch", { token }, error => {
            if (error) {
                toast.warn(error);
            }
        });

        socket.on("setPlayerAction", ({ playerAction, turnStartedAt, playerTurn }) => {
            dispatch(setMatchAction({ playerAction, turnStartedAt, playerTurn }));
        });

        return () => {
            const localData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALDATA)) || {};
            localData.player.currState = { playerIn: "Offline", collectionID: "" };

            localStorage.setItem(process.env.REACT_APP_LOCALDATA, JSON.stringify(localData));

            socket.emit("leaveMatch", { token });

            socket.off("playerLost");
            socket.off("setPlayerAction");

            dispatch(resetMatchAction());
            dispatch(resetPlayerCards());
        }
    }, [room, playerState, token, dispatch]);

    return (
        <div>
            <SetPlayersPage>
                <RummyCardsBox />
            </SetPlayersPage>
            {
                !!showPlayerCards &&
                <PlayerCardsWrap />
            }
        </div>
    );
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());    
    if (!queryParams["match_id"]) {
        throw new Response(JSON.stringify({ message: "Please Join In a room!" }), { status: 404 });
    }
    const localData = localStorage.getItem(process.env.REACT_APP_LOCALDATA);
    const headers = {};
    if (localData && JSON.parse(localData).token) {
        headers["Authorization"] = JSON.parse(localData).token || "";
    }
    try {
        const res = await fetch(Constants.joinMatch + "?match_id=" + queryParams["match_id"], {
            method: 'GET',
            headers,
        });

        const response = await res.json();
        if (res.ok) {
            if (!response.match || !response.match.players || !response.match.players.length) {
                throw new Error("Something went wrong! Please try again.");
            }

            const player = response.match.players.find(playerObj => {
                return playerObj.userName.toString() === response.player.userName.toString();
            });

            if (!player) {
                throw new Error("Something went wrong. Please try again later!");
            }

            localStorage.setItem(process.env.REACT_APP_LOCALDATA, JSON.stringify({ player: response.player, token: response.token }));

            return {
                room: response.match || {},
                player,
                token: response.token,
                playerState: response.playerState,
                playerStatus: response.playerStatus
            };
        } else {
            const errorResponse = {
                message: response.message,
                redirectURL: response.redirectURL || null,
                textOnBtn: response.textOnBtn || null
            };
            throw new Response(JSON.stringify(errorResponse), { status: res.status });
        }
    } catch (error) {
        console.error(error);
        const errorResponse = await error.json();
        throw new Response(JSON.stringify(errorResponse), { status: errorResponse.status || 404 });
    }    
}