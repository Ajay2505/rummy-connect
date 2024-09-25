import { lazy, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import socket from "../../helpers/socket/socketService";

const playerPages = {
    2: lazy(() => import("./TwoPlayerPage")),
    3: lazy(() => import("./ThreePlayerPage")),
    4: lazy(() => import("./FourPlayerPage")),
    5: lazy(() => import("./FivePlayerPage")),
};

export default function SetPlayersPage({ children }) {
    const [room, setRoom] = useState(useLoaderData().room || {});
    const PlayerPage = playerPages[room.maxPlayers || room.players.length || 2] || null;

    useEffect(() => {
        const handleUpdatePlayers = (data) => {
            setRoom((prev) => ({
                ...prev,
                players: data.players || prev.players,
                maxPlayers: data.maxPlayers || prev.maxPlayers
            }));
        };

        socket.on("updatePlayers", handleUpdatePlayers);

        // Cleanup function to remove the event listener
        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
        };
    }, []);

    return PlayerPage ? (
        <PlayerPage players={room.players || []}>
            {children}
        </PlayerPage>
    ) : <div></div>;
}