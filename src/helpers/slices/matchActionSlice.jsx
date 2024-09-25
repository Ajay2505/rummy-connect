import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerAction: null,
    playerTurn: "",
    turnStartedAt: "",
}

const matchActionSlice = createSlice({
    name: "matchAction",
    initialState,
    reducers: {
        setMatchAction: (state, action) => {
            return {
                ...state,
                turnStartedAt: action.payload.turnStartedAt || state.turnStartedAt,
                playerAction: action.payload.playerAction || state.playerAction,
                playerTurn: action.payload.playerTurn || state.playerTurn,
            }
        },
        resetMatchAction: () => {
            return initialState;
        }
    }
});

export default matchActionSlice.reducer;

// Dispatchers (Setters)
export const {
    setMatchAction,
    resetMatchAction,
} = matchActionSlice.actions;


// Selectors (Getters)
export const getMatchAction = state => state.matchAction;
export const getActionPending = state => state.matchAction.playerAction;
export const getPlayerTurn = state => state.matchAction.playerTurn;
export const getTurnStartedAt = state => state.matchAction.turnStartedAt;
