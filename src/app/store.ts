import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import booksSaga from 'features/bookStore/booksSaga';
import booksStoreReducer from 'features/bookStore/bookStoreSlice';
import cartReducer from 'features/cartStore/cartSlice';

import { localStorageMiddleware } from './localStorageMiddleware';

const sagaMiddleware = createSagaMiddleware();

// Two reducers were implemented ti split different features.

export const store = configureStore({
  reducer: {
    booksStore: booksStoreReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(localStorageMiddleware)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(booksSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
