import Header from "../components/UI/Header";
import PublicRooms from "../components/Rooms/PublicRooms";
import CreateRoom from "../components/Rooms/CreateRoom";
import { Constants } from "../helpers/Constants";

export default function Home() {

    return (
        <>
            <Header />
            <main className="pb-20 pt-32">
                <div className="flex flex-col lg:flex-row gap-10 h-full my-auto items-stretch justify-center px-5 lg:px-10 flex-shrink-0">
                    <CreateRoom />
                    <PublicRooms />
                </div>
            </main>
        </>
    );
}

export const loader = async () => {
    try {
        const res = await fetch(Constants.publicRooms, {
            method: 'GET',
        });
        const response = await res.json();
        if (res.ok) {
            return { rooms: response.rooms || [] };
        } else {
            return { rooms: [] };
        }
    } catch (error) {
        console.error(error);
        return { rooms: [] };
    }
}