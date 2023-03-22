import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ICartItem } from 'types';
import styled from 'styled-components';

import {
  removeBook,
  addBook,
  deleteBook,
  deleteAllBooks,
} from 'features/cartStore/cartSlice';

import { Button } from 'features/bookStore/components/common/Button';

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 45px;
`;

const StyledTotalValue = styled.div`
  text-align: right;
  font-size: 1.3rem;
  margin-right: 10px;
`;

const StyledEmptyContainer = styled(StyledTableContainer)`
  justify-content: center;
  font-size: 24px;
`;

export const ShopCartTable: React.FC = () => {
  const { cartItems, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return <StyledEmptyContainer> Cart is empty!</StyledEmptyContainer>;
  }

  const renderRow = (item: ICartItem, idx: number) => {
    const { id, title, cartCount, cartPrice } = item;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{cartCount}</td>
        <td>${cartPrice}</td>
        <td>
          <Button
            onClick={() => dispatch(deleteBook(id))}
            margin="5px 10px"
            backgroundColor="orange"
          >
            Delete
          </Button>
          <Button
            onClick={() => dispatch(addBook(item))}
            margin="5px 10px"
            backgroundColor="green"
          >
            Increase
          </Button>
          <Button
            onClick={() => dispatch(removeBook(id))}
            margin="5px 10px"
            backgroundColor="yellow"
          >
            Decrease
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <StyledTableContainer>
      <h2>Your Order</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{cartItems.map(renderRow)}</tbody>
      </table>
      <Button
        onClick={() => dispatch(deleteAllBooks())}
        margin="10px 15px"
        backgroundColor="red"
      >
        Delete Cart
      </Button>

      <StyledTotalValue>Total: ${total}</StyledTotalValue>
    </StyledTableContainer>
  );
};
