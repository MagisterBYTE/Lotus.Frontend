import { useState, useCallback, useEffect } from 'react';

export function useResizer(initialWidth: number, initialHeight: number)
{
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => 
  {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => 
  {
    if (!isResizing) return;
    setSize((prev) => ({
      width: Math.max(300, prev.width + e.movementX),
      height: Math.max(350, prev.height + e.movementY)
    }));
  }, [isResizing]);

  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => 
  {
    if (isResizing) 
    {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => 
    {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return [size, handleMouseDown] as const;
}