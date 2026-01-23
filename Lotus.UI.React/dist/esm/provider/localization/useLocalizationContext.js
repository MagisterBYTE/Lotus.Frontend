import * as React from 'react';
import { LocalizationContext } from './LocalizationContext';
export const useLocalizationContext = () => {
    const context = React.useContext(LocalizationContext);
    if (!context) {
        throw new Error('You can use "useLocalizationContext" hook only within a <LocalizationProvider> component.');
    }
    return context;
};
//# sourceMappingURL=useLocalizationContext.js.map