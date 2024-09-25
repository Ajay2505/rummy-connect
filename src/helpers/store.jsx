import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
// import playersSlice from "./slices/playersSlice";
// import cardsSlice from "./slices/cardsSlice";
// import locationsSlice from "./slices/locationsSlice";
import matchActionSlice from './slices/matchActionSlice';
import playerCardsSlice from './slices/playerCardsSlice';

export const store = configureStore({
   reducer: {
      auth: authSlice,
      // locations: locationsSlice,
      matchAction: matchActionSlice,
      // players: playersSlice,
      playerCards: playerCardsSlice,
      // chatUpdates: 
   }
});