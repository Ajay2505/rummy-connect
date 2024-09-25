import { Link, useLoaderData } from "react-router-dom";
import { Constants } from "../helpers/Constants";
import { useEffect, useState } from "react";

export default function MatchResults() {
    const data = useLoaderData();

    const [results, setResults] = useState(data.results);
    
    function getPosition({ userName }) {
        return results.findIndex(r => r.userName === userName);
    }

    useEffect(() => {

    }, []);

    return (
        <main className="min-h-screen">
            <div className="min-h-screen mx-auto max-w-3xl flex justify-center items-center">
                {
                    results && Array.isArray(results) && results.length ?
                    <div className="w-full">
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
                                            <tr key={res.userName} className={idx % 2 !== 0 ? "bg-[var(--terColor)]" : ""}>
                                                <td className="!p-3 text-center">
                                                    {idx + 1}
                                                </td>
                                                <td className="!p-3 text-center">
                                                    <h2>{res.userName}</h2>
                                                </td>
                                                <td className="!p-3 text-center">
                                                    <p>{res.points}</p>
                                                    {
                                                        res.inGame === false ?
                                                        <></> :
                                                        <p>Waiting for finalised Points</p>
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
        const res = await fetch(Constants.matchResults + "?match_id=" + queryParams["match_id"], {
            method: 'GET',
            headers,
        });

        const response = await res.json();
        if (res.ok) {
            if (!response.results) {
                throw new Error("Something went wrong! Please try again.");
            }

            return response;
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error(error);
        throw new Response(JSON.stringify({ message: error.message }), { status: 404 });
    }
}