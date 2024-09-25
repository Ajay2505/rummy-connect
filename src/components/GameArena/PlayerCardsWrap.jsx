
import { useDispatch } from "react-redux";
import DraggableWrap from "../UI/DraggableWrap";
import LoaderBox from "../UI/LoaderBox";
import PlayerCardsGroups from "./PlayerCardGroups";
import { addNewCardSet } from "../../helpers/slices/playerCardsSlice";
import PlayerCardsBtns from "./PlayerCardsBtns";

function PlayerCardsWrap({ className }) {
    
    const dispatch = useDispatch();
    
    return (
        <>
            <section className={className ? className : "" + " overflow-hidden w-full fixed flex items-end lg:p-10 inset-0 z-10 pointer-events-none"}>
                <DraggableWrap className="pointer-events-auto rounded-md flex-shrink-0 bg-[rgba(0,0,0,0.3)] overflow-hidden">
                    <div className="p-3 transition-[width]">
                        <PlayerCardsBtns />
                        <LoaderBox loaderType={"PlayerCards"} />
                        <div id="playerCards" className="flex gap-2">
                            <PlayerCardsGroups />
                            <div className="flex items-center flex-shrink-0">
                                <button type="button" onClick={() => dispatch(addNewCardSet())}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </DraggableWrap>
            </section>
        </>
    );
}

export default PlayerCardsWrap;