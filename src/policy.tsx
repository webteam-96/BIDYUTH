import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { PolicyPage } from './PolicyPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PolicyPage id={document.body.dataset.policy ?? ''} />
  </StrictMode>,
);
