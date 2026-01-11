import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

type FavoritesState = {
  items: FavoriteItem[];
};

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        // Remove from favorites
        state.items.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;