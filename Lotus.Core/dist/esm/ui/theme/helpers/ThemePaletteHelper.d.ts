import { Color } from '../../../modules/color';
import { IThemePaletteColor, ThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '../types';
export declare class ThemePaletteHelper {
    /**
     * Получить степень прозрачности
     * @param actionType Тип действия
     */
    static getOpacity(actionType?: TThemePaletteActionType): number | undefined;
    /**
     * Получить палитру цвета
     * @param color Вариант цвета темы
     */
    static getPaletteColor(color: ThemeColorVariant): IThemePaletteColor | undefined;
    /**
     * Получить цвет текущей темы
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getElementColor(color: ThemeColorVariant, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текста текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getTextColor(color: ThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет фона текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBackgroundColor(color: ThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет границы текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBorderColor(color: ThemeColorVariant, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getColorByStructuralPart(part: TThemePaletteComponentStructuralPart, color: ThemeColorVariant, actionType?: TThemePaletteActionType): Color;
}
