import { Color, TColorSemantic, TColorVariantName } from 'lotus-core/modules/color';
import { IThemePalette, IThemePaletteColor, TThemeColor, TThemeColorPalette, TThemeData, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from './types';
/**
 * Тема приложения
 */
export declare class Theme {
    /**
     * Ключ под которым сохраняется тема сайта
     */
    static readonly SaveKey: string;
    /**
     * Названия атрибута в документа под которым сохраняется тема сайта
     */
    static readonly DataAttributeThemeMode: string;
    /**
     * Названия атрибута в документа под которым сохраняется цвет темы сайта
     */
    static readonly DataAttributeThemeColor: string;
    /**
     * Шрифт по умолчанию
     */
    static readonly FontDefault: string;
    /**
     * Шрифт для акцента
     */
    static readonly FontAccent: string;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static readonly TransitionSpeed: number;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static readonly TransitionSpeedFast: number;
    /**
     * Прозрачность для элементов UI которые недоступны
     */
    static readonly OpacityForDisabled: number;
    /**
     * Прозрачность тени для границы элементов UI которые при наведении
     */
    static readonly OpacityForBorderShadowHover: number;
    /**
     * Прозрачность тени для границы элементов UI которые при активном состоянии
     */
    static readonly OpacityForBorderShadowActive: number;
    private static _Instance;
    static get Instance(): Theme;
    private _currentPalette;
    private _currentColor;
    /**
     * Получить текущую палитру цвета
     */
    get currentPalette(): IThemePalette;
    /**
     * Установить текущую палитру цвета
     */
    set currentPalette(palette: IThemePalette);
    /**
     * Получить основной цвет
     */
    get currentColor(): TThemeColorPalette;
    /**
     * Установить основной цвет
     */
    set currentColor(themePaletteColor: TThemeColorPalette);
    constructor();
    /**
     * Получить степень прозрачности
     * @param actionType Тип действия
     */
    getOpacity(actionType?: TThemePaletteActionType): number | undefined;
    /**
     * Получить палитру цвета
     * @param color Доступный цвет темы
     */
    getPaletteColor(color: TThemeColor): IThemePaletteColor | undefined;
    /**
     * Получить цвет текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getElementColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текста текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getTextColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет фона текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getBackgroundColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет границы текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getBorderColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getColorByStructuralPart(part: TThemePaletteComponentStructuralPart, color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    getColorInfoHSL(colorTheme: TThemeColorPalette | TColorSemantic, colorVariant: TColorVariantName): string;
    /**
     * Загрузка темы из локального хранилища
     * @returns Данные текущей темы данные по умолчанию
     */
    loadFromStorage(): TThemeData;
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    saveToStorage(theme: TThemeData): void;
}
export declare const ThemeInstance: Theme;
//# sourceMappingURL=Theme.d.ts.map