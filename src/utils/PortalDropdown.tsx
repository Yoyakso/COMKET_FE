import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalDropdownProps {
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export const PortalDropdown = ({ triggerRef, children }: PortalDropdownProps) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [ready, setReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !dropdownRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;

      setCoords({
        top: triggerRect.bottom + window.scrollY,
        left: triggerRect.left + triggerRect.width / 2 - dropdownWidth / 2 + window.scrollX,
      });

      setReady(true);
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [triggerRef]);

  const portalRoot = document.getElementById('dropdown-root');
  if (!portalRoot) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    portalRoot,
  );
};
