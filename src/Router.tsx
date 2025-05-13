import { createBrowserRouter, Navigate } from 'react-router-dom';
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
import { AccountInfoPage } from './pages/accountInfoPage/AccountInfoPage';
import { ProfilePage } from './pages/profilePage/profilePage';
import { TicketDashboardPage } from './pages/ticketDashboardPage/TicketDashboardPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
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
          </WorkspaceLayout>),
      },
      {
        path: 'invitecode',
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

        path: ':workspaceSlug',
        element: (
          <WorkspaceManageLayout>
            <WorkspaceInfoPage />
          </WorkspaceManageLayout>)
      },
      {
        path: 'project',
        element: <ProjectPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'account',
        element: <AccountInfoPage />
      },
      {
        path: "workspace/project/ticketdashboard",
        element: <TicketDashboardPage />,
      },
    ],
  },
]);
