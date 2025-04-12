import styled from 'styled-components';
import { color } from '../../styles/color';

export const title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${color.textPrimary};
`;

export const errorMessage = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${color.error};
  `;
