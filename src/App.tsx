import { ThemeProvider } from 'styled-components';
import PWABadge from './PWABadge'
import { GlobalStyle } from './styles/globalStyle';
import { theme } from './styles/theme';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
      <PWABadge />
    </>
  );
}
