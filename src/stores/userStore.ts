import { create } from "zustand"
import { persist } from "zustand/middleware"

// 유저 상태를 전역으로 관리할 타입 정의
interface UserState {
  // 전역으로 관리할 값들
  email: string
  name: string
  memberId: number
  loginPlatformInfo: string

  // 유저 상태 값을 설정(업데이트)하는 함수
  setUserState: (args: {
    email: string
    name: string
    memberId: number
    loginPlatformInfo: string
  }) => void

  // 유저 상태를 초기화하는 함수
  clearUser: () => void
}

// 전역 상태 생성
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // 초기값
      email: "",
      name: "",
      memberId: 0,
      loginPlatformInfo: "",

      // 유저 상태를 업데이트하는 함수
      setUserState: ({ email, name, memberId, loginPlatformInfo }) =>
        set({
          email,
          name,
          memberId,
          loginPlatformInfo,
        }),

      // 유저 상태를 초기화하는 함수
      clearUser: () =>
        set({
          email: "",
          name: "",
          memberId: 0,
          loginPlatformInfo: "",
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        email: state.email,
        name: state.name,
        memberId: state.memberId,
        loginPlatformInfo: state.loginPlatformInfo,
      }),
    }
  )
)
