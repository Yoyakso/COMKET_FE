import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/loginPage/LoginPage';
import { WorkspacePage } from './pages/workspacePage/WorkspacePage';
import { CreateWorkspacePage } from './pages/workspaceCreatePage/workspaceCreatePage';
import { FindPasswordPage } from './pages/findPasswordPage/FindPasswordPage';
import { FindPasswordCompletePage } from './pages/findPasswordCompletePage/FindPasswordCompletePage';
import { ResetPasswordPage } from './pages/resetPasswordPage/ResetPasswordPage';
import { ResetPasswordCompletePage } from './pages/resetPasswordCompletePage/ResetPasswordCompletePage';
import { SignUpPage } from './pages/signUpPage/SignUpPage';
import { SignUpCompletePage } from './pages/signUpCompletePage/SignUpCompletePage';
import { MemberPage } from './pages/memberPage/MemberPage';
import { GoogleRedirect } from './pages/loginPage/GoogleRedirect';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { WorkspaceManageLayout } from '@/components/layout/WorkspaceManageLayout';
import { WorkspaceInfoPage } from './pages/workspaceManagePage/WorkspaceInfoPage';
import { InviteCodePage } from './pages/InviteCodePage/InviteCodePage';
import { InviteEntry } from './components/inviteCode/InviteEntry';
import { ProjectPage } from './pages/projectPage/ProjectPage';
import { AccountInfoPage } from './pages/accountInfoPage/AccountInfoPage';
import { ProfilePage } from './pages/profilePage/profilePage';
import { MyTicketPage } from './pages/myTicketPage/MyTicketPage';
import { TicketDashboardPage } from './pages/ticketDashboardPage/TicketDashboardPage';
import { ThreadPageWrapper } from './pages/threadPage/TreadPageWrapper';
import { MainPage } from './pages/mainPage/MainPage';
import { PlanPage } from './pages/planPage/PlanPage';
import { NotFoundPage } from './pages/notFoundPage/NotFoundPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/main" replace />,
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
        path: 'findPassword',
        element: <FindPasswordPage />,
      },
      {
        path: 'findPassword/complete',
        element: <FindPasswordCompletePage />,
      },
      {
        path: 'resetPassword',
        element: <ResetPasswordPage />,
      },
      {
        path: 'resetPassword/complete',
        element: <ResetPasswordCompletePage />,
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
        path: ':workspaceSlug/member',
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
        path: 'workspaces/invite',
        element: (
          <WorkspaceLayout>
            <InviteCodePage />
          </WorkspaceLayout>
        ),
      },
      { path: 'invite/:code', element: <InviteEntry /> },
      {
        path: 'workspace/create',
        element: (
          <WorkspaceLayout>
            <CreateWorkspacePage />
          </WorkspaceLayout>
        ),
      },
      {
        path: ':workspaceSlug/settings',
        element: <WorkspaceManageLayout />,
        children: [
          {
            index: true,
            element: <WorkspaceInfoPage />,
          },
        ],
      },
      {
        path: ':workspaceSlug/project',
        element: <ProjectPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'account',
        element: <AccountInfoPage />,
      },
      {
        path: ':workspaceSlug/mytickets',
        element: <MyTicketPage />,
      },
      {
        path: '/:projectId/tickets',
        element: <TicketDashboardPage />,
      },
      {
        path: '/:projectId/tickets/:ticketId/thread',
        element: <ThreadPageWrapper />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'plan',
        element: <PlanPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  },
]);
