import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import Root from './routes/root';
import { CssVarsProvider } from '@mui/joy/styles';
import { extendTheme } from '@mui/joy/styles';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/joy';
import Pokemon from './routes/pokemon';

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: 'var(--main-background)',
        },
        focusVisible: 'var(--focus-visible)',
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "pokemon/:name",
    element: <Pokemon />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </QueryClientProvider>
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
