import styled, { keyframes } from 'styled-components';
import { color } from '@styles/color';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 480px;
  background-color: ${color.white};
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${color.textHeading};
`;

export const ImageCropRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${color.textPlaceholder16};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  .reactEasyCrop_CropArea {
    border-radius: 8px;
  }

  > div {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Placeholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${color.textPlaceholder16};
  border-radius: 8px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const PreviewGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const PreviewLabel = styled.span`
  width: 89px;
  height: 48px;
  font-size: 14px;
  color: ${color.textPrimary};
`;

export const PreviewWrapper = styled.div`
  background-color: ${color.basic100};
  border-radius:4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

`;

export const PreviewPlaceholder = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 4px;
  background-color: ${color.basic100};

   svg{
    width: 60px;
    height: 60px;
    }
`;


export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;