import styled from 'styled-components';
import { color } from '@styles/color';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const GNBContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  padding-top: 72px;
`;

export const LNBContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 72px);
  z-index: 90;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: 32px 48px;
  box-sizing: border-box;
  height: calc(100vh - 72px);
  overflow: auto;
  background-color: ${color.white};
`;
export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
export const Description = styled.p`
  font-size: 12px;
  color: ${color.textPlaceholder};
  padding-top: 4px;
`;
export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${color.textPrimary};
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 824px;
`;

export const Divider = styled.div`
  border: 0.5px solid #e7eaf1;
  width: 100%;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 20px;
  padding: 8px;
`;

export const Label = styled.label`
  width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: ${color.textHeading};
  flex-shrink: 0;
  padding-top: 10px;
`;

export const InputContainer = styled.div`
  flex: 1;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 11px;
  border: 1px solid #e7eaf1;
  border-radius: 3px;
  font-size: 14px;
  background-color: ${color.white};

  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }

  &::placeholder {
    color: ${color.textSecondary};
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-size: 14px;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const ProfileImageContainer = styled.div`
  width: 120px;
  height: 120px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const DefaultProfileImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #81d4fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 500;
  color: white;
  border-radius: 4px;
`;

export const ImageUploadButton = styled.button`
  width: 120px;
  height: 32px;
  padding: 6.5px 8px;
  background-color: ${color.white};
  border: 1px solid #e7eaf1;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  color: ${color.textSecondary};

  &:hover {
    background-color: ${color.basic0};
  }
`;

export const FileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${color.white};
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 4px;
`;

export const FileName = styled.span`
  font-size: 14px;
  color: ${color.textPrimary};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.quaternary};

  &:hover {
    color: ${color.textSecondary};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 48px;
`;

export const CancelButton = styled.button`
  width: 107px;
  height: 40px;
  padding: 9px 12px;
  border: 1px solid #e7eaf1;
  border-radius: 3px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${color.basic0};
  }
`;

export const SaveButton = styled.button`
  width: 107px;
  height: 40px;
  padding: 9px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${color.teal500};
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${color.teal600};
  }
`;
