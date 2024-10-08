import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../helpers/socket/socketService";

export default function MatchResults() {
    const data = useLoaderData();

    const [results, setResults] = useState(data.results);
   
    useEffect(() => {
        socket.on("updatePlayerResult", ({ playerState }) => {
            setResults(prevResults => {
                return prevResults.map(result => 
                    result.userName === playerState.userName 
                    ? { ...playerState } 
                    : result
                );
            });
        });

        return () => {
            socket.off("updatePlayerResult");
        }
    }, []);

    function getPosition({ userName }) {
        return results.findIndex(r => r.userName === userName);
    }

    return (
        <main className="px-3">
            <div className="min-h-screen mx-auto w-full lg:w-fit max-w-full flex justify-center items-center">
                {
                    results && Array.isArray(results) && results.length ?
                    <div className="w-full px-3 py-10">
                        <h1>{ getPosition({ userName: data.userName }) + 1 } / {results.length} </h1>
                        <br />
                        <table className="w-full border-collapse border border-[var(--mainColor)]">
                            <thead className="bg-[var(--mainColor)] text-[var(--terColor)]">
                                <tr>
                                    <td className="!p-3 text-center">Position</td>
                                    <td className="!p-3 text-center">UserName</td>
                                    <td className="!p-3 text-center">Points</td>
                                </tr>
                            </thead>
                            <tbody className="border">
                                {
                                    results.map((res, idx) => {
                                        return (
                                            <tr key={res.userName} className={res.userName === data.userName ? "bg-[var(--terColor)]" : ""}>
                                                <td className="!p-3 text-center">
                                                    {idx + 1}
                                                </td>
                                                <td className="!p-3 text-center">
                                                    <h2>{res.userName}</h2>
                                                    <p className="text-xs">{res.matchEndState}</p>
                                                    {
                                                        res.playerCards ?
                                                        <div className="flex gap-2 mt-3 justify-center w-full">
                                                            {
                                                                res.playerCards.map((cards) => {
                                                                    return (
                                                                        <div key={cards} className="flex">
                                                                            {
                                                                                cards.map((card, idx) => {
                                                                                    return (
                                                                                        <img key={card + idx} loading="lazy" className={`max-w-16 lg:max-w-20${idx > 0 ? ' ml-[-2.3rem] lg:ml-[-3rem]' : ''}`} src={`/cards/${card.replace(/__dup$/, '').toLowerCase().replace(/ /g, "-")}.png`} alt={card} />
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    )
                                                                    
                                                                })
                                                            }
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                </td>
                                                <td className="!p-3 text-center">
                                                    <p>{res.points}</p>
                                                    {
                                                        res.inGame === true ?
                                                        <p>Waiting for finalised Points</p> :
                                                        <></> 
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <br />
                        <Link to={data.lobbyURL} className="block font-semibold w-fit mx-auto bg-[var(--mainColor)] p-3 rounded text-[var(--terColor)]">Back to Lobby</Link>
                    </div>
                    :
                    <></>
                }
            </div>
        </main>
    )
}


export async function loader({ request }) {    
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());    
    if (!queryParams["match_id"]) {
        throw new Response(JSON.stringify({ message: "Cant find the match you are looking for!!" }), { status: 404 });
    }
    const localData = localStorage.getItem(process.env.REACT_APP_LOCALDATA);
    const headers = {};
    if (localData && JSON.parse(localData).token) {
        headers["Authorization"] = JSON.parse(localData).token || "";
    }
    try {
        const response = await new Promise((resolve, reject) => {
            socket.emit("view-result", { token: headers["Authorization"], matchID: queryParams["match_id"] }, res => {
                if (res && res.err) {
                    return reject(new Error(res.message || "Something went wrong!"));
                }
                resolve(res);
            });
        });

        console.log(response);
        
        return response;
        // const res = await fetch(Constants.matchResults + "?match_id=" + queryParams["match_id"], {
        //     method: 'GET',
        //     headers,
        // });

        // const response = await res.json();
        // if (res.ok) {
        //     if (!response.results) {
        //         throw new Error("Something went wrong! Please try again.");
        //     }
            
        //     return response;
        // } else {
        //     throw new Error(response.message);
        // }
    } catch (error) {
        console.error(error);
        throw new Response(JSON.stringify({ message: error.message }), { status: 404 });
    }
}