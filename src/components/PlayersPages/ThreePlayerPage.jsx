import SinglePlayer from "./SinglePlayer";

export default function TwoPlayerPage(props) {
    return (
        <div className="min-h-screen w-full flex items-center justify-around gap-5 lg:justify-between p-10 flex-col">
            <div className="flex flex-col xl:flex-row gap-5 items-center justify-between w-full">
                {
                    !!props.players[0] 
                    ?
                        <SinglePlayer player={props.players[0]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                {
                    <div className="max-xl:-order-1">
                        {props.children}
                    </div>
                }
                {
                    !!props.players[1] 
                    ?
                        <SinglePlayer player={props.players[1]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
            <div className="flex justify-end w-full">
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
        </div>
    );
}