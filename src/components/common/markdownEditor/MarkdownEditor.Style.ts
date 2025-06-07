import styled from "styled-components";

export const EditorWrapper = styled.div`
  width: 600px;

  .w-md-editor {
    font-family: 'Noto Sans KR', 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: 0;
    border: 1px solid #ddd;
  }

  .w-md-editor-text-input {
  font-family: 'Noto Sans KR', 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
  padding: 8px !important;
  box-sizing: border-box !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  -webkit-font-smoothing: antialiased;
  caret-color: black;
  resize: none;
  overflow-y: auto;
}

.w-md-editor-preview {
  font-family: 'Noto Sans KR', 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.4;
}

  .w-md-editor-toolbar {
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
  }
`;
