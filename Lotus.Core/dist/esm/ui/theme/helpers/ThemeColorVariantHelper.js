/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringHelper } from '../../../helpers';
import { checkOfColorVariantName, ColorVariantsHelper } from '../../../modules/color';
import { checkOfThemeColor } from '../types';
export class ThemeColorVariantHelper {
    /**
     * Функция для проверки, является ли цвет вариантом цвета темы
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static checkOf(color) {
        if (typeof color == 'string') {
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    return checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant);
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
            if (checkOfThemeColor(color))
                return { themeColor: color, colorVariant: 'main' };
            for (let index = color.length - 1; index >= 0; index--) {
                const c = color[index];
                if (c == c.toUpperCase()) {
                    const themeColor = color.substring(0, index);
                    const colorVariant = StringHelper.lowercaseFirstLetter(color.substring(index));
                    if (checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant)) {
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
                    if (checkOfThemeColor(themeColor) && checkOfColorVariantName(colorVariant)) {
                        const colorVariantNext = ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(colorVariant), delta);
                        return ThemeColorVariantHelper.create(themeColor, ColorVariantsHelper.getNameByIndex(colorVariantNext));
                    }
                }
            }
        }
        return color;
    }
}
