import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import * as S from "./MarkdownEditor.Style"

interface Props {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

export const MarkdownEditor = ({ initialValue = '', onChange }: Props) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || '';
    onChange?.(markdown);
  };

  return (
    <S.EditorWrapper>
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        previewStyle="vertical"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleChange}
        placeholder="티켓 상세 내용 입력"
      />
    </S.EditorWrapper>
  );
};
