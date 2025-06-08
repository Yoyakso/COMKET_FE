export type PlanId = 'basic' | 'startup' | 'professional' | 'enterprise';

export interface PlanData {
  name: string;
  range: string;
  maxUsers: number;
  price: string;
  priceValue: number | null;
  description: string;
  features: string[];
  limitations: string[];
  badge: string;
  nextPlan: PlanId | null;
}

export const PLAN_DATA: Record<PlanId, PlanData> = {
  basic: {
    name: '개인',
    range: '1~5명',
    maxUsers: 5,
    price: '무료',
    priceValue: 0,
    description: '개인 사용자 및 소규모 팀',
    features: [
      '티켓 생성',
      '의견 작성',
      'AI 요약 (제한적)',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: ['하위 티켓 생성 불가', '커스터마이징 불가'],
    badge: '무료',
    nextPlan: 'startup',
  },
  startup: {
    name: '스타트업',
    range: '6~20명',
    maxUsers: 20,
    price: '$9.99',
    priceValue: 9990,
    description: '스타트업 및 중소 규모 팀',
    features: [
      'AI 요약',
      '하위 티켓 생성',
      '사용자 맞춤 설정',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: ['커스터마이징 불가'],
    badge: '추천',
    nextPlan: 'professional',
  },
  professional: {
    name: '프로페셔널',
    range: '21~50명',
    maxUsers: 50,
    price: '$29.99',
    priceValue: 29990,
    description: '중소기업 및 팀 단위 업무',
    features: [
      'AI 고급 요약',
      '커스터마이징',
      '트리 기반 업무 관리',
      '하위 티켓 생성',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: [],
    badge: 'Pro',
    nextPlan: 'enterprise',
  },
  enterprise: {
    name: '엔터프라이즈',
    range: '50명 이상',
    maxUsers: Infinity,
    price: '맞춤형',
    priceValue: null,
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
    badge: 'Enterprise',
    nextPlan: null,
  },
};
