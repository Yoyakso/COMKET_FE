import React, { useCallback, useState } from "react";
import * as S from "./CheckBox.style";
import CheckIcon from "@/assets/icons/CheckIcon.svg?react";
import MinusIcon from "@/assets/icons/MinusIcon.svg?react";

export type CheckBoxVariant = "primary" | "indigo" | "black" | "error" | "disabled";
export type CheckBoxVisualState = "unchecked" | "checked" | "indeterminate";
export type CheckBoxInteractionState = "default" | "hp";
export type CheckBoxSize = "sm" | "md" | "lg";

interface CheckBoxProps {
  label?: string;
  variant?: CheckBoxVariant;
  visualState?: CheckBoxVisualState;
  interactionState?: CheckBoxInteractionState;
  size?: CheckBoxSize;
  onChange?: () => void;
  className?: string;
}

export const CheckBox = ({
  label,
  variant = "primary",
  visualState: controlledVisualState,
  interactionState: controlledInteractionState,
  size = "md",
  onChange,
  className,
}: CheckBoxProps) => {
  const isControlled =
    controlledVisualState !== undefined && controlledInteractionState !== undefined;

  const [internalVisual, setInternalVisual] = useState<CheckBoxVisualState>("unchecked");

  const visualState = isControlled ? controlledVisualState : internalVisual;
  const interactionState = isControlled ? controlledInteractionState : "default";

  const isDisabled = variant === "disabled";

  const toggleVisual = () =>
    setInternalVisual((prev) =>
      prev === "unchecked" ? "checked" :
      prev === "checked" ? "indeterminate" :
      "unchecked"
    );

  const handleClick = useCallback(() => {
    if (!isControlled && !isDisabled) toggleVisual();
    if (!isDisabled) onChange?.();
  }, [isControlled, isDisabled, onChange]);

  const icon =
    visualState === "checked" ? <CheckIcon /> :
    visualState === "indeterminate" ? <MinusIcon /> :
    null;

  return (
    <S.Container size={size} className={className}>
      <S.Box
        size={size}
        variant={variant}
        $visualState={visualState}
        $interactionState={interactionState}
        onClick={handleClick}
      >
        {icon}
      </S.Box>
      {label && (
        <S.Label size={size} variant={variant}>
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};
