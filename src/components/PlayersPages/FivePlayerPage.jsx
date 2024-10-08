import SinglePlayer from "./SinglePlayer";

export default function FivePlayerPage({ players, children }) {

    return (
        <div className="min-h-screen flex p-5 lg:p-10 gap-y-8 flex-row justify-between flex-wrap relative transition-[padding]">
            <div className="flex flex-col justify-between gap-3  pt-24 lg:pt-28">
                {
                    !!players && players[0]
                    ?
                        <SinglePlayer className="self-start" player={players[0]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse self-start" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                {
                    !!players && players[1]
                    ?
                        <SinglePlayer className="self-end" player={players[1]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse self-end" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
            <div className="flex flex-col gap-14 sm:w-full max-w-xs md:max-w-md ">
                {
                    !!players && players[2]
                    ?
                        <SinglePlayer className="self-end mx-auto" player={players[2]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse self-end mx-auto" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                <div className="self-center w-full flex flex-col gap-3 flex-wrap">
                    {children}
                </div>
            </div>
            {/* <div className="self-center mx-auto sm:w-full max-w-xs md:max-w-md flex flex-col gap-3 flex-wrap">
            </div> */}
            <div className="flex flex-col justify-between gap-3 pt-24 lg:pt-28">
                {
                    !!players && players[3]
                    ?
                        <SinglePlayer className="self-end" player={players[3]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse self-end" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                {
                    !!players && players[4]
                    ?
                        <SinglePlayer className="self-end" player={players[4]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse self-end" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
        </div>
    );
}