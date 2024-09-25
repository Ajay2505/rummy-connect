import { useDispatch, useSelector } from "react-redux";
import Utils from "../../../helpers/utils";
import { useLoaderData } from "react-router-dom";
import { getPlayerCards, reArrangePlayerCards } from "../../../helpers/slices/playerCardsSlice";
import { useState } from "react";
import React from "react";

function ReArrangeBtn() {
    const playerCardsWithDup = useSelector(getPlayerCards);
    const playerCards = playerCardsWithDup.map(card => card.replace(/__dup$/, ''));
    const { joker, powerCards } = useLoaderData().room;
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);

    const reArrangeCards = async () => {
        console.time('rearrange');
        const reArrangedCards = Utils.reArrangeCards({ playerCards, joker, powerCards });
        
        dispatch(reArrangePlayerCards({ cards: reArrangedCards }));
        setClicked(true);
        
        console.timeEnd('rearrange');
    }

    return <>
        {
            !clicked ?
            <button onClick={reArrangeCards}>ReArrange</button>
            :
            <></>
        }
    </>
}

export default React.memo(ReArrangeBtn);
