console.log("🔧 BACKEND_URL:", import.meta.env.VITE_BACKEND_URL)
console.log("🔧 REDIRECT_URI:", import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI)

import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { Router } from './Router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
