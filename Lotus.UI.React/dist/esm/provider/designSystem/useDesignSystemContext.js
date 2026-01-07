import * as React from 'react';
import { DesignSystemContext } from './DesignSystemContext';
export const useDesignSystemContext = () => {
    const context = React.useContext(DesignSystemContext);
    if (!context) {
        throw new Error('You can use "useDesignSystemContext" hook only within a <DesignSystemProvider> component.');
    }
    return context;
};
//# sourceMappingURL=useDesignSystemContext.js.map