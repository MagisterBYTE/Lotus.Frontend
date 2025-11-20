import { Theme } from '#theme/types';
import { Colors } from 'lotus-core/modules/color';
import { ThemeColorVariantHelper } from './ThemeColorVariantHelper';
export class ThemePaletteHelper {
    /**
     * Получить степень прозрачности
     * @param actionType Тип действия
     */
    static getOpacity(actionType) {
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.action.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        return opacity;
    }
    /**
     * Получить палитру цвета
     * @param color Вариант цвета темы
     */
    static getPaletteColor(color) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return;
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        // eslint-disable-next-line consistent-return
        return palette;
    }
    /**
     * Получить цвет текущей темы
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getElementColor(color, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants.getByName(colorData.colorVariant, ThemePaletteHelper.getOpacity(actionType));
    }
    /**
     * Получить цвет текста текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getTextColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.text.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.text.primary.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.text.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет фона текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBackgroundColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.background.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.background.default.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.background.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет границы текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBorderColor(color, allColor, actionType) {
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = Theme.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = Theme.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = Theme.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = Theme.currentPalette.border.disabledOpacity;
                    break;
                case 'focus':
                    opacity = Theme.currentPalette.action.focusOpacity;
                    break;
            }
        }
        if (allColor) {
            if (colorData.themeColor !== 'primary' && colorData.themeColor !== 'secondary') {
                const palette = Theme.currentPalette.colors[colorData.themeColor];
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
        }
        if (colorData.themeColor == 'primary') {
            return Theme.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
        }
        else {
            return Theme.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
        }
    }
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getColorByStructuralPart(part, color, actionType) {
        switch (part) {
            case 'element': return ThemePaletteHelper.getElementColor(color, actionType);
            case 'background': return ThemePaletteHelper.getBackgroundColor(color, true, actionType);
            case 'text': return ThemePaletteHelper.getTextColor(color, true, actionType);
            case 'border': return ThemePaletteHelper.getBorderColor(color, true, actionType);
        }
        return Colors.red;
    }
}
//# sourceMappingURL=ThemePaletteHelper.js.map