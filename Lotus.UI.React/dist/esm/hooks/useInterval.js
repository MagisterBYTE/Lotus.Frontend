import { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useInterval(callback, delay) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const savedCallback = useRef(null);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (...args) => savedCallback.current?.(...args);
        if (delay !== null) {
            const id = setInterval(handler, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
//# sourceMappingURL=useInterval.js.map