import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив типов цветов
 */
export const TThemeColors = ['blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];
/**
 * Набор типов цветов в виде опций
 */
export const ThemeColorOptions = TThemeColors.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
/**
 * Функция для проверки, является ли цвет типом цвета темы
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfThemeColor(color) {
    return TThemeColors.includes(color);
}
//# sourceMappingURL=ThemeColor.js.map