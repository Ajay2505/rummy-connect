import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Constants } from "../../helpers/Constants";
import Input from "../UI/Input";
import MainBox from "../UI/MainBox";

export default function CreateRoom() {

    const navigate = useNavigate();

    const submitHandler = async evt => {
        evt.preventDefault();
        evt.target.button.disabled = true;
        const formData = new FormData(evt.target);
        const formDataObject = {};
    
        formData.forEach((value, key) => {
            const formElement = evt.target.elements[key];

            if (formElement && formElement.type === "number") {
                formDataObject[key] = Number(value);
            } else if (key === "timeLimit") {
                formDataObject[key] = parseInt(value.slice(0, -1));
            } else {
                formDataObject[key] = value; 
            }
        });

        
        const localData = localStorage.getItem(process.env.REACT_APP_LOCALDATA);
        const headers = {
            "Content-Type": "application/json",
        }
        if (localData && JSON.parse(localData)?.token) {
            headers["Authorization"] = JSON.parse(localData).token || "";
        }

        try {
            const res = await fetch(Constants?.createRoom, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers,
            });
            const response = await res.json();
            if (res.ok) {
                localStorage.setItem(process.env.REACT_APP_LOCALDATA, JSON.stringify(response));
                navigate("/room?room_id=" + response?.room?.roomID);
            } else {
                if (res.status === 401) {
                    localStorage.removeItem(process.env.REACT_APP_LOCALDATA);
                    toast.warn("Please login again.");
                } else {
                    toast.warn(response.message);
                }
            }
        } catch (error) {
            toast.warn(error.message);
        }

        evt.target.button.disabled = false;
    }

    return (
        <>
            <MainBox className="mainShadow w-full h-full lg:p-8 p-4 border border-[#E6E9EB]">
                <h3>Create a Room</h3>
                <br />
                <form onSubmit={submitHandler}>
                    <Input inputAttributes={{ placeholder: "Room Name *", required: true, name: "roomName", minLength: 4 }} />
                    <Input options={[2, 3, 4, 5]} inputAttributes={{ placeholder: "Max Players In Room *", type: "number", required: true, name: "maxPlayers" }} />
                    {/* <Input options={[100, 200, 300, 500, 1000]} inputAttributes={{ placeholder: "Bet Amount *", type: "number", required: true, name: "betAmount" }} /> */}
                    <Input options={["40s", "50s", "60s", "70s", "90s", "100s"]} inputAttributes={{ placeholder: "Time Limit per each turn *", required: true, name: "timeLimit"  }} />
                    <Input options={["Public", "Private"]} inputAttributes={{ placeholder: "Room Type *", required: true, name: "roomType" }} />
                    <button name="button" type="submit" className="rounded-md font-semibold text-[var(--terColor)] px-4 py-2 bg-[var(--mainColor)]">CREATE</button>
                </form>
            </MainBox>
        </>
    )
}