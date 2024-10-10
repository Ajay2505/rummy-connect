
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Constants } from "../helpers/Constants";
import socket from "../helpers/socket/socketService";
import SetPlayersPage from "../components/PlayersPages/SetPlayersPage";
import InviteBtn from "../components/UI/Buttons/InviteBtn";

export default function GameRoom() {
    const navigate = useNavigate();
    const { room, player, token } = useLoaderData();

    useEffect(() => {
        socket.emit("joinLobby", ({ token }), error => {
            if (error) {
                toast.warn(error);
                // navigate('/error', { state: { error } });
                return;
            }
        });

        return () => {
            const localData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALDATA)) || {};
            localData.player.currState = { playerIn: "Offline", collectionID: "" };

            localStorage.setItem(process.env.REACT_APP_LOCALDATA, JSON.stringify(localData));

            socket.emit("leaveLobby", { token });
        }
    }, [navigate, player.userName, room.roomID, token]);

    const startMatchHandler = async () => {
        try {
            const localData = localStorage.getItem(process.env.REACT_APP_LOCALDATA);
            const headers = {};
            
            if (localData && JSON.parse(localData).token) {
                headers["Authorization"] = JSON.parse(localData).token || "";
            } else {
                throw new Error("Unauthorised access!");
            }

            const res = await fetch(Constants.createMatch + "?room_id=" + room.roomID, {
                method: 'GET',
                headers,
            });
            
            const response = await res.json();

            if (res.ok && response.matchID && typeof response.matchID === "string") {
                socket.emit("startMatch", ({ token, roomID: room.roomID, matchID: response.matchID }), error => {
                    if (error) {
                        throw new Error(error.err);
                    }
                });
            } else {
                throw new Error(response.message);                
            }

        } catch (error) {
            toast.warn(error.message);
        }
    }    
    
    return (
        <SetPlayersPage>
            <div className="">
                <button onClick={startMatchHandler} type="button" className="px-4 py-2 text-center block mx-auto font-semibold rounded text-[var(--terColor)] bg-[var(--mainColor)]">Start Match</button>
                <br />
                <InviteBtn />
            </div>
        </SetPlayersPage>
    );
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    if (!queryParams["room_id"]) {
        throw new Response(JSON.stringify({ message: "Please Join In a room!" }), { status: 404 });
    }

    const localData = localStorage.getItem(process.env.REACT_APP_LOCALDATA);
    const headers = {};
    if (localData && JSON.parse(localData).token) {
        headers["Authorization"] = JSON.parse(localData).token || "";
    }

    try {
        const res = await fetch(Constants.joinRoom + "?room_id=" + queryParams["room_id"], {
            method: 'GET',
            headers,
        });
        const response = await res.json();
        if (res.ok) {
            if (!response.room || !response.room.roomID || !response.player) {
                throw new Error("Something went wrong! Please try again.");
            }
            localStorage.setItem(process.env.REACT_APP_LOCALDATA, JSON.stringify({ player: response.player, token: response.token }));
            return response;
        } else {
            if (res.status === 401) {
                localStorage.removeItem(process.env.REACT_APP_LOCALDATA);
                toast.warn("Please login again!");
            }
            const errorResponse = {
                message: response.message,
                redirectURL: response.redirectURL || null,
                textOnBtn: response.textOnBtn || null
            };
            throw new Response(JSON.stringify(errorResponse), { status: res.status });
        }
    } catch (error) {
        const errorResponse = await error.json();
        throw new Response(JSON.stringify(errorResponse), { status: 404 });
    }
}
