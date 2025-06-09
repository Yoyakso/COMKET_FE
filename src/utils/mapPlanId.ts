import { PlanId } from '@/constants/planData';

export const mapServerPlanToClientPlan = (serverPlan: string): PlanId => {
  switch (serverPlan.toUpperCase()) {
    case 'BASIC':
      return 'basic';
    case 'STARTUP':
      return 'startup';
    case 'PRO':
    case 'PROFESSIONAL':
      return 'professional';
    case 'ENTERPRISE':
      return 'enterprise';
    default:
      return 'basic';
  }
};
