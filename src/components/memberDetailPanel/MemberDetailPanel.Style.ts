import styled from 'styled-components';
import { color } from '@/styles/color';

export const Overlay = styled.div`
  z-index: 1000;
`;

export const PanelContainer = styled.div`
  position: fixed;
  top: 72px;
  right: 24px;
  width: 480px;
  height: calc(100vh - 96px);
  background-color: ${color.white};
  box-shadow: -4px 0 5px #e7eaf1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1050;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid ${color.basic200};
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AvatarWrapper = styled.div`
  transform: scale(1.6);
  transform-origin: left center;
  margin-bottom: 12px;
  margin-left: 4px;
`;

export const DetailsContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textLabel};
  margin: 0;
`;

export const DetailValue = styled.div`
  font-size: 14px;
  color: ${color.textPrimary};
  margin: 0;
  word-break: break-word;
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CloseButton = styled.button`
  color: ${color.basic500};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: ${color.basic700};
    background-color: ${color.basic100};
  }
`;

export const CopyButton = styled.button`
  color: ${color.basic500};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: ${color.basic700};
    background-color: ${color.basic100};
  }
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 8px;
  margin-top: 4px;
`;
