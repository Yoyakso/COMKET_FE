import { useState, useCallback } from 'react';

export const useUserInfoModal = () => {
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const open = useCallback((id: number) => {
    setUserId(id);
    setVisible(true);
  }, []);

  const close = useCallback(() => setVisible(false), []);

  return { visible, userId, open, close };
};
