import styled, { css } from "styled-components"
import { color } from "@/styles/color"
import type { ButtonStyle, ButtonSize } from "./Button"

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
     border-radius: 3px;
   `,
  md: css`
     width: 129px;
     height: 48px;
     padding: 8px 16px;
     font-size: 16px;
     border-radius: 4px;
   `,
  lg: css`
     width: 100%;
     height: 56px;
     padding: 12px 20px;
     font-size: 18px;
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

const ActiveStyle: Record<ButtonStyle, ReturnType<typeof css>> = {
  primaryFilled: css`
     background-color: ${color.primary};
     color: white;
     border: none;
     &:hover:not(:disabled) {
       background-color: ${color.primaryHover};
     }
   `,
  primaryOutlined: css`
     background-color: white;
     color: ${color.primary};
     border: 1px solid ${color.primary};
     &:hover:not(:disabled) {
       border: 1px solid ${color.primaryHover};
     }
   `,
  tealFilled: css`
     background-color: ${color.teal500};
     color: white;
     border: none;
     &:hover:not(:disabled) {
       background-color: ${color.teal400};
     }
   `,
  tealOutlined: css`
     background-color: white;
     color: ${color.teal500};
     border: 1px solid ${color.teal500};
     &:hover:not(:disabled) {
       border: 1px solid ${color.teal400};
     }
   `,
  blackFilled: css`
     background-color: ${color.basic1000};
     color: white;
     border: none;
     &:hover:not(:disabled) {
       background-color: ${color.basic800};
     }
   `,
  blackOutlined: css`
     background-color: white;
     color: ${color.basic1000};
     border: 1px solid ${color.basic1000};
   `,
  neutralFilled: css`
     background-color: ${color.basic100};
     color: ${color.textPrimary};
     border: none;
     &:hover:not(:disabled) {
       background-color: ${color.basic200};
     }
   `,
  neutralOutlined: css`
     background-color: white;
     color: ${color.textSecondary};
     border: 1px solid #CFD5E4;
     &:hover:not(:disabled) {
     color: ${color.textPrimary};
     }
   `,
  negativeFilled: css`
     background-color: ${color.error};
     color: white;
     border: none; 
     &:hover:not(:disabled) {
       background-color: #F27D7D;
     }
   `,
  negativeOutlined: css`
     background-color: white;
     color: ${color.error};
     border: 1px solid ${color.error};
   `,
}

const DisabledStyle = css`
   background-color: ${color.primaryDisabled};
   color: ${color.textTertiary};
   border: none;
 `

interface ButtonContainerProps {
  variant: ButtonStyle
  size: ButtonSize
  disabled?: boolean
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 500;
   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
   transition: all 0.2s ease;
   
   ${(props) => Size[props.size]}
   
   ${(props) => (props.disabled ? DisabledStyle : ActiveStyle[props.variant])}
 `

export const IconWrapper = styled.span`
   margin: 0 4px;
   display: inline-flex;
   align-items: center;
 `
