import styled, { keyframes } from "styled-components"

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
`

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 6px solid #e2e8f0;
  border-top: 6px solid #3b82f6; // 파란색
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const Text = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #334155;
  font-weight: 500;
`
