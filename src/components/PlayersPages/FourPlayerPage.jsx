import SinglePlayer from "./SinglePlayer";

export default function FourPlayerPage(props) {
    return (
        <div className="min-h-screen w-full flex justify-around gap-5 lg:justify-between p-10 lg:flex-row flex-col">
            <div className="flex flex-col gap-4 justify-between">
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
                    !!props.players[1] 
                    ?
                        <SinglePlayer player={props.players[1]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>
            <div className="flex items-center">
                {props.children}
            </div>
            <div className="flex flex-col gap-4 justify-between">
                {
                    !!props.players[2]
                    ?
                        <SinglePlayer player={props.players[2]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
                {
                    !!props.players[3]
                    ?
                        <SinglePlayer player={props.players[3]} />
                    :
                    <>
                        <SinglePlayer className="animate-pulse" player={{userName: "Waiting for the Player to Join..."}} />
                    </>
                }
            </div>                
        </div>
    );
}