import { Link, useRouteError } from "react-router-dom";

export default function RoomError() {
    const error = useRouteError();
    const parsedErr = JSON.parse(error ? error?.data : "{'message': 'Something went wrong!'}");

    return (
        <>
            <main className="min-h-screen p-10 flex w-full items-center justify-center text-center">
                <div className="">
                    <h1>{ parsedErr?.message || "Something went wrong. Please try again!" }</h1>
                    <br />
                    <div className="flex gap-3 flex-wrap items-center justify-center">
                        <h3><Link to={"/"} className="px-4 inline-block py-2 font-semibold rounded text-[var(--terColor)] bg-[var(--mainColor)]">Home</Link></h3>                        
                        {
                            !!parsedErr.redirectURL &&
                            <h3><Link to={parsedErr.redirectURL} className="px-4 inline-block py-2 font-semibold rounded text-[var(--terColor)] bg-[var(--mainColor)]">{ parsedErr.textOnBtn || "Home" }</Link></h3>
                        }
                    </div>
                </div>
            </main>
        </>
    );
}