import { TThemeColor, TThemeColor } from '#theme/types';
import { TColorSemantic, TColorVariantName } from 'lotus-core/modules/color';
export declare class ThemeColorVariantHelper {
    /**
     * Функция для проверки, является ли цвет вариантом цвета темы
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static instanceOf(color: any): color is TThemeColor;
    /**
   * Функция для проверки, является ли цвет варианта цвета темы
   * @param color Проверяемый цвет
   * @returns Статус проверки
   */
    static instanceOfThemeColorVariant(color: any): color is TThemeColor;
    /**
     * Создание вариант цвета темы
     * @param color Тип цвета темы
     * @param colorVariant Именованный тип в вариативности цветов
     * @returns Вариант цвета темы
     */
    static create(color: TThemeColor, colorVariant: TColorVariantName): TThemeColor;
    /**
     * Деконструкция варианта цвета темы в тип цвета темы и именованный тип в вариативности цветов
     * @param color Вариант цвета темы
     * @returns Тип цвета темы и именованный тип в вариативности цветов
     */
    static deconstruction(color: any): {
        themeColor: TThemeColor | TColorSemantic;
        colorVariant: TColorVariantName;
    } | undefined;
    /**
     * Получить варианта цвета темы смещенный на указанную величину
     * @param color Вариант цвета темы
     * @returns Смещенный варианта цвета
     */
    static next(color: TThemeColor, delta?: number): TThemeColor;
    /**
     * Получить список вариантов цвета темы в виде массива
     * @returns Массив вариантов цвета темы
     */
    static getThemeColorVariants(): TThemeColor[];
}
//# sourceMappingURL=ThemeColorVariantHelper.d.ts.map