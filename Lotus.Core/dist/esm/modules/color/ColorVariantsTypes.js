export const TColorVariantIndexWhite = 1;
export const TColorVariantIndexPalest = 2;
export const TColorVariantIndexPale = 3;
export const TColorVariantIndexLighter = 4;
export const TColorVariantIndexLight = 5;
export const TColorVariantIndexMain = 6;
export const TColorVariantIndexDark = 7;
export const TColorVariantIndexDarker = 8;
export const TColorVariantIndexDarkest = 9;
export const TColorVariantIndexBlack = 10;
/**
 * Массив всех именованных типов в вариативности цветов
 */
export const TColorVariantNames = ['white', 'palest', 'pale', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest', 'black'];
/**
 * Функция для проверки, является ли значение именованным типом в вариативности цветов
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfColorVariantName(value) {
    return TColorVariantNames.includes(value);
}
//# sourceMappingURL=ColorVariantsTypes.js.map