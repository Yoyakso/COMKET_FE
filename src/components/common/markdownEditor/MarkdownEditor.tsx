import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import * as S from "./MarkdownEditor.Style";

interface Props {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

export const MarkdownEditor = ({ initialValue = "", onChange }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  // value 변경 시 콜백 실행
  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <S.EditorWrapper data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val = "") => setValue(val)}
        preview="live"
        textareaProps={{ placeholder: "티켓 상세 내용 입력" }}
      />
    </S.EditorWrapper>
  );
};
