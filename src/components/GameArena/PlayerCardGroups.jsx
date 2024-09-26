import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { getPlayerCardGroups, moveCardInGroups, reorderCardGroups } from "../../helpers/slices/playerCardsSlice";
import SingleCard from "./SingleCard";

export default function PlayerCardsGroups() {
    const dispatch = useDispatch();

    const cardSets = useSelector(getPlayerCardGroups);

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) return;

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
        
        if (sInd === dInd) {
            dispatch(reorderCardGroups({ groupIndex: sInd, startIndex: source.index, endIndex: destination.index }));
        } else {
            dispatch(
                moveCardInGroups({ sourceIndex: sInd, destIndex: dInd, sourceItemIndex: source.index, destItemIndex: destination.index })
            );
        }
    }

    return ( <div className="flex gap-1 lg:gap-2">
            {
                cardSets ?
                <DragDropContext onDragEnd={onDragEnd}>
                    {cardSets.map((el, ind) => {
                        return (
                            <Droppable
                                direction="horizontal"
                                key={ind}
                                droppableId={`${ind}`}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{ backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)" }}
                                        {...provided.droppableProps}
                                        className="transition-[background-color] flex p-1 lg:p-3 rounded"
                                    >
                                        {el?.map((item, index) => {
                                            return (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className={`max-w-24 w-full relative ${index > 0 ? "ml-[-3rem] lg:ml-[-4rem]" : "ml-0"}`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: "none",
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            <SingleCard ids={{ ind, index }} card={item.card} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </DragDropContext>
                : 
                <></>
            }
        </div>)
}