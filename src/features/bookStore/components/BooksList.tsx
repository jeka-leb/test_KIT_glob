import { IBook } from 'types';
import styled from 'styled-components';

import { BooksListItem } from './BooksListItem';

interface BooksListProps {
  books: IBook[];
}

const StyledBookList = styled.ul`
  list-style: none;
`;

export const BooksList: React.FC<BooksListProps> = ({ books }) => {
  return (
    <StyledBookList>
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BooksListItem book={book} />
          </li>
        );
      })}
    </StyledBookList>
  );
};
