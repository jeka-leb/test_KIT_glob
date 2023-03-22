import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook, ICartItem } from 'types';

export interface CartStoreState {
  cartItems: ICartItem[];
  quantity: number;
  total: number;
}

const getSumValue = (items: ICartItem[], key: 'cartPrice' | 'cartCount') => {
  if (!items.length) return null;
  const value = items.reduce((acc, item) => {
    return acc + item[key];
  }, 0);

  return value;
};

const cartItems = JSON.parse(localStorage.getItem('cartStorage') ?? '[]');

const initialState: CartStoreState = {
  cartItems,
  quantity: getSumValue(cartItems, 'cartCount') ?? 0,
  total: getSumValue(cartItems, 'cartPrice') ?? 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index === -1) {
        state.cartItems.push({
          ...action.payload,
          cartCount: 1,
          cartPrice: action.payload.price,
        });
      }
      index > -1 &&
        (state.cartItems[index].cartCount =
          state.cartItems[index].cartCount + 1);
      index > -1 &&
        (state.cartItems[index].cartPrice =
          action.payload.price * state.cartItems[index].cartCount);
      state.quantity = state.quantity + 1;
      state.total = state.total + action.payload.price;
    },
    removeBook: (state, action: PayloadAction<number>) => {
      const bookDeleted = state.cartItems.find(
        (item) => item.id === action.payload,
      );
      const bookDeletedIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      if (bookDeleted) {
        if (bookDeleted.cartCount > 1) {
          state.cartItems[bookDeletedIndex].cartCount =
            state.cartItems[bookDeletedIndex].cartCount - 1;
          state.cartItems[bookDeletedIndex].cartPrice =
            bookDeleted.price * state.cartItems[bookDeletedIndex].cartCount;
        } else {
          state.cartItems.splice(bookDeletedIndex, 1);
        }
        state.quantity = state.quantity - 1;
        state.total = state.total - bookDeleted.price;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      const bookDeletedIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      state.quantity =
        state.quantity - state.cartItems[bookDeletedIndex].cartCount;
      state.total = state.total - state.cartItems[bookDeletedIndex].cartPrice;
      state.cartItems.splice(bookDeletedIndex, 1);
    },
    deleteAllBooks: (state) => {
      state.cartItems = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { removeBook, addBook, deleteBook, deleteAllBooks } =
  cartSlice.actions;

export default cartSlice.reducer;
