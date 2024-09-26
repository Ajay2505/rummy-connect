import React from "react";
import ReArrangeBtn from "../UI/Buttons/ReArrangeBtn";
import DropBtn from "../UI/Buttons/DropBtn";
import ShowBtn from "../UI/Buttons/ShowBtn";

function PlayerCardsBtns() {

    return(
        <div className="flex gap-2">
            <ReArrangeBtn />
            <DropBtn />
            <ShowBtn />
        </div>
    )
}

export default React.memo(PlayerCardsBtns);