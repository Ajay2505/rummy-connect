import SinglePlayer from "./SinglePlayer";

export default function TwoPlayerPage({ players, children }) {        

    return (
        <div className="min-h-screen flex p-5 lg:p-10 gap-y-8 flex-row lg:justify-between flex-wrap relative">
            {
                !!players && players[0]
                ?
                    <SinglePlayer className="self-start" player={players[0]} />
                :
                <>
                    <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                </>
            }
            <div className="self-end lg:self-center mx-auto w-fit flex flex-col gap-3 flex-wrap">
                {children}
            </div>
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
    );
}