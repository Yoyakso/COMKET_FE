import styled, { css } from "styled-components"
import type { BadgeVariant, BadgeSize, BadgeShape, BadgeStyleType } from "./Badge"
import { color } from "@/styles/color"

const ShapeAndSize: Record<BadgeShape, Record<BadgeSize, ReturnType<typeof css>>> = {
  sqaure: {
    md: css`
       padding: 2px 6px;
       font-size: 10px;
       width: 42px;
       height: 20px;
       border-radius: 2px;
     `,
    lg: css`
       padding: 4px 8px;
       font-size: 12px;
       width: 67px;
       height: 24px;
       border-radius: 3px;
     `,
  },
  rounded: {
    md: css`
       padding: 2px 8px;
       font-size: 10px;
       width: 46px;
       height: 20px;
       border-radius: 100px;
     `,
    lg: css`
       padding: 4px 8px;
       font-size: 12px;
       width: 75px;
       height: 24px;
       border-radius: 100px;
     `,
  },
}

export const variantStyles: Record<BadgeVariant, Record<BadgeStyleType, ReturnType<typeof css>>> = {
  primary: {
    filled: css`
       background-color: ${color.primary};
       color: white;
     `,
    outlined: css``
  },
  teal: {
    filled: css`
       background-color: ${color.teal500};
       color: white;
     `,
    outlined: css``,
  },
  black: {
    filled: css`
       background-color: ${color.basic1000};
       color: white;
     `,
    outlined: css`
       background-color: white;
       color: ${color.textPrimary};
       border: 1px solid ${color.basic1000};
     `,
  },
  neutral: {
    filled: css`
       background-color: ${color.neutral};
       color: ${color.textPrimary};
     `,
    outlined: css`
       background-color: white;
       color: ${color.textPrimary};
       border: 1px solid #E7EAF1;
     `,
  },
  negative: {
    filled: css`
       background-color: ${color.error};
       color: white;
     `,
    outlined: css``,
  },
  warning: {
    filled: css`
       background-color: ${color.warning};
       color: white;
     `,
    outlined: css``,
  },
  success: {
    filled: css`
       background-color: ${color.success};
       color: white;
     `,
    outlined: css``,
  },
}

export const BadgeContainer = styled.span<{
  variant: BadgeVariant
  styleType: BadgeStyleType
  size: BadgeSize
  shape: BadgeShape
}>`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 4px;
   font-weight: 500;
   white-space: nowrap;
 
   ${(props) => variantStyles[props.variant][props.styleType]}
   ${(props) => ShapeAndSize[props.shape][props.size]}
 `

export const IconWrapper = styled.span`
   display: inline-flex;
   align-items: center;
   justify-content: center;
 `
