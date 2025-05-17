import styled from 'styled-components';
import { color } from '@styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 960px;
  background-color: ${color.white};
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-width: 960px;
  border-bottom: 1px solid ${color.basic200};
  padding: 20px 0px;
  gap: 20px;
`;

export const Label = styled.label`
  display: flex;
  width: 116px;
  height: 40px;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: ${color.textHeading};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.028px;
`;

export const PlainText = styled.div`
  display: flex;
  height: 40px;
  padding: 8px 0px;
  align-items: center;
  flex: 1 0 0;
  color: ${color.textPrimary};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.028px;
`;

export const DescriptionInput = styled.input`
  font-size: 14px;
  padding: 12px;
  border: 1px solid ${color.basic200};
  border-radius: 4px;
  color: ${color.textPrimary};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${color.primary};
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

export const PhotoGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 0px;
  min-width: 960px;
  border-bottom: 1px solid ${color.basic200};
`;

export const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

export const Photo = styled.div`
  background-color: ${color.basic100};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const ImagePlaceholder = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 4px;
  background-color: ${color.basic100};

  svg {
    width: 60px;
    height: 60px;
  }
`;

export const PhotoUploader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DeleteWrapper = styled.div`
  width: 824px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteText = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  color: ${color.textTertiary};
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 960px;
  margin-top: 48px;
`;
export const SubButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
