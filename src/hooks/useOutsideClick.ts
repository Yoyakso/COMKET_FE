import { useEffect, RefObject } from 'react';

export function useOutsideClick(
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: () => void,
) {
  const refArray = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (refArray.some(r => r.current?.contains(e.target as Node))) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [refArray, handler]);
}
