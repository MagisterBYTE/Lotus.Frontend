import { jsx as _jsx } from "react/jsx-runtime";
import { createLanguageChangeEvent, LocalizationHelper } from 'lotus-core/localization';
import { useEffect, useState } from 'react';
import { LocalizationContext } from './LocalizationContext';
export const LocalizationProvider = (props) => {
    const { keySave, children } = props;
    const [languageType, setLanguageType] = useState(LocalizationHelper.loadFromStorage(keySave) ?? 'ru-RU');
    const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления
    useEffect(() => {
        // Сохраняем язык в документ
        LocalizationHelper.setDocumentLang(languageType);
        // Сохраняем язык в локальное хранилище
        LocalizationHelper.saveToStorage(keySave, languageType);
        // Посылаем сообщение о смене языка
        const eventData = createLanguageChangeEvent(languageType);
        window.dispatchEvent(eventData);
        // Увеличиваем ключ для принудительного ререндера всех детей
        setProviderKey(prev => prev + 1);
    }, [languageType]);
    return (_jsx(LocalizationContext.Provider, { value: {
            languageType: languageType,
            setLanguageType: setLanguageType
        }, children: children }, providerKey));
};
//# sourceMappingURL=LocalizationProvider.js.map