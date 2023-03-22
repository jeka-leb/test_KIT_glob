import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'app/hooks';

import { getBooksFetch } from 'features/bookStore/bookStoreSlice';
import { HomePage } from 'pages/HomePage';
import { CartPage } from 'pages/CartPage';
import { ShopHeader } from 'features/cartStore/components/StoreHeader';

import styled from 'styled-components';

const AppWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: #d7d7d7;
`;

function App() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getBooksFetch());
  }, [dispatch]);

  return (
    <AppWrapper>
      <ShopHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
