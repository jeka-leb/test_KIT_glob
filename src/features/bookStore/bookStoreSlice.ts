import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook } from '../../types';

export interface BooksStoreState {
  books: IBook[] | [];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState: BooksStoreState = {
  books: [],
  status: 'idle',
  error: '',
};

export const booksStoreSlice = createSlice({
  name: 'booksStore',
  initialState,
  reducers: {
    getBooksFetch: (state) => {
      state.status = 'loading';
    },
    getBooksSuccess: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
      state.status = 'idle';
    },
    getBooksFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { getBooksFetch, getBooksSuccess, getBooksFailure } =
  booksStoreSlice.actions;

export default booksStoreSlice.reducer;
