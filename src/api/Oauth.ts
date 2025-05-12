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
    localStorage.clear();

    const response = await axios.get(`${BASE_URL}/api/v1/auth/oauth2/google/login`, {
      params: {
        code,
        redirect: REDIRECT_URI,
      }
    })
    return response.data
  } catch (error: any) {
    console.error("Google OAuth 로그인 실패:", error)
    throw error
  }
}

/**
 * 직접 로그인
 * @param param
 * @returns 
 */
export const logIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
      email,
      password,
    })

    const { accessToken } = response.data
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken)
    }

    return response.data
  } catch (error) {
    console.error("로그인 실패:", error)
    throw error
  }
}

/**
 * 이메일로 회원가입하기
 * @param email 사용자가 입력한 이메일
 * @param password 사용자가 입력한 비밀번호
 * @param nickname 닉네임
 * @param real_name 본명
 * @returns 
 */
export const registerUser = async ({
  email,
  password,
  real_name,
}: {
  email: string;
  password: string;
  real_name: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/members/register`, {
      email,
      password,
      real_name,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

/**
 * 검증코드 전송
 * @param email 
 * @returns 
 */
export const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/email/verify/send`, { email });
    return response.data;
  } catch (error) {
    console.error("이메일 인증번호 발송 실패:", error);
    throw error;
  }
};

/**
 * 코드 검증 요청
 * @param email
 * @param code
 * @returns 
 */
export const checkVerificationCode = async (email: string, code: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/email/verify/code`, { email, code });
    return response.data;
  } catch (error) {
    console.error("이메일 인증번호 검증 실패", error);
    throw error;
  }
}

/**
 * 로그아웃
 * @returns 
 */
export const logOut = async () => {
  try {
    const token = localStorage.getItem("accessToken")
    if (!token) throw new Error("로그인 토큰이 없습니다.")

    const response = await axios.post(`${BASE_URL}/api/v1/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
}
