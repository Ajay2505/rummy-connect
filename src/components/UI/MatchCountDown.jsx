import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function MatchCountDown() {
    const { matchStartedAt } = useLoaderData().room;

    const [matchCountDown, setMatchCountDown] = useState({ show: false, timeLeft: 0 });

    useEffect(() => {
        // Check if match has not started yet
        const timeUntilStart = parseInt(matchStartedAt) - Date.now();
        
        if (timeUntilStart > 0) {
            const updateInterval = setInterval(() => {
                const timeLeft = parseInt(matchStartedAt) - Date.now();
                if (timeLeft <= 0) {
                    clearInterval(updateInterval);
                    setMatchCountDown({ show: false, timeLeft: 0 });
                } else {
                    setMatchCountDown({ show: true, timeLeft: Math.floor(timeLeft / 1000) });
                }
            }, 1000);
            
            // Clean up interval on component unmount
            return () => clearInterval(updateInterval);
        }
    }, [matchStartedAt]);

    return(        
        <div>
            {   
                !!matchCountDown.show &&                 
                <div className="animate-pulse">
                    <p>Match Starts in {matchCountDown.timeLeft}</p>
                </div>
            }
        </div>
    )
}