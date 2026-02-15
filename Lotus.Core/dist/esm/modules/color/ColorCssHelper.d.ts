/**
 * Вспомогательный класс для работы c цветом для Css
 */
export declare abstract class ColorCssHelper {
    static isLight: boolean;
    /**
     * Получить корректный цвет для Css
     * @param color Цвет любого типа
     * @returns Корректный цвет для Css или undefined
     */
    static getColor(color?: string): string | undefined;
    /**
     * Получить корректный цвет для Css с учетом прозрачности
     * @param color Цвет любого типа
     * @param alpha Прозрачность от 0 до 1
     * @returns Корректный цвет для Css с учетом прозрачности или undefined
     */
    static getColorWithAlpha(color?: string, alpha?: number): string | undefined;
    /**
     * Получить контрастный корректный цвет для Css
     * @param color Цвет любого типа
     * @returns Контрастный корректный цвет для Css или undefined
     */
    static getColorContrast(color?: string): string | undefined;
}
//# sourceMappingURL=ColorCssHelper.d.ts.map