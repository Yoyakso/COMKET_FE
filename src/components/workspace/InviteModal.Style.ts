import styled from 'styled-components';
import { color } from '@styles/color';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 720px;
  max-height: 95vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px 32px 32px 32px;
  gap: 40px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  width: 116px;
  flex-shrink: 0;
`;

export const ContentContainer = styled.div`
  flex: 1;
`;

export const InviteInputContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10.5px 15px;
  width: 100%;
  min-height: 96px;
`;

export const InviteList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const InviteTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 4px 8px 4px 4px;
  font-size: 14px;
  gap: 8px;
`;

export const InvitePrefix = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  padding: 2px;
  font-size: 16px;

  &:hover {
    color: #424242;
  }
`;

export const EmailInput = styled.input`
  flex: 1;
  min-width: 200px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px;

  &::placeholder {
    color: #9e9e9e;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${color.textPrimary}

  &:hover {
    background-color: ${color.basic100};
  }
`;

export const LinkGenerationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LinkGenerationText = styled.span`
  font-size: 14px;
  color: ${color.textPrimary};
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${color.teal500};
  }

  &:checked + span:before {
    transform: translateX(15px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: '';
    height: 15px;
    width: 15px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const CopyLinkButton = styled.button`
  width: 91px;
  height: 32px;
  background-color: ${color.basic100};
  border: none;
  border-radius: 3px;
  padding: 6.5px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${color.textPrimary}
  cursor: pointer;
  margin-left: auto;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background-color: #e0e0e0;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 40px;
`;

export const CancelButton = styled.button`
  padding: 11.5 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SendButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: ${color.teal500};
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${color.teal600};
  }
`;
