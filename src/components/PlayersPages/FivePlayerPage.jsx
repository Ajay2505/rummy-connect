import SinglePlayer from "./SinglePlayer";

export default function FivePlayerPage(props) {
    return (
        <div className="min-h-screen w-full flex items-center justify-around gap-5 lg:justify-between px-10 py-4 flex-col">
            {
                !!props.players[0]
                ?
                    <SinglePlayer player={props.players[0]} />
                :
                <>
                    <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                </>
            }
            <div className="flex flex-col xl:flex-row gap-5 w-full xl:justify-between items-center">
                {
                    !!props.players[1] 
                    ?
                        <SinglePlayer player={props.players[1]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{ userName: "Waiting for the Player to Join..." }} />
                    </>
                }
                <div className="max-xl:-order-1 flex-shrink-0">
                    {props.children}
                </div>
                {
                    !!props.players[2] 
                    ?
                        <SinglePlayer player={props.players[2]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
            <div className="flex flex-col xl:flex-row gap-5 w-full justify-around items-center">
                {
                    !!props.players[3] 
                    ?
                        <SinglePlayer player={props.players[3]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                {
                    !!props.players[4]
                    ?
                        <SinglePlayer player={props.players[4]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
        </div>
    );
}