import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/loginPage/LoginPage';
import { WorkspacePage } from './pages/workspacePage/WorkspacePage';
import { CreateWorkspacePage } from './pages/workspaceCreatePage/workspaceCreatePage';
import { SignUpPage } from './pages/signUpPage/SignUpPage';
import { SignUpCompletePage } from './pages/signUpCompletePage/SignUpCompletePage';
import { MemberPage } from './pages/memberPage/MemberPage';
import { GoogleRedirect } from './pages/loginPage/GoogleRedirect';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { WorkspaceManageLayout } from '@/components/layout/WorkspaceManageLayout';
import { WorkspaceInfoPage } from './pages/workspaceManagePage/WorkspaceInfoPage';
import { InviteCodePage } from './pages/InviteCodePage/InviteCodePage';
import { ProjectPage } from './pages/projectPage/ProjectPage';


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
      },

      {
        path: 'workspace',
        element: (
          <WorkspaceLayout>
            <WorkspacePage />
          </WorkspaceLayout>
        ),
      },
      {
        path: 'workspace/invitecode',
        element: (
          <WorkspaceLayout>
            <InviteCodePage />
          </WorkspaceLayout>),
      },
      {
        path: 'workspace/create',
        element: (
          <WorkspaceLayout>
            <CreateWorkspacePage />
          </WorkspaceLayout>
        ),
      },
      {
        path: 'workspace/manage',
        element: <WorkspaceManageLayout />,
        children: [
          {
            path: 'info',
            element: <WorkspaceInfoPage />,
          },
        ],
      },
      {
        path: 'project',
        element: <ProjectPage />,
      }
    ],
  },
]);
