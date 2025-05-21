import { create } from 'zustand';

export type UserStatus = '온라인' | '자리 비움' | '다른 용무 중' | '오프라인';

interface State {
  statusMap: Record<string, UserStatus>;
  setUserStatus: (email: string, status: UserStatus) => void;
}

export const useUserStatusStore = create<State>(set => ({
  statusMap: {},
  setUserStatus: (email, status) =>
    set(state => ({
      statusMap: { ...state.statusMap, [email]: status },
    })),
}));
