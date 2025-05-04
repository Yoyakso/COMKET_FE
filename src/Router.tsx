import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/loginPage/LoginPage';
import { WorkspacePage } from './pages/workspacePage/WorkspacePage';
import { CreateWorkspacePage } from './pages/workspacePage/create/CreateWorkspacePage';
import { SignUpPage } from './pages/signUpPage/SignUpPage';
import { SignUpCompletePage } from './pages/signUpCompletePage/SignUpCompletePage';
import { MemberPage } from './pages/memberPage/MemberPage';
import { GoogleRedirect } from './pages/loginPage/GoogleRedirect';

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
        path: 'oauth/google',
        element: <GoogleRedirect />,
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
      },
      {
        path: 'signup/complete',
        element: <SignUpCompletePage />,
      },
      {
        path: 'member',
        element: <MemberPage />,
      }
    ],
  },
]);
