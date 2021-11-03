import { useState, useCallback } from 'react';

export function useClientRect() {
  const [rect, setRect] = useState<ClientRect>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref] as const;
}

export default useClientRect;
