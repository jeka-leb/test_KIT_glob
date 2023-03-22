import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { store } from './app/store';
import App from './App';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding; 0;
    box-sizing: border-box;
    font-family: consolas;
    text-align: center
  }
`;

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Global />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
