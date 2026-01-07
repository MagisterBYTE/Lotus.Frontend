import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив цветовых схем
 */
export const TColorSchemes = ['light', 'dark'];
/**
 * Набор цветовых схем в виде опций
 */
export const ColorSchemeOptions = TColorSchemes.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
//# sourceMappingURL=ColorScheme.js.map