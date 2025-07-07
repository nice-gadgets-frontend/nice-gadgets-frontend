import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import './index.css';

<<<<<<< HEAD
import './styles/theme/dark.css'

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
=======
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>,
);
>>>>>>> 1d6ba22c081619666ad1a53ce96431749700ec8a
