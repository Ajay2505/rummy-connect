import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players: [],
    maxPlayers: 5  
}

// {
//     playerName: "Ajay",
//     userName: 1,
//     isOffline: false,
//     isLost: false,         
// },
// {
//     playerName: "Guest",
//     userName: 2,
//     isOffline: false,
//     isLost: false,            
// },
// {
//     playerName: "Guest 2",
//     userName: 3,
//     isOffline: false,
//     isLost: false,
// },
// {
//     playerName: "Guest 3",
//     userName: 4,
//     isOffline: false,
//     isLost: false,            
// },
// {
//     playerName: "Guest 4",
//     userName: 5,
//     isOffline: false,
//     isLost: false,
// },

const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload.players;
        },
        resetPlayers: () => {
            return initialState;
        }
    }
});

// Dispatchers (Setters)
export const { setPlayers, resetPlayers } = playersSlice.actions;

// Selectors (Getters)
export const getPlayers = state => state.players.players;

export default playersSlice.reducer;
