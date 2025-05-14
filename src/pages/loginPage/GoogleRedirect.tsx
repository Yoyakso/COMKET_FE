import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { googleLogin } from "@/api/Oauth"
import * as S from "./GoogleRedirect.Style"
import { useUserStore } from "@/stores/userStore";
import { toast } from "react-toastify";

export const GoogleRedirect = () => {
  const navigate = useNavigate()
  const code = new URL(window.location.href).searchParams.get("code")
  const { setUserState } = useUserStore();

  useEffect(() => {
    if (!code) return

    const fetchData = async () => {
      try {
        const result = await googleLogin(code)

        if (result.accessToken && result.name) {
          // 이미 가입된 유저
          localStorage.setItem("accessToken", result.accessToken)
          setUserState({
            email: result.email,
            name: result.name,
            memberId: result.memberId,
            loginPlatformInfo: result.loginPlatformInfo
          });
          navigate("/workspace")
        } else if (result.email) {
          // 신규 유저
          toast.info("회원가입이 필요한 사용자입니다.")
          navigate("/signup", { state: { email: result.email } })
        }

      } catch (err: any) {
        if (err.response) {
          const errorCode = err.response.data?.code
          const errorMessage = err.response.data?.message

          switch (errorCode) {
            case "OAUTH2_COMMUNICATION_ERROR":
              alert("구글 서버와 통신 중 오류가 발생했습니다")
              navigate("/login")
              break
            case "OAUTH2_TOKEN_ERROR":
              alert("구글 토큰 발급에 실패했습니다.")
              navigate("/login")
              break
            case "OAUTH2_TOKEN_REQUEST_FAILED":
              alert("구글 토큰 요청에 실패했습니다.")
              navigate("/login")
              break
            case "OAUTH2_USERINFO_REQUEST_FAILED":
              alert("구글 유저 정보 요청에 실패했습니다.")
              navigate("/login")
              break
            case "OAUTH2_SIGNUP_REQUIRED":
              alert("회원가입이 필요한 사용자입니다.")
              navigate("/signup")
              break
            default:
              alert(`알 수 없는 오류가 발생했습니다: ${errorMessage}`)
              navigate("/login")
              break
          }
        } else {
          navigate("/login")
        }
      }
    }

    fetchData()
  }, [code, navigate])

  return (
    <S.LoaderContainer>
      <S.Spinner />
      <S.Text>구글 계정으로 로그인 중입니다...</S.Text>
    </S.LoaderContainer>
  )
}
