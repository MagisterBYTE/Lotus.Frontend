import { ThemeColorPalettes } from '../constants';
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
}
