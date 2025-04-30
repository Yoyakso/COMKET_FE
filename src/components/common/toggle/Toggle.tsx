import { useState } from 'react';
import * as S from './Toggle.style';

type ToggleProps = {
  size?: 'sm' | 'md';
  color?: 'teal' | 'black';
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelLeft?: string;
  labelRight?: string;
};

export const Toggle = ({
  size = 'md',
  color = 'teal',
  disabled = false,
  checked = false,
  onChange,
  labelLeft,
  labelRight,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <S.ToggleContainer>
      {labelLeft && <S.ToggleLabel size={size}>{labelLeft}</S.ToggleLabel>}
      <S.ToggleWrapper
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        $size={size}
        $color={color}
        $checked={isChecked}
        $disabled={disabled}
        onClick={handleToggle}
      >
        <S.ToggleCircle $checked={isChecked} $size={size} />
      </S.ToggleWrapper>
      {labelRight && <S.ToggleLabel size={size}>{labelRight}</S.ToggleLabel>}
    </S.ToggleContainer>
  );
};
