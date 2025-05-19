import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import * as S from "./MarkdownEditor.Style";

interface Props {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

export const MarkdownEditor = ({ initialValue = "", onChange }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  // 초기값이 변경될 경우 동기화 (선택적)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // value 변경 시 콜백 실행
  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <S.EditorWrapper data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val = "") => setValue(val)}
        preview="live" // live, edit, preview 설정 가능
        textareaProps={{ placeholder: "티켓 상세 내용 입력" }}
      />
    </S.EditorWrapper>
  );
};
