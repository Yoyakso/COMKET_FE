import styled from "styled-components";
import { color } from "@/styles/color";

export const Badge = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${color.textSecondary};
  background-color:${color.white};
  min-width: 60px;
  text-align: center;
  display: inline-block;
`;