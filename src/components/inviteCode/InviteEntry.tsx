import { Navigate, useParams } from 'react-router-dom';

export const InviteEntry = () => {
  const { code } = useParams<'code'>();
  if (!code) return <Navigate to="/" replace />;

  const token = localStorage.getItem('accessToken');
  const next = `/workspaces/invite?code=${code}`;

  return <Navigate to={token ? next : `/login?inviteCode=${code}`} replace />;
};
