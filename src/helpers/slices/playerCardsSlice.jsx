import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerCards: [],
    cardSets: [],
};

const reorder = (list, startIndex, endIndex) => {
    if (!Array.isArray(list)) {
        console.error('The provided list is not an array:', list);
        return [];
    }
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, sourceIndex, destIndex) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(sourceIndex, 1);
    destClone.splice(destIndex, 0, removed);

    return [sourceClone, destClone];
};

const playerCardsSlice = createSlice({
    name: "playerCards",
    initialState,
    reducers: {
        reArrangePlayerCards: (state, action) => {
            const cards = action.payload.cards;
            if (!cards || !Array.isArray(cards)) {
                return;
            }
            state.cardSets = cards;
        },
        setPlayerCardGroups: (state, action) => {
            if (!action.payload.cards || !Array.isArray(action.payload.cards)) {
                console.error("Invalid or undefined cards array provided.");
                return;
            }
            state.playerCards = action.payload.cards;
            const cardCounts = {};
            const updatedCards = action.payload.cards.map(card => {
                if (cardCounts[card]) {
                    cardCounts[card]++;
                    return { id: `${card.replace(/ /, "_")}__dup`, card };
                } else {
                    cardCounts[card] = 1;
                    return { id: card.replace(/ /, "_"), card };
                }
            });
            
            state.cardSets = [updatedCards];
        },
        addNewCardSet: (state) => {
            if (state.cardSets && state.cardSets.length >= 7) {
                return {
                    ...state,
                }
            }
            return {
                ...state,
                cardSets: [...state.cardSets, []],
            };
        },
        reorderCardGroups: (state, action) => {
            const { groupIndex, startIndex, endIndex } = action.payload;
            const currentGroup = state.cardSets[groupIndex];
        
            if (Array.isArray(currentGroup)) {
                const reorderedGroup = reorder(currentGroup, startIndex, endIndex);
                state.cardSets[groupIndex] = reorderedGroup;  // Directly mutate the draft
                state.cardSets = state.cardSets.filter(group => group.length > 0);
            } else {
                console.error(`Invalid group at index ${groupIndex}:`, currentGroup);
            }
        },
        moveCardInGroups: (state, action) => {
            const { sourceIndex, destIndex, sourceItemIndex, destItemIndex } =
                action.payload;
            const [newSource, newDest] = move(
                state.cardSets[sourceIndex],
                state.cardSets[destIndex],
                sourceItemIndex,
                destItemIndex
            );

            state.cardSets[sourceIndex] = newSource;
            state.cardSets[destIndex] = newDest;

            state.cardSets = state.cardSets.filter(group => group.length > 0);
        },
        addPlayerCard: (state, action) => {
            const card = action.payload.card;
            if (card && state.playerCards.includes(card)) {
                state.cardSets = [ ...state.cardSets, [{ id: `${card.replace(/ /, "_")}__dup`, card }]]
            } else if (card) {
                state.cardSets = [ ...state.cardSets, [{ id: `${card.replace(/ /, "_")}`, card }]];
            }

            state.playerCards.push(card);
        },
        removePlayerCard: (state, action) => {
            const card = action.payload.card;
            const ids = action.payload.ids;
            if (card && ids) {
                state.cardSets[ids.ind].splice(ids.index, 1);
                if (state.cardSets[ids.ind].length < 1) {
                    state.cardSets = state.cardSets.filter(group => group.length > 0);
                }
                const index = state.playerCards.indexOf(card);
                if (index !== -1) {
                    state.playerCards.splice(index, 1);
                }
            }
        },
        resetPlayerCards: () => {
            return initialState;
        }
    }
});


export const { reArrangePlayerCards, setPlayerCardGroups, addNewCardSet, reorderCardGroups, moveCardInGroups, addPlayerCard, removePlayerCard, resetPlayerCards } = playerCardsSlice.actions;

export default playerCardsSlice.reducer;

export const getPlayerCardGroups = state => state.playerCards.cardSets;
export const getPlayerCards = state => state.playerCards.playerCards;