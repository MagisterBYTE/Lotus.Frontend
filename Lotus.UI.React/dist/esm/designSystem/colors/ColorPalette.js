import { StringHelper } from 'lotus-core/helpers';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfColorPalette(color) {
    if (typeof color === 'string') {
        return TColorPalettes.includes(color);
    }
    return false;
}
//# sourceMappingURL=ColorPalette.js.map