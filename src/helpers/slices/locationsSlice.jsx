import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rummyBoxRefs: { dropCard: "", newCard: "" },
    appendPlayerCard: "",
    playersLocation: {}
}

const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        setRummyBoxRefs: (state, action) => {
            state.rummyBoxRefs[action.payload.type] = action.payload.cardRef;
        },
        setAppendPlayerCard: (state, action) => {
            state.appendPlayerCard = action.payload.cardRef;
        },
        setPlayersLocation: (state, action) => {
            state.playersLocation[action.payload.userName] = action.payload.cardRef;
        },
        resetLocation: () => {
            return initialState;
        }
    }
});

// Dispatchers (Setters)
export const { setRummyBoxRefs, setAppendPlayerCard, setPlayersLocation, resetLocation } = locationsSlice.actions;

// Selectors (Getters)
export const getRummyBoxRefs = state => state.locations.rummyBoxRefs;
export const getAppendPlayerCard = state => state.locations.appendPlayerCard;
export const getPlayersLocation = state => state.locations.playersLocation;


export default locationsSlice.reducer;