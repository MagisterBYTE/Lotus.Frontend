import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useInterval(callback: Function, delay: number)
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const savedCallback = useRef<Function>(null);
  useEffect(() => 
  {
    savedCallback.current = callback;
  }, [callback]);

   
  useEffect(() => 
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (...args: any) => savedCallback.current?.(...args);

    if (delay !== null) 
    {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
