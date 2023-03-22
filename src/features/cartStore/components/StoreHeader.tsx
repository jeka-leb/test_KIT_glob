import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const StyledHeader = styled.header`
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #220d02;
  text-decoration: none;
  margin: 1rem;
  font-size: 1rem;
`;

export const ShopHeader: React.FC = () => {
  const { total, quantity } = useAppSelector((state) => state.cart);

  return (
    <StyledHeader>
      <StyledLink to="/">Homepage</StyledLink>
      <StyledLink to="/cart">
        {`${quantity} ${quantity > 1 ? 'items' : 'item'} (${total})`}
      </StyledLink>
    </StyledHeader>
  );
};
