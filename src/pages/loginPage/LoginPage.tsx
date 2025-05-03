import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { LoginForm } from "@/components/login/LoginForm";
import { Footer } from "@/components/common/footer/Footer";
import * as S from "./LoginPage.Style";

export const LoginPage = () => {
  return (
    <div>
      <GlobalNavBar />
      <S.PageContainer>
        <LoginForm />
      </S.PageContainer>
      <Footer type="default" />
    </div>
  );
};
