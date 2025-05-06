import styled from 'styled-components'
import { color } from '@styles/color'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 720px;
  padding: 40px 32px 32px 32px;
  flex-direction: column;
  gap: 40px;
  border-radius: 8px;
  border: 0.2px solid ${color.textPlaceholder24};
  background: ${color.white};
  box-shadow: 0px 4px 8px 0px rgba(219, 221, 233, 0.5);
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  align-items: center;
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 116px;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
`

export const InviteCodeGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const InviteCodeWrapper = styled.div`
  width: 520px;
  display: flex;
  flex-direction: row;
align-items: flex-start;
  gap: 4px;
`

export const IconWrapper = styled.div`
    width:48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DropdownGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const DropdownWrapper = styled.div`
  width: 520px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`
