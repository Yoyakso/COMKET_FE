import { Users, Rocket, Gem, Crown, LucideIcon } from 'lucide-react';

export type PlanId = 'basic' | 'startup' | 'professional' | 'enterprise';

export interface PlanData {
  name: string;
  userRange: string;
  maxUsers: number;
  price: string;
  priceValue: number | null;
  description: string;
  badge: string;
  nextPlan: PlanId | null;
  icon: LucideIcon;
  popular: boolean;
}

export const PLAN_DATA: Record<PlanId, PlanData> = {
  basic: {
    name: '개인',
    userRange: '1~5명',
    maxUsers: 5,
    price: '무료',
    priceValue: 0,
    description: '개인 사용자 및 소규모 팀',
    badge: '무료',
    nextPlan: 'startup',
    icon: Users,
    popular: false,
  },
  startup: {
    name: '스타트업',
    userRange: '6~20명',
    maxUsers: 20,
    price: '₩9,900',
    priceValue: 9900,
    description: '성장하는 팀을 위한 완전한 기능',
    nextPlan: 'professional',
    badge: '추천',
    icon: Rocket,
    popular: true,
  },
  professional: {
    name: '프로페셔널',
    userRange: '21~50명',
    maxUsers: 50,
    price: '₩8,500',
    priceValue: 8500,
    description: '중소기업을 위한 기능',
    badge: 'Pro',
    nextPlan: 'enterprise',
    icon: Gem,
    popular: false,
  },
  enterprise: {
    name: '엔터프라이즈',
    userRange: '50명 이상',
    maxUsers: Infinity,
    price: '₩7,500',
    priceValue: 7500,
    description: '기업을 위한 기능',
    badge: 'Enterprise',
    nextPlan: null,
    icon: Crown,
    popular: false,
  },
};
