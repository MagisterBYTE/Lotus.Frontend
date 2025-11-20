import { TThemePaletteActionType, TThemeColor, IThemePaletteColor, TThemePaletteComponentStructuralPart } from '#theme/types';
import { Color } from 'lotus-core/modules/color';
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
    static getPaletteColor(color: TThemeColor): IThemePaletteColor | undefined;
    /**
     * Получить цвет текущей темы
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getElementColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текста текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getTextColor(color: TThemeColor, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет фона текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBackgroundColor(color: TThemeColor, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет границы текущей темы
     * @param color Вариант цвета темы
     * @param allColor Если True то будет браться не только основной или дополнительный цвет
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getBorderColor(color: TThemeColor, allColor: boolean, actionType?: TThemePaletteActionType): Color;
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Вариант цвета темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    static getColorByStructuralPart(part: TThemePaletteComponentStructuralPart, color: TThemeColor, actionType?: TThemePaletteActionType): Color;
}
//# sourceMappingURL=ThemePaletteHelper.d.ts.map