import { useAppSelector } from 'app/hooks';

import { BooksList } from './BooksList';

export const BooksListContainer: React.FC = () => {
  const { books, status, error } = useAppSelector((state) => state.booksStore);

  if (status === 'loading') {
    return <div>{'Spinner...'}</div>;
  }

  if (error) {
    return <div>{'ErrorIndicator...'}</div>;
  }

  return <BooksList books={books} />;
};
