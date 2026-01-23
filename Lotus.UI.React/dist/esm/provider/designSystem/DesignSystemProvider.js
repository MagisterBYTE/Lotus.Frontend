import { jsx as _jsx } from "react/jsx-runtime";
import { ColorCssHelper } from 'lotus-core/modules/color';
import { useState } from 'react';
import { DesignSystem, DesignSystemHelper } from '#designSystem';
import { DesignSystemContext } from './DesignSystemContext';
function createAndApplyDesignSystem(params, actualColorScheme, keySave) {
    // Создаем новую дизайн-систему
    const newDesignSystem = new DesignSystem(params, actualColorScheme);
    // Присваиваем значение глобальных переменных
    newDesignSystem.applyToCssVariable();
    // Присваиваем цветовую схему вспомогательному классу
    if (actualColorScheme === 'light') {
        ColorCssHelper.isLight = true;
    }
    if (actualColorScheme === 'dark') {
        ColorCssHelper.isLight = false;
    }
    // Данные дизайн-системы
    const designSystemData = { colorScheme: actualColorScheme, primaryColor: 'blue' };
    // Сохраняем в документе
    DesignSystemHelper.setDocumentDesignSystem(designSystemData);
    // Сохраняем в локальное хранилище
    DesignSystemHelper.saveToStorage(keySave, designSystemData);
    return newDesignSystem;
}
export const DesignSystemProvider = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    const loadData = DesignSystemHelper.loadFromStorage(props.keySave);
    const { colorScheme, params, children, keySave } = props;
    const actualColorScheme = loadData?.colorScheme ?? colorScheme ?? 'light';
    const [designSystem, setDesignSystem] = useState(createAndApplyDesignSystem(params, actualColorScheme, keySave));
    const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления
    const handleColorSchemeChange = (scheme) => {
        // Создаем новую дизайн-систему
        const newDesignSystem = createAndApplyDesignSystem(params, scheme, keySave);
        setDesignSystem(newDesignSystem);
        // Увеличиваем ключ для принудительного ререндера всех детей
        setProviderKey(prev => prev + 1);
    };
    return (_jsx(DesignSystemContext.Provider, { value: {
            setDesignSystem: setDesignSystem,
            setColorScheme: handleColorSchemeChange,
            designSystem: designSystem
        }, children: children }, providerKey));
};
//# sourceMappingURL=DesignSystemProvider.js.map