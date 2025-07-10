import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import './index.css';
import './styles/theme/dark.css';
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SkeletonTheme
      baseColor="#202020"
      highlightColor="#444"
    >
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>,
);
