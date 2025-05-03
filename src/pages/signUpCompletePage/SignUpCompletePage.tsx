import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { SignUpComplete } from "@/components/login/SignUpComplete";
import { Footer } from "@/components/common/footer/Footer";
import * as S from "./SignUpCompletePage.Style";

export const SignUpCompletePage = () => {
  return (
    <div>
      <GlobalNavBar />
      <S.PageContainer>
        <SignUpComplete />
      </S.PageContainer>
      <Footer type="default" />
    </div>
  );
};
