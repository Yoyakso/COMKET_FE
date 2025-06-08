import styled, { css } from "styled-components"
import type { ButtonSize } from "./PrimaryButton"

const Size = {
  xs: css`
     width: 91px;
     height: 32px;
     padding: 4px 8px;
     font-size: 12px;
     border-radius: 2px;
   `,
  sm: css`
     width: 107px;
     height: 40px;
     padding: 6px 12px;
     font-size: 14px;
     border-radius: 5px;
   `,
  md: css`
     width: 129px;
     height: 48px;
     padding: 8px 16px;
     font-size: 16px;
     border-radius: 4px;
   `,
  lg: css`
     width: 150px;
     height: 56px;
     padding: 12px 20px;
     font-size: 16px;
     border-radius: 5px;
   `,
  xl: css`
     width: 163px;
     height: 64px;
     padding: 16px 24px;
     font-size: 20px;
     border-radius: 6px;
   `,
}

interface ButtonContainerProps {
  $size: ButtonSize
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 500;
   transition: all 0.2s ease;
   
   ${(props) => Size[props.$size]}
  background: linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
 `
