/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceOfThemeColor, TThemeColors } from '#theme/types';
import { StringHelper } from 'lotus-core/helpers';
import { ColorVariantsHelper, instanceOfColorVariantName, TColorVariantNames } from 'lotus-core/modules/color';
export class ThemeColorVariantHelper {
    /**
     * Функция для проверки, является ли цвет вариантом цвета темы
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static instanceOf(color) {
        if (typeof color == 'string') {
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    return instanceOfThemeColor(themeColor) && instanceOfColorVariantName(colorVariant);
                }
            }
        }
        return false;
    }
    /**
   * Функция для проверки, является ли цвет варианта цвета темы
   * @param color Проверяемый цвет
   * @returns Статус проверки
   */
    static instanceOfThemeColorVariant(color) {
        if (typeof color !== 'string')
            return false;
        // Проверяем базовые цвета (без вариантов)
        if (TThemeColors.includes(color)) {
            return true;
        }
        // Проверяем цвета с вариантами
        for (const themeColor of TThemeColors) {
            for (const variant of TColorVariantNames) {
                if (variant === 'main')
                    continue;
                const expectedVariant = `${themeColor}${variant}`;
                if (color.toLowerCase() === expectedVariant.toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Создание вариант цвета темы
     * @param color Тип цвета темы
     * @param colorVariant Именованный тип в вариативности цветов
     * @returns Вариант цвета темы
     */
    static create(color, colorVariant) {
        if (colorVariant == 'main')
            return color;
        return `${color}${StringHelper.capitalizeFirstLetter(colorVariant)}`;
    }
    /**
     * Деконструкция варианта цвета темы в тип цвета темы и именованный тип в вариативности цветов
     * @param color Вариант цвета темы
     * @returns Тип цвета темы и именованный тип в вариативности цветов
     */
    static deconstruction(color) {
        if (typeof color == 'string') {
            if (instanceOfThemeColor(color))
                return { themeColor: color, colorVariant: 'main' };
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    if (instanceOfThemeColor(themeColor) && instanceOfColorVariantName(colorVariant)) {
                        return {
                            themeColor: themeColor,
                            colorVariant: colorVariant
                        };
                    }
                }
            }
        }
        // eslint-disable-next-line consistent-return
        return undefined;
    }
    /**
     * Получить варианта цвета темы смещенный на указанную величину
     * @param color Вариант цвета темы
     * @returns Смещенный варианта цвета
     */
    static next(color, delta) {
        if (typeof color == 'string') {
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    if (instanceOfThemeColor(themeColor) && instanceOfColorVariantName(colorVariant)) {
                        const colorVariantNext = ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(colorVariant), delta);
                        return ThemeColorVariantHelper.create(themeColor, ColorVariantsHelper.getNameByIndex(colorVariantNext));
                    }
                }
            }
        }
        return color;
    }
    /**
     * Получить список вариантов цвета темы в виде массива
     * @returns Массив вариантов цвета темы
     */
    static getThemeColorVariants() {
        const colors = [];
        // Проверяем цвета с вариантами
        for (const themeColor of TThemeColors) {
            for (const variant of TColorVariantNames) {
                if (variant === 'main')
                    continue;
                const expectedVariant = `${themeColor}${StringHelper.capitalizeFirstLetter(variant)}`;
                colors.push(expectedVariant);
            }
        }
        return colors;
    }
}
//# sourceMappingURL=ThemeColorVariantHelper.js.map