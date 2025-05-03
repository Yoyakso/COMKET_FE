import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/loginPage/LoginPage';
import { WorkspacePage } from './pages/workspacePage/WorkspacePage';
import { CreateWorkspacePage } from './pages/workspacePage/create/CreateWorkspacePage';
import { SignUpPage } from './pages/signUpPage/SignUpPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'workspace',
        element: <WorkspacePage />,
      },
      {
        path: 'workspace/create',
        element: <CreateWorkspacePage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      }
    ],
  },
]);
