import { IBook } from '../../types';

import { booksArray } from './constants/dataMock';

export function fetchBooks(): Promise<IBook[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) {
        reject(new Error('Something bad happened'));
      } else {
        resolve(booksArray);
      }
    }, 700);
  });
}
