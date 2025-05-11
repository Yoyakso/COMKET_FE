import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

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
  animation: ${fadeIn} 0.3s ease-out;
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 840px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px 32px 32px 32px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  margin-left: 20px;
`

export const MemberCount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${color.teal500}
`

export const SearchSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const SearchInput = styled.div`
  position: relative;
  width: 300px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10.5px 15px;
  border: 1px solid #EDEFF5;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }

  &::placeholder {
    color: ${color.textPlaceholder}
  }
`

export const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
`

export const AddButton = styled.button`
  background-color: ${color.teal500};
  color: white;
  border: none;
  border-radius: 3px;
  padding: 9px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  
  &:hover {
    background-color: ${color.teal600};
  }
`

export const TableContainer = styled.div`
  border-bottom: 1px solid #CFD5E4;
  border-radius: 8px;
  margin-bottom: 24px;
  flex: 1;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  background-color: ${color.white}
`

export const HeaderRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`

export const HeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: ${color.textHeading}
  cursor: pointer;
  
  &:last-child {
    text-align: center;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`

export const SortIcon = styled.span`
  margin-left: 4px;
`

export const TableBody = styled.tbody``

export const Row = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f8f9fa;
  }
`

export const Cell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${color.textPrimary};
  vertical-align: middle;
  
  &:last-child {
    text-align: center;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const Avatar = styled.div<{ $bgColor: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
`

export const UserName = styled.div`
  font-weight: 500;
`

export const RoleSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #F7F8FA;
  }
`

export const RoleDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const RoleOption = styled.div<{ $active?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#f0f7ff" : "transparent")};
  
  &:hover {
    background-color: #f5f5f5;
  }
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`

export const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 120px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const ActionMenuItem = styled.div<{ $danger?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  color: ${(props) => (props.$danger ? "#e53935" : "inherit")};
  
  &:hover {
    background-color: ${(props) => (props.$danger ? "#ffebee" : "#f5f5f5")};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  width: 324px;
  
  &:hover {
    background-color: ${color.basic0};
  }
`

export const SaveButton = styled.button`
  width: 324px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${color.teal500};
  color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: ${color.teal600};
  }
  
  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`

export const ActionButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`
