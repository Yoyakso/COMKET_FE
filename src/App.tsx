import { ThemeProvider } from 'styled-components';
import PWABadge from './PWABadge.tsx'
import { GlobalStyle } from './styles/globalStyle';
import { color } from './styles/color';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={color}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
      <PWABadge />
    </>
  );
}
