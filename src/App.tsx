import "../node_modules/@uiw/react-md-editor/markdown-editor.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThemeProvider } from 'styled-components';
import PWABadge from './PWABadge'
import { GlobalStyle } from './styles/globalStyle';
import { theme } from './styles/theme';
import { Outlet } from 'react-router-dom';
import { AppInitializer } from "./AppInitializer"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppInitializer />
        <Outlet />
        <ToastContainer position="top-right" autoClose={2000} />
      </ThemeProvider>
      <PWABadge />
    </QueryClientProvider>
  );
}
