import { jsx as _jsx } from "react/jsx-runtime";
import { ColorCssHelper } from 'lotus-core/modules/color';
import { useEffect, useState } from 'react';
import { DesignSystemBuilder, DesignSystemConstants } from '#designSystem';
import { DesignSystemContext } from './DesignSystemContext';
export const DesignSystemProvider = (props) => {
    const { colorScheme, params, children } = props;
    const [designSystem, setDesignSystem] = useState(DesignSystemBuilder.create(params, colorScheme));
    const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления
    useEffect(() => {
        const newDesignSystem = DesignSystemBuilder.create(params, colorScheme);
        setDesignSystem(newDesignSystem);
        if (colorScheme === 'light') {
            ColorCssHelper.isLight = true;
        }
        if (colorScheme === 'dark') {
            ColorCssHelper.isLight = false;
        }
        if (colorScheme) {
            document.documentElement.setAttribute(DesignSystemConstants.DataAttributeColorScheme, colorScheme);
        }
        // В память
        newDesignSystem.fontSizes.applyToCssVariable();
        newDesignSystem.lineSpacingSizes.applyToCssVariable();
        newDesignSystem.marginSizes.applyToCssVariable();
        newDesignSystem.paddingSizes.applyToCssVariable();
        newDesignSystem.gapSizes.applyToCssVariable();
        newDesignSystem.radiusSizes.applyToCssVariable();
        newDesignSystem.font.applyToCssVariable();
        newDesignSystem.border.applyToCssVariable();
        newDesignSystem.text.applyToCssVariable();
        newDesignSystem.background.applyToCssVariable();
        // Увеличиваем ключ для принудительного ререндера всех детей
        setProviderKey(prev => prev + 1);
    }, [params, colorScheme]);
    return (_jsx(DesignSystemContext.Provider, { value: {
            setDesignSystem: setDesignSystem,
            designSystem: designSystem
        }, children: children }, providerKey));
};
//# sourceMappingURL=DesignSystemProvider.js.map