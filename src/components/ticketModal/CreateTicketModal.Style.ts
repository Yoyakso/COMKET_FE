import styled from "styled-components"
import { color } from "@styles/color"

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
`

export const ModalContainer = styled.div`
  width: 840px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ModalHeader = styled.div`
  padding: 40px 32px 32px 32px;
  text-align: center;
`

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
`

export const FormLabel = styled.label`
  width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  padding-top: 10px;
  flex-shrink: 0;
`

export const TextField = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${color.basic0};
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${color.basic0};
  }
  
  &::placeholder {
    color: #aaa;
  }
`

export const EditorWrapper = styled.div`
  flex: 1;
`

export const SelectField = styled.div`
  position: relative;
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${color.basic100};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const SelectText = styled.span`
  font-size: 14px;
  color: #aaa;
`

export const AssigneeText = styled.span`
  font-size: 14px;
  color: #aaa;
`

export const EditorContainer = styled.div`
  flex: 1;
  border: 1px solid ${color.basic0};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const EditorToolbar = styled.div`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid ${color.basic0};
  background-color: #f9f9f9;
  flex-wrap: wrap;
  gap: 8px;
`

export const ToolbarGroup = styled.div`
  display: flex;
  gap: 2px;
  
  &:not(:last-child) {
    margin-right: 8px;
    padding-right: 8px;
    border-right: 1px solid ${color.basic0};
  }
`

export const ToolbarButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
  }
`

export const ToolbarSelect = styled.div`
  height: 28px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
  }
`

export const EditorContent = styled.div`
  flex: 1;
  padding: 16px;
  min-height: 200px;
  font-size: 14px;
  color: #333;
  
  &:focus {
    outline: none;
  }
  
  &:empty:before {
    content: attr(placeholder);
    color: #aaa;
  }
`

export const EditorResizeHandle = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-top: 1px solid ${color.basic0};
  cursor: ns-resize;
`

export const PriorityOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PriorityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f44336;
`

export const StatusOption = styled.div`
  font-size: 14px;
  color: #333;
`

export const UserOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4fc3f7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
`

export const UserName = styled.span`
  font-size: 14px;
  color: #333;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
  padding: 16px 20px;
`

export const CancelButton = styled.button`
  width: 382px;
  padding: 0 24px;
  height: 48px;
  border: 1px solid #E7EAF1;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  color: ${color.textSecondary}
  cursor: pointer;
  
  &:hover {
    background-color:${color.basic100};
  }
`

export const SubmitButton = styled.button`
  width: 382px;
  padding: 0 24px;
  height: 48px;
  border: none;
  border-radius: 4px;
  background-color: ${color.teal500};
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: ${color.primaryDisabled};
    color: ${color.textTertiary};
    cursor: not-allowed;
  }
`

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 42px;
  left: 0;
  background: white;
  border: 1px solid ${color.basic0};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 4px 0;
  width: 100%;
  z-index: 999;
  list-style: none;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 14px;
  color: ${color.textPrimary};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.basic100};
  }

  & > svg,
  & > span {
    margin-right: 8px;
  }
`;

export const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateField = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;
