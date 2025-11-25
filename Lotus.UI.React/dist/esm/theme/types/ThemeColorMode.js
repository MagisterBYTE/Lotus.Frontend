import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив режимов тем
 */
export const TThemeColorModes = ['light', 'dark'];
/**
 * Набор режимов тем в виде опций
 */
export const ThemeColorModeOptions = TThemeColorModes.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
//# sourceMappingURL=ThemeColorMode.js.map