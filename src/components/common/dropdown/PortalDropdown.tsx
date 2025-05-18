import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export const PortalDropdown = ({ triggerRef, children }: Props) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [triggerRef]);

  const root = document.getElementById('dropdown-root');
  if (!root) return null;

  return createPortal(
    <div style={{ position: 'absolute', ...pos, zIndex: 9999 }}>{children}</div>,
    root,
  );
};
