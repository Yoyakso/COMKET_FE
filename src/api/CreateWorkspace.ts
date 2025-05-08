import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface workspaceCreateParams {
  name: string;
  slug: string;
  description: string;
  is_public: boolean;
  profile_file_id?: string | null;
}

export const workspaceCreate = async ({
  name,
  slug,
  description,
  is_public,
  profile_file_id = null,
}: workspaceCreateParams) => {
  const token = localStorage.getItem('access_token');

  const response = await axios.post(
    `${BASE_URL}/api/v1/workspaces`,
    {
      name,
      slug,
      description,
      is_public,
      profile_file_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    }
  );

  return response.data;
};
