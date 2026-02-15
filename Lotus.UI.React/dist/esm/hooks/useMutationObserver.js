import { useEffect, useRef } from 'react';
export function useMutationObserver(props) {
    const { callback, options } = props;
    const mutationRef = useRef(document.documentElement);
    useEffect(() => {
        if (mutationRef.current) {
            const observer = new MutationObserver(callback);
            observer.observe(mutationRef.current, options);
            return () => observer.disconnect();
        }
    }, [callback, options]);
}
//# sourceMappingURL=useMutationObserver.js.map