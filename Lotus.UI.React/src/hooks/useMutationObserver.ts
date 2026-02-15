import { useEffect, useRef } from 'react';

export interface IMutationObserverProps
{
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void
  options: MutationObserverInit;
}

export function useMutationObserver(props: IMutationObserverProps)
{
  const { callback, options } = props;
  const mutationRef = useRef(document.documentElement);

  useEffect(() => 
  {
    if (mutationRef.current) 
    {
      const observer = new MutationObserver(callback);
      observer.observe(mutationRef.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
}
