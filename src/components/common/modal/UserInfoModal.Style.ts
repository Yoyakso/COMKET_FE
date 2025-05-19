import styled from 'styled-components';
import { color } from '@/styles/color';

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

export const ModalContainer = styled.div`
  max-width: 28rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${color.white};
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${color.basic200};
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AvatarWrapper = styled.div`
  transform: scale(2);
  transform-origin: left center;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

export const StatusIndicator = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${color.success};
  margin-right: 0.375rem;
`;

export const StatusText = styled.span`
  font-size: 0.875rem;
  color: ${color.success};
`;

export const CloseButton = styled.button`
  color: ${color.basic600};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    color: ${color.basic800};
    background-color: ${color.basic100};
  }
`;

export const DetailsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

export const DetailItem = styled.div``;

export const DetailLabel = styled.p`
  font-size: 0.875rem;
  color: ${color.textSecondary};
  margin-bottom: 0.25rem;
  margin-top: 0;
`;

export const DetailValue = styled.p`
  font-size: 0.875rem;
  color: ${color.textPrimary};
  margin: 0;
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyButton = styled.button`
  color: ${color.basic500};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    color: ${color.basic700};
    background-color: ${color.basic100};
  }
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
