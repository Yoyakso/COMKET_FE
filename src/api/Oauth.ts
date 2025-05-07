import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI

/**
 * Google OAuth2 로그인 요청
 * @param code 구글 로그인 후 리디렉션된 code 값
 * @returns 백엔드에서 받은 응답 데이터
 */
export const googleLogin = async (code: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/auth/oauth2/google/login`, {
      params: {
        code,
        redirect_uri: REDIRECT_URI,
      }
    })
    return response.data
  } catch (error: any) {
    console.error("Google OAuth 로그인 실패:", error)
    throw error
  }
}
