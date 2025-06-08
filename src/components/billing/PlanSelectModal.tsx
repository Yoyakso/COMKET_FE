import * as S from '@/components/billing/PlanSelectModal.Style';
import { Button } from '@/components/common/button/Button';

interface PlanSelectModalProps {
  currentPlanId: string;
  onSelect: (planId: string) => void;
  onClose: () => void;
}

const PLAN_DATA = {
  personal: {
    name: '개인',
    userRange: '1~5명',
    price: '무료',
    description: '개인 사용자 및 소규모 팀',
    features: [
      '타켓 생성',
      '의견 작성',
      'AI 요약 (제한적)',
      '타켓 생성 및 관리',
      '타켓 내 커뮤니케이션',
    ],
    limitations: ['하위 타켓 생성 불가', '커스터마이징 불가'],
  },
  startup: {
    name: '스타트업',
    userRange: '6~20명',
    price: '$9.99',
    description: '스타트업 및 중소 규모 팀',
    features: [
      'AI 요약',
      '하위 타켓 생성',
      '사용자 맞춤 설정',
      '타켓 생성 및 관리',
      '타켓 내 커뮤니케이션',
    ],
    limitations: ['커스터마이징 불가'],
  },
  professional: {
    name: '프로페셔널',
    userRange: '21~50명',
    price: '$29.99',
    description: '중소기업 및 팀 단위 업무',
    features: [
      'AI 고급 요약',
      '커스터마이징',
      '트리 기반 업무 관리',
      '하위 타켓 생성',
      '타켓 생성 및 관리',
      '타켓 내 커뮤니케이션',
    ],
    limitations: [],
  },
  enterprise: {
    name: '엔터프라이즈',
    userRange: '50명 이상',
    price: '맞춤형',
    description: '대기업 및 대규모 팀',
    features: [
      '전체 기능 제공',
      '맞춤형 솔루션',
      '전담 지원팀',
      '고급 보안',
      'API 접근',
      '온프레미스 배포',
    ],
    limitations: [],
  },
};

export const PlanSelectModal = ({ currentPlanId, onSelect, onClose }: PlanSelectModalProps) => {
  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.TitleWrapper>
          <S.Title>요금제 선택</S.Title>
        </S.TitleWrapper>

        <S.PlanList>
          {Object.entries(PLAN_DATA).map(([planId, plan]) => {
            const isCurrent = planId === currentPlanId;
            return (
              <S.PlanCard key={planId} $selected={isCurrent}>
                {isCurrent && <S.Badge>현재 플랜</S.Badge>}

                <S.PlanHeader>
                  <S.PlanName>{plan.name}</S.PlanName>
                  <S.PlanInfo>
                    {plan.userRange} <br /> {plan.description}
                  </S.PlanInfo>
                  <S.PlanPrice>{plan.price}</S.PlanPrice>
                </S.PlanHeader>

                <S.Section>
                  <S.SectionTitle>주요 기능</S.SectionTitle>
                  <S.FeatureList>
                    {plan.features.map((feature, i) => (
                      <S.FeatureItem key={i}>
                        <S.CheckIcon>✓</S.CheckIcon>
                        {feature}
                      </S.FeatureItem>
                    ))}
                  </S.FeatureList>
                </S.Section>

                {plan.limitations.length > 0 && (
                  <S.Section>
                    <S.SectionTitle>제한사항</S.SectionTitle>
                    <S.FeatureList>
                      {plan.limitations.map((lim, i) => (
                        <S.FeatureItem key={i}>
                          <S.XIcon>✕</S.XIcon>
                          {lim}
                        </S.FeatureItem>
                      ))}
                    </S.FeatureList>
                  </S.Section>
                )}

                <Button
                  onClick={() => onSelect(planId)}
                  $variant={isCurrent ? 'neutralOutlined' : 'tealFilled'}
                  size="md"
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  {isCurrent ? '현재 선택됨' : '이 플랜 선택'}
                </Button>
              </S.PlanCard>
            );
          })}
        </S.PlanList>

        <S.ButtonRow>
          <Button onClick={onClose} $variant="neutralOutlined" size="md" style={{ flex: 1 }}>
            닫기
          </Button>
        </S.ButtonRow>
      </S.Modal>
    </>
  );
};
