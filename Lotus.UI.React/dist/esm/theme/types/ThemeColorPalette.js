import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив типов цветов палитры
 */
export const TThemeColorPalettes = ['blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];
/**
 * Набор типов цветов палитры в виде опций
 */
export const ThemeColorPaletteOptions = TThemeColorPalettes.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
/**
 * Функция для проверки, является ли цвет типом цвета палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfThemeColorPalette(color) {
    if (typeof color === 'string') {
        return TThemeColorPalettes.includes(color);
    }
    return false;
}
//# sourceMappingURL=ThemeColorPalette.js.map