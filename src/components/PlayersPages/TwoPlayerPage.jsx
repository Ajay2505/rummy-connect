import SinglePlayer from "./SinglePlayer";

export default function TwoPlayerPage({ players, children }) {        

    return (
        <div className="min-h-screen flex p-5 lg:p-10 gap-y-8 flex-col sm:flex-row lg:justify-between flex-wrap relative">
            {
                !!players && players[0]
                ?
                    <SinglePlayer className="self-start" player={players[0]} />
                :
                <>
                    <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                </>
            }
            <div className="self-center mx-auto lg:w-fit">
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