import { StringHelper } from '#helpers';
/**
 * Массив цветов палитры
 */
export const TColorPalettes = ['blue', 'blueGray', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown', 'gray', 'dark'];
/**
 * Набор цветов палитры в виде опций
 */
export const ColorPaletteOptions = TColorPalettes.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
/**
 * Функция для проверки, является ли цвет цветом палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export function instanceOfColorPalette(color) {
    if (typeof color === 'string') {
        return TColorPalettes.includes(color);
    }
    return false;
}
//# sourceMappingURL=ColorPalette.js.map