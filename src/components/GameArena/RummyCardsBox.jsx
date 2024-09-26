import { useLoaderData } from "react-router-dom";

import MainBox from "../UI/MainBox";
import NewCards from "./NewCards";
import LoaderBox from "../UI/LoaderBox";
import MatchCountDown from "../UI/MatchCountDown";
import MatchEndTimer from "../UI/MatchEndTimer";
import DroppedCards from "./DroppedCards";

export default function RummyCardsBox({ className }) {
    
    const { joker } = useLoaderData().room;

    return (
        
        <div className="relative">
            <MatchCountDown />
            <MatchEndTimer />
            <MainBox className={`bg-[rgba(0,0,0,0.3)] w-full overflow-hidden items-center px-3 lg:px-6 pt-6 pb-2 gap-2 flex z-10 relative${className ? " " + className : ""}`}> 
                <LoaderBox loaderType="MatchCards" />
                <div className="img_wrapper max-w-16 lg:max-w-24 flex-shrink-0 relative">
                    <img src="/cards/empty-card.png" alt="Empty card" loading="eager" />
                    <div className="absolute left-16 z-0 top-1/2 -translate-y-1/2 max-w-16 lg:max-w-24 w-full rotate-90">
                        <img className="pointer-events-none select-none" src="/cards/empty-card.png" alt="Empty card" loading="eager" />
                        <div className="absolute inset-0">
                            <img className="pointer-events-none select-none" src={"/cards/" + joker.toLowerCase().replace(/ /g, "-") + ".png"} alt={joker} title={joker} loading="lazy" />
                        </div>
                    </div>
                    <NewCards type={"newCard"} />
                </div>
                <div className="p-10 flex-shrink-0"></div>
                <div className="img_wrapper max-w-16 lg:max-w-24 relative w-full h-full flex-shrink-0">
                    <img id="dropEmptyCard" className="pointer-events-none select-none" src="/cards/empty-card.png" alt="Empty card" loading="eager" />                    
                    <div id="droppedCardsWrap">
                        <DroppedCards type={"dropped"} />
                    </div>
                </div>
            </MainBox>
        </div>
    );
}