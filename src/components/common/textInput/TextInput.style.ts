import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div<{ size: string; state: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color.white};
  opacity: ${({ state }) => (state === 'disabled' ? 0.5 : 1)};
`;

export const InputBox = styled.div<{
  size: string;
  state: string;
  focused: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 4px;

  ${({ size }) =>
    size === 'sm'
      ? css`
          height: 40px;
          font-size: 14px;
          padding: 8px 11px;
        `
      : css`
          height: 48px;
          font-size: 16px;
          padding: 10px 15px;
        `};

  ${({ state, focused }) => css`
    border: 1px solid
      ${state === 'enable'
        ? color.textPlaceholder24
        : state === 'hover'
        ? color.basic1000
        : state === 'focus' || focused
        ? color.basic1000
        : state === 'typing'
        ? color.basic1000
        : state === 'activated'
        ? color.textPlaceholder24
        : state === 'success'
        ? color.success
        : state === 'error'
        ? color.error
        : state === 'disabled' || state === 'registered'
        ? 'none'
        : color.textPlaceholder24};

    background-color: ${state === 'disabled'
      ? color.textPlaceholder32
      : color.white};
  `}
`;

export const StyledInput = styled.input<{ $state: string }>`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  color: ${color.textPrimary};
  font-size: inherit;

  &::placeholder {
    color: ${({ $state }) =>
      $state === 'disabled'
        ? color.textTertiary
        : $state === 'registered'
        ? 'transparent'
        : color.textPlaceholder70};
  }
`;

export const FakeInput = styled.div<{ size: string }>`
  position: absolute;
  left: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  pointer-events: none;

  svg {
    width: ${({ size }) => (size === 'sm' ? '6px' : '8px')};
    height: ${({ size }) => (size === 'sm' ? '6px' : '8px')};
  }
`;

export const ClearButton = styled.button<{ size: string }>`
  position: absolute;
  right: ${({ size }) => (size === 'sm' ? '33px' : '38px')};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
    height: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
  }
`;

export const RemoveButton = styled.button<{ size: string }>`
  position: absolute;
  right: ${({ size }) => (size === 'sm' ? '11px' : '15px')};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
    height: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
  }
`;

export const EyeButton = styled.button<{ size: string }>`
  position: absolute;
  right: ${({ size }) => (size === 'sm' ? '11px' : '15px')};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
    height: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
  }
`;

export const Clear2Button = styled.button<{ size: string }>`
  position: absolute;
  right: ${({ size }) => (size === 'sm' ? '33px' : '38px')};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
    height: ${({ size }) => (size === 'sm' ? '16px' : '18px')};
  }
`;

export const HelperText = styled.span<{ $state: string }>`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ $state }) =>
  $state === 'error' ? color.error : color.textTertiary};
`;