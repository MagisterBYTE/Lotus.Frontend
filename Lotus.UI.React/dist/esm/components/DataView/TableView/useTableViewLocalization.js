import { LocalizationCore, LocalizationHelper, TLanguageTypes } from 'lotus-core/localization';
import { useEffect, useState } from 'react';
import { MRT_Localization_EN, MRT_Localization_RU } from '#external/mantine-react-table';
export function useTableViewLocalization() {
    // Локализация
    const localizationFullRU = {
        filterIncludeAny: LocalizationCore.data.filters.includeAny,
        filterIncludeAll: LocalizationCore.data.filters.includeAll,
        filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
        filterIncludeNone: LocalizationCore.data.filters.includeNone,
        ...MRT_Localization_RU
    };
    const localizationFullEN = {
        filterIncludeAny: LocalizationCore.data.filters.includeAny,
        filterIncludeAll: LocalizationCore.data.filters.includeAll,
        filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
        filterIncludeNone: LocalizationCore.data.filters.includeNone,
        ...MRT_Localization_EN
    };
    const [localization, setLocalization] = useState(localizationFullRU);
    const handleTranslate = (lang) => {
        if (lang === TLanguageTypes.ru_RU) {
            setLocalization(localizationFullRU);
        }
        else {
            setLocalization(localizationFullEN);
        }
    };
    useEffect(() => {
        const currentLang = LocalizationHelper.getDocumentLang();
        handleTranslate(currentLang);
    }, []);
    return localization;
}
//# sourceMappingURL=useTableViewLocalization.js.map