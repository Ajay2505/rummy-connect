import { lazy, useState, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import socket from "../../helpers/socket/socketService";
import MatchUpdates from "../UI/MatchUpdates";

const playerPages = {
    2: lazy(() => import("./TwoPlayerPage")),
    3: lazy(() => import("./ThreePlayerPage")),
    4: lazy(() => import("./FourPlayerPage")),
    5: lazy(() => import("./FivePlayerPage")),
};

export default function SetPlayersPage({ children }) {
    const [room, setRoom] = useState(useLoaderData().room || {});
    const PlayerPage = playerPages[room.maxPlayers || room.players.length || 2] || null;

    const location = useLocation();

    useEffect(() => {
        const handleUpdatePlayers = (data) => {
            const inGame = location.pathname === "/game";
        
            setRoom((prev) => {
                const playersChanged = data.players && data.players.length !== prev.players.length;
                if (!inGame || !playersChanged) {
                    return {
                        ...prev,
                        players: data.players || prev.players,
                        maxPlayers: data.maxPlayers || prev.maxPlayers,
                    };
                }  
        
                if (inGame && playersChanged) {
                    if (data.players && data.players.length < prev.players.length) {
                        const updatedPlayers = prev.players.map((player) => {
                            const isPlayerInNewData = data.players.findIndex(p => p.userName === player.userName);
                            if (isPlayerInNewData < 0) {
                                return { ...player, playerStatus: "Offline" };
                            }
                            return player;
                        });
    
                        return {
                            ...prev,
                            players: updatedPlayers,
                        };
                    }

                    return {
                        ...prev,
                        players: prev.players,
                        maxPlayers: prev.players.length,
                    };
                }
                
                return {
                    ...prev,
                    players: data.players || prev.players,
                    maxPlayers: data.maxPlayers || prev.maxPlayers,
                };                
            });
        };
        

        socket.on("updatePlayers", handleUpdatePlayers);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
        };
    }, []);

    return PlayerPage ? (
        <PlayerPage players={room.players || []}>
            {children}
            <MatchUpdates />
        </PlayerPage>
    ) : <div></div>;
}