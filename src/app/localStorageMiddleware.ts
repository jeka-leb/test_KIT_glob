import { Middleware } from '@reduxjs/toolkit';
import { ICartItem } from 'types';

// So basically there are a few ways to work with localstorage and RTK.
// The special middleware was used for that purpose. There is some third party libraries like Redux-persist as well.
// Also using localstorage directly from the slice (reducer) might be possible theoretically. But it is not good idea
// to afect side effects from reducer

export const localStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (action.type === 'cart/addBook') {
      const localData = JSON.parse(
        localStorage.getItem('cartStorage') || '[]',
      ) as ICartItem[];

      const index = localData.findIndex(
        (item) => item.id === action.payload.id,
      );
      const localDataModified =
        index === -1
          ? [
              ...localData,
              {
                ...action.payload,
                cartCount: 1,
                cartPrice: action.payload.price,
              },
            ]
          : [
              ...localData.slice(0, index),
              {
                ...localData[index],
                cartCount: localData[index].cartCount + 1,
                cartPrice:
                  action.payload.price * (localData[index].cartCount + 1),
              },
              ...localData.slice(index + 1),
            ];
      localStorage.setItem('cartStorage', JSON.stringify(localDataModified));
    }
    if (action.type === 'cart/deleteBook') {
      const localData = JSON.parse(
        localStorage.getItem('cartStorage') || '[]',
      ) as ICartItem[];
      if (localData.length) {
        const storageFiltered = localData.filter(
          (el) => el.id !== action.payload,
        );
        localStorage.setItem(
          'cartStorage',
          JSON.stringify([...storageFiltered]),
        );
      }
    }
    if (action.type === 'cart/removeBook') {
      const localData = JSON.parse(
        localStorage.getItem('cartStorage') || '[]',
      ) as ICartItem[];
      if (localData.length) {
        const bookChartToChangeIndex = localData.findIndex(
          (book) => book.id === action.payload,
        );
        const localDataModified =
          localData[bookChartToChangeIndex].cartCount > 1
            ? [
                ...localData.slice(0, bookChartToChangeIndex),
                {
                  ...localData[bookChartToChangeIndex],
                  cartCount: localData[bookChartToChangeIndex].cartCount - 1,
                  cartPrice:
                    localData[bookChartToChangeIndex].cartPrice -
                    localData[bookChartToChangeIndex].price,
                },
                ...localData.slice(bookChartToChangeIndex + 1),
              ]
            : [
                ...localData.slice(0, bookChartToChangeIndex),
                ...localData.slice(bookChartToChangeIndex + 1),
              ];
        localStorage.setItem('cartStorage', JSON.stringify(localDataModified));
      }
    }
    if (action.type === 'cart/deleteAllBooks') {
      localStorage.removeItem('cartStorage');
    }

    return next(action);
  };
