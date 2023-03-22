import { useAppDispatch } from 'app/hooks';
import { addBook } from 'features/cartStore/cartSlice';
import { IBook } from 'types';
import styled from 'styled-components';

import { Button } from './common/Button';

interface BooksListItemProps {
  book: IBook;
}

const ListItemContainer = styled.div`
  display: flex;
  margin: 15px 0;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 120px;
  margin-right: 30px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: flex-start;
`;

export const BooksListItem: React.FC<BooksListItemProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const { title, author, price, coverImage } = book;

  return (
    <ListItemContainer>
      <ImageContainer>
        <img src={coverImage} alt="cover" style={{ maxWidth: '100%' }} />
      </ImageContainer>
      <BookDetails>
        <span>{title}</span>
        <div>{author}</div>
        <div>${price}</div>
        <Button onClick={() => dispatch(addBook(book))} backgroundColor="green">
          Add to cart
        </Button>
      </BookDetails>
    </ListItemContainer>
  );
};
