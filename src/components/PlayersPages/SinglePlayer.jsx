import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';

import LoaderBox from '../UI/LoaderBox';

export default function SinglePlayer(props) {
    const { player } = props;
    const location = useLocation();
    const loaderData = useLoaderData();
    
    const activeStatus = location.pathname === "/room" ? player.playerStatus === "InLobby" : player.playerStatus === "InGame";

    return (
        <div id={player.userName.replace(/\./g, '_').replace(/\s/g, '-')} className={`${props.className || ""} ${activeStatus ? "" : "opacity-30"} flex flex-col justify-between max-w-60 max-h-64 relative flex-shrink-0 overflow-hidden border border-[var(--mainColor)] shadow rounded-md hover:shadow-md transition-shadow`}>
            {
                player.isAdmin ?
                <div className="absolute p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                </div>
                :
                <></>
            }
            <LoaderBox userName={player.userName} loaderType={"SinglePlayer"} />
            <div className="icon_wrapper max-w-32 mx-auto p-5 h-full">
                {
                    loaderData.player.userName === player.userName ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                }
            </div>
            {
                location.pathname === "/room" && player.playerStatus === "InGame" ?
                <p className="text-center animate-pulse">Match in Progress...</p>
                :
                <></>
            }
            <div className="relative z-1 lg:p-2 px-2 bg-[rgba(0,0,0,0.3)]">
                <p className="text-center">
                    {player?.userName}
                </p>
            </div>
        </div>
    );
}

// // Memoize the SinglePlayer component
// export default React.memo(SinglePlayer, (prevProps, nextProps) => {
//     return (
//         prevProps.player?.playerName === nextProps.player?.playerName &&
//         prevProps.player?.isOffline === nextProps.player?.isOffline &&
//         prevProps.className === nextProps.className
//     );
// });