import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { SignUpForm } from "@/components/login/SignUpForm";
import { Footer } from "@/components/common/footer/Footer";
import * as S from "./SignUpPage.Style";

export const SignUpPage = () => {
  return (
    <S.Container>
      <GlobalNavBar />
      <S.PageContainer>
        <SignUpForm />
      </S.PageContainer>
      <Footer type="default" />
    </S.Container>
  );
};
