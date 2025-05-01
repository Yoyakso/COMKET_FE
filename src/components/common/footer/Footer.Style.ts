import styled from "styled-components";
import { color } from "@/styles/color";

interface FooterContainerProps {
  type: "default" | "black";
}

export const FooterContainer = styled.footer<FooterContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 280px;
  height: 96px;
  background-color: ${({ type }) => (type === "black" ? color.basic1000 : color.basic0)};
`;

export const FooterText = styled.p`
  font-size: 12px;
  color: ${color.textSecondary};
  text-align: center;
  font-weight: 400;
`;