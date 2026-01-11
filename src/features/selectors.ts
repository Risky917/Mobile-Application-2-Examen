import { RootState } from "./../store/store";

// Cart selectors
export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// Favorites selectors
export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectTotalFavorites = (state: RootState) => state.favorites.items.length;

export const selectIsFavorite = (state: RootState, productId: number) =>
  state.favorites.items.some(item => item.id === productId);
