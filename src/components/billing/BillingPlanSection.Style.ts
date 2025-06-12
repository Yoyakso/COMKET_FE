import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 360px;
`;

export const Card = styled.article`
  background: ${color.white};
  border: 1px solid ${color.basic200};
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(16, 24, 40, 0.05);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Heading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${color.basic900};
`;

export const Sub = styled.p`
  margin-top: 2px;
  font-size: 12px;
  color: ${color.basic500};
`;

export const PlanRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${color.basic900};
`;

export const PlanBadge = styled.span`
  background: #ede9fe;
  color: #6b21a8;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  line-height: 1;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 12px;
`;

export const Price = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: ${color.basic900};
`;

export const PriceUnit = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: ${color.basic500};
`;

export const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid ${color.basic200};
`;

export const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: ${color.basic800};

  li {
    list-style: disc;
    margin-left: 18px;
  }
`;

export const InfoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  font-size: 14px;
  color: ${color.basic700};

  svg {
    color: ${color.basic500};
  }
`;

export const InfoLabel = styled.span`
  flex-shrink: 0;
  width: 96px;
  font-weight: 400;
  color: ${color.textPrimary};
`;

export const InfoValue = styled.span`
  font-weight: 600;
  color: ${color.basic900};
  padding-left: 90px;
`;

export const ExpectedPrice = styled.section`
  margin-top: 24px;
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${color.basic800};
  margin-bottom: 12px;
`;

export const ExpectedPriceContainer = styled.div`
  background: ${color.basic100};
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
`;

export const ExpectedPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const RowDivider = styled.hr`
  border: none;
  border-top: 1px dashed ${color.basic300};
  margin: 12px 0;
`;

export const Label = styled.span`
  color: ${color.basic600};
`;

export const Value = styled.span<{ strong?: boolean }>`
  font-weight: ${({ strong }) => (strong ? 800 : 500)};
  color: ${color.basic900};
`;

export const CardFooter = styled.footer`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
`;

export const UpgradeNotice = styled.p`
  font-size: 12px;
  color: ${color.error};
  text-align: center;
`;

export const BadgeRegistered = styled.span`
  background: ${color.teal500};
  color: white;
  font-weight: 500;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 999px;
  margin-left: 8px;
`;

// export const CardVisual = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   background: ${color.basic100};
//   padding: 12px 16px;
//   border-radius: 8px;
//   margin-top: 12px;
// `;

// export const CardIconWrapper = styled.div`
//   width: 40px;
//   height: 28px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const CardNumber = styled.span`
//   font-size: 16px;
//   font-weight: 600;
//   color: ${color.basic900};
// `;

export const DisabledButton = css`
  background: ${color.basic100} !important;
  color: ${color.basic400} !important;
  cursor: not-allowed;
`;
