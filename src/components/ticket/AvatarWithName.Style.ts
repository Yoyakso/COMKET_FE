import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarFallback = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a9b4c2;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Name = styled.span`
  font-size: 14px;
  color: #1a1a1a;
`;

export const Nickname = styled.span`
  font-size: 12px;
  color: #a9a9a9;
`;
