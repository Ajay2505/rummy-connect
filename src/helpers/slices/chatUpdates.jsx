import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    updates: [],
}

export const chatUpdatesSlice = createSlice({
    name: "chatUpdates",
    initialState,
    reducers: {
        setChatUpdates: (state, action) => {
            
        },
        resetChatUpdates: () => {
            return initialState;
        }
    }
});

export default chatUpdatesSlice.reducer;

// Dispatchers (Setters)
export const { resetChatUpdates } = chatUpdatesSlice.actions;

// Selectors (Getters)
export const getUpdates = state => state.chatUpdates.updates;
export const getChats = state => state.chatUpdates.chats;