import { useState } from 'react';
export function useProxyObject(props) {
    const { object } = props;
    const [proxy, setProxy] = useState({ obj: object });
    object.onRefreshProxy = onRefreshProxy;
    function onRefreshProxy() {
        setProxy({ obj: object });
    }
    return proxy.obj;
}
//# sourceMappingURL=useProxyObject.js.map