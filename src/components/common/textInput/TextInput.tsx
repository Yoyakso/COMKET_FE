import { useState } from 'react';
import * as S from './TextInput.style';

import CloseIcon from '@/assets/icons/CloseIcon2.svg?react';
import EyeOffIcon from '@/assets/icons/EyeOffIcon.svg?react';
import EyeOnIcon from '@/assets/icons/EyeOnIcon.svg?react'; 
import ClearIcon from '@/assets/icons/ClearIcon.svg?react';
import PasswordDotIcon from '@/assets/icons/PasswordDotIcon.svg?react';

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  type?: 'default' | 'password';
  size?: 'sm' | 'md';
  state?:
    | 'enable'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'activated'
    | 'success'
    | 'error'
    | 'disabled'
    | 'registered';
  placeholder?: string;
  helperText?: string;
};

export const TextInput = ({
  value,
  onChange,
  onRemove,
  type ,
  size ,
  state ,
  placeholder='입력하시오',
  helperText,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const showSecureIcons = isPassword && value;

  const handleClear = () => onChange('');
  const handleRemove = () => onRemove?.();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <S.Container size={size} state={state}>
      <S.InputBox size={size} state={state} focused={focused}>
        <S.StyledInput
          type={isPassword && !showPassword ? 'text' : 'text'} // 모두 text로 처리
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={state === 'disabled'}
          state={state}
          style={
            isPassword && !showPassword
              ? {
                  color: 'transparent',
                  textShadow: '0 0 0 #0000',
                  caretColor: '#000',
                }
              : {}
          }
        />

        {isPassword && !showPassword && (
          <S.FakeInput size={size}>
            {[...value].map((_, i) => (
              <PasswordDotIcon key={i} />
            ))}
          </S.FakeInput>
        )}


        {showSecureIcons && (
          <>
            <S.Clear2Button
              type="button"
              onClick={handleClear}
              aria-label="입력 초기화"
              size={size}
            >
              <ClearIcon />
            </S.Clear2Button>
            <S.EyeButton type="button" size={size} onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
            </S.EyeButton>
          </>
        )}

        {!isPassword && value && state !== 'registered' && state !== 'activated' && (
          <S.ClearButton
            type="button"
            size={size}
            onClick={handleClear}
            aria-label="입력 초기화"
          >
            <CloseIcon />
          </S.ClearButton>
        )}

        {!isPassword && state !== 'registered' && state !== 'activated' && (
          <S.RemoveButton
            type="button"
            size={size}
            onClick={handleRemove}
            aria-label="입력창 제거"
          >
            <CloseIcon />
          </S.RemoveButton>
        )}
      </S.InputBox>

      {!!helperText && <S.HelperText state={state}>{helperText}</S.HelperText>}
    </S.Container>
  );
};
