import styled from 'styled-components'
import {color} from '@styles/color'

export const Container = styled.div`

display: flex;
min-width: 1080px;
padding: var(--sds-size-space-800) var(--sds-size-space-1200) var(--sds-size-space-1200) var(--sds-size-space-1200);
flex-direction: column;
align-items: flex -start;
flex:1 0 0;
align-self: stretch;
background-color: ${color.white};
`;


export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
`;

export const ContentWrapper = styled.div`
  padding: 
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${color.basic200};
  padding: 20px;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textHeading};
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

export const PhotoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Photo = styled.div`
  width: 80px;
  height: 80px;
  background-color: basic100;
  border-radius:4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
`;