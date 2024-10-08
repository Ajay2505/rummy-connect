import { Link, useLoaderData } from "react-router-dom";
import Input from "../UI/Input";
import MainBox from "../UI/MainBox";

export default function PublicRooms() {

    const { rooms } = useLoaderData() || [];
    console.log(rooms);

    return (
        <>
            <MainBox className="mainShadow w-full lg:p-8 p-4 border border-[#E6E9EB]">
                <h3>Join a Room</h3>
                <br />
                <Input inputAttributes={{ placeholder: "Start typing... (Search by Name or Room ID) ", required: true, name: "search" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search flex-shrink-0" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </Input>
                <div className="max-h-72 overflow-y-auto">
                    <table className="w-full table-fixed">
                        <thead className="sticky top-0">  
                            <tr>
                                <th className="text-left">Room Name</th>
                                {/* <th className="text-left">Bet Amount</th> */}
                                <th className="text-left">Players</th>
                                <th className="text-left">Join Now</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms.length < 1 ?
                                <>
                                    <tr>
                                        <td className="py-4" colSpan={4}>Sorry No plublic rooms available right now!</td>
                                    </tr>
                                </>
                                :
                                <>
                                    {
                                        rooms.map(room => {
                                            return (
                                                <tr key={room?.roomID}>
                                                    <td className="pr-1 lg:pr-3 align-middle">{ room?.roomName }</td>
                                                    {/* <td className="pr-1 lg:pr-3 align-middle">{ room?.betAmount }</td> */}
                                                    <td className="pr-1 lg:pr-3 align-middle">{ room?.players.length } / { room?.maxPlayers }</td>
                                                    <td className="pr-1 lg:pr-3 align-middle py-2">                                
                                                        <Link className="rounded-md text-center block font-semibold text-[var(--terColor)] px-4 py-2 bg-[var(--mainColor)]" to={`/room?room_id=${room?.roomID}`}>
                                                            JOIN
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </MainBox>
        </>
    )
}