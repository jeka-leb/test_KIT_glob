import { put, call, takeEvery } from 'redux-saga/effects';

import { IBook } from '../../../types';
import { getBooksSuccess, getBooksFailure } from '../bookStoreSlice';
import { fetchBooks } from '../bookStoreAPI';

function* workGetBooksFetch() {
  try {
    const books: IBook[] = yield call(fetchBooks);
    yield put(getBooksSuccess(books));
  } catch (error) {
    if (error instanceof Error) yield put(getBooksFailure(error.message));
  }
}

function* booksSaga() {
  yield takeEvery('booksStore/getBooksFetch', workGetBooksFetch);
}

export default booksSaga;
