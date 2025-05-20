import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  // 전역으로 관리할 값들
  workspaceName: string;
  workspaceSlug: string;
  workspaceId: number | null;
  profileFileUrl: string;

  // 유저가 속한 워크스페이스 목록
  myWorkspaces: {
    id: number;
    name: string;
    slug: string;
    profileFileUrl: string;
  }[];

  // 값을 설정(업데이트)하는 함수
  setWorkspaceStore: (args: {
    workspaceName: string;
    workspaceSlug: string;
    workspaceId: number;
    profileFileUrl: string;
  }) => void;

  setMyWorkspaces: (list: WorkspaceState['myWorkspaces']) => void;

  // 로그아웃 또는 워크스페이스 삭제 시 초기화하는 함수
  clearWorkspace: () => void;

  // 새로운 이미지 url을 상태에 저장하는 함수
  setProfileFileUrl: (url: string) => void;

  //워크스페이스 slug를 상태에 저장하는 함수
  setWorkspaceSlug: (slug: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    set => ({
      // 초기값
      workspaceName: '',
      workspaceSlug: '',
      workspaceId: null,
      profileFileUrl: '',
      myWorkspaces: [],

      // 전체 상태를 한 번에 설정할 수 있는 함수
      setWorkspaceStore: ({ workspaceName, workspaceSlug, workspaceId, profileFileUrl }) =>
        set({
          workspaceName,
          workspaceSlug,
          workspaceId,
          profileFileUrl,
        }),

      // 워크스페이스 목록을 설정하는 함수
      setMyWorkspaces: list =>
        set({
          myWorkspaces: list,
        }),

      // 전체 상태를 초기화하는 함수
      clearWorkspace: () =>
        set({
          workspaceName: '',
          workspaceSlug: '',
          workspaceId: null,
          profileFileUrl: '',
          myWorkspaces: [],
        }),

      // 이미지 URL만 개별적으로 업데이트할 수 있는 함수
      setProfileFileUrl: (url: string) =>
        set({
          profileFileUrl: url,
        }),

      // 워크스페이스 slug만 개별적으로 업데이트할 수 있는 함수
      setWorkspaceSlug: (slug: string) =>
        set({
          workspaceSlug: slug,
        }),
    }),
    {
      name: 'workspace-storage',
      partialize: state => ({
        workspaceName: state.workspaceName,
        workspaceSlug: state.workspaceSlug,
        workspaceId: state.workspaceId,
        profileFileUrl: state.profileFileUrl,
      }),
    },
  ),
);
