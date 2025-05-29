export const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user-storage');
  localStorage.removeItem('workspace-storage');
};
