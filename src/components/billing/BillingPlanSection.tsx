import { Badge } from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';

export const BillingPlanSection = () => {
  return (
    <S.Container>
      <S.Card>
        <S.CardHeader>
          <S.HeaderTop>
            <S.TitleWrapper>
              <S.PlanIcon />
              <S.CardTitle>현재 요금제</S.CardTitle>
            </S.TitleWrapper>
            <Badge $variant="black" $styleType="filled" size="md" shape="sqaure">
              Pro
            </Badge>
          </S.HeaderTop>
          <S.CardDescription>현재 사용 중인 요금제 상세 정보</S.CardDescription>
        </S.CardHeader>

        <S.CardContent>
          <S.PriceSection>
            <S.PriceRow>
              <S.PriceLabel>월 기본 요금</S.PriceLabel>
              <S.PriceValue>₩200,000</S.PriceValue>
            </S.PriceRow>
            <S.PriceRow>
              <S.PriceLabel>추가 사용자 (8명)</S.PriceLabel>
              <S.PriceValue>₩80,000</S.PriceValue>
            </S.PriceRow>
            <S.Separator />
            <S.TotalRow>
              <span>총 월 요금</span>
              <span>₩280,000</span>
            </S.TotalRow>
          </S.PriceSection>

          <S.FeatureList>
            <S.FeatureTitle>포함된 기능</S.FeatureTitle>
            <ul>
              <S.FeatureItem>무제한 프로젝트</S.FeatureItem>
              <S.FeatureItem>고급 분석 도구</S.FeatureItem>
              <S.FeatureItem>우선 고객 지원</S.FeatureItem>
              <S.FeatureItem>API 액세스</S.FeatureItem>
              <S.FeatureItem>팀 협업 도구</S.FeatureItem>
            </ul>
          </S.FeatureList>
        </S.CardContent>

        <S.CardFooter>
          <Button $variant="blackFilled" size="lg" withIcon={false}>
            요금제 업그레이드하기
          </Button>
        </S.CardFooter>
      </S.Card>
    </S.Container>
  );
};
