import { ThemeColorPalettes, ThemeConstant } from '#theme/constants';
import { ThemeColorVariantHelper } from '#theme/helpers';
/**
 * Тема приложения
 */
export class Theme {
    // #region Static properties
    static _currentPalette;
    static _currentColor;
    /**
     * Получить текущую палитру цвета
     */
    static get currentPalette() {
        if (Theme._currentPalette)
            return Theme._currentPalette;
        return ThemeColorPalettes.Palettes['light'];
    }
    /**
     * Установить текущую палитру цвета
     */
    static set currentPalette(palette) {
        Theme._currentPalette = palette;
    }
    /**
     * Получить основной цвет
     */
    static get currentColor() {
        if (Theme._currentColor)
            return Theme._currentColor;
        return 'blue';
    }
    /**
     * Установить основной цвет
     */
    static set currentColor(themeColor) {
        Theme._currentColor = themeColor;
    }
    // #endregion
    // #region Load/Save
    /**
     * Загрузка темы из локального хранилища
     * @returns Данные текущей темы данные по умолчанию
     */
    static loadFromStorage() {
        const value = localStorage.getItem(ThemeConstant.SaveKey);
        if (value) {
            return JSON.parse(value);
        }
        else {
            return { mode: 'light', color: 'blue' };
        }
    }
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    static saveToStorage(theme) {
        localStorage.setItem(ThemeConstant.SaveKey, JSON.stringify(theme));
    }
    // #endregion
    // #region Common
    static getColor(color) {
        if (!color)
            return undefined;
        const colorData = ThemeColorVariantHelper.deconstruction(color);
        if (!colorData)
            return undefined;
        const palette = Theme.currentPalette.colors[colorData.themeColor];
        return palette.variants[colorData.colorVariant];
    }
}
//# sourceMappingURL=Theme.js.map