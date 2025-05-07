import { useState } from 'react';
import { TextInput } from '@/components/common/textInput/TextInput';

export const TextInputExample = () => {
  const [defaultText, setDefaultText] = useState('기본 텍스트');
  const [passwordText, setPasswordText] = useState('123456');
  const [chipValue, setChipValue] = useState('칩내용');
  const [prefixValue, setPrefixValue] = useState('my-site');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
      <h3>✅ default type</h3>
      <TextInput
        type="default"
        value={defaultText}
        onChange={setDefaultText}
        state="default"
        size="md"
        placeholder="기본 입력"
        helperText="기본 상태입니다"
      />
      <TextInput
        type="default"
        value={defaultText}
        onChange={setDefaultText}
        state="success"
        size="md"
        placeholder="성공 상태"
        helperText="성공!"
      />
      <TextInput
        type="default"
        value={defaultText}
        onChange={setDefaultText}
        state="error"
        size="md"
        placeholder="오류 상태"
        helperText="에러 발생!"
      />
      <TextInput
        type="default"
        value={defaultText}
        onChange={setDefaultText}
        state="disabled"
        size="md"
        placeholder="비활성화됨"
        helperText="입력 불가"
      />

      <h3>🔒 password type</h3>
      <TextInput
        type="password"
        value={passwordText}
        onChange={setPasswordText}
        state="default"
        size="md"
        placeholder="비밀번호 입력"
        helperText="비밀번호입니다"
      />

      <h3>🏷 chip type</h3>
      <TextInput
        type="chip"
        value={chipValue}
        onChange={setChipValue}
        state="default"
        size="md"
        placeholder="태그 추가"
        helperText="chip type 예시"
      />

      <h3>🌐 prefix type</h3>
      <TextInput
        type="prefix"
        value={prefixValue}
        onChange={setPrefixValue}
        state="default"
        size="md"
        placeholder="domain"
        helperText="ex. my-site.com"
      />
    </div>
  );
};
