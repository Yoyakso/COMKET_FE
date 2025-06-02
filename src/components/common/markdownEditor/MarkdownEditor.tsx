import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import * as S from "./MarkdownEditor.Style";

interface Props {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

export const MarkdownEditor = ({ initialValue = "", onChange }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <S.EditorWrapper data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val = "") => setValue(val)}
        preview="edit"
        textareaProps={{ placeholder: "상세 내용을 입력해주세요." }}
      />
    </S.EditorWrapper>
  );
};
