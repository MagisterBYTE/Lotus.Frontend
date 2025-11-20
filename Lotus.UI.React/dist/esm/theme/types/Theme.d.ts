import { Color } from 'lotus-core/modules/color';
import { TThemeColor } from './ThemeColor';
import { TThemeColor } from './TThemeColor';
import { TThemeData } from './ThemeData';
import { IThemePalette } from './ThemePalette';
/**
 * Тема приложения
 */
export declare abstract class Theme {
    private static _currentPalette;
    private static _currentColor;
    /**
     * Получить текущую палитру цвета
     */
    static get currentPalette(): IThemePalette;
    /**
     * Установить текущую палитру цвета
     */
    static set currentPalette(palette: IThemePalette);
    /**
     * Получить основной цвет
     */
    static get currentColor(): TThemeColor;
    /**
     * Установить основной цвет
     */
    static set currentColor(themeColor: TThemeColor);
    /**
     * Загрузка темы из локального хранилища
     * @returns Данные текущей темы данные по умолчанию
     */
    static loadFromStorage(): TThemeData;
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    static saveToStorage(theme: TThemeData): void;
    static getColor(color?: TThemeColor): Color | undefined;
}
//# sourceMappingURL=Theme.d.ts.map