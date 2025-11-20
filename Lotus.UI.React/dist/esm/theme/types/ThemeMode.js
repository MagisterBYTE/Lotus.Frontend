import { StringHelper } from 'lotus-core/helpers';
/**
 * Массив режимов тем
 */
export const TThemeModes = ['light', 'dark'];
/**
 * Набор режимов тем в виде опций
 */
export const ThemeModeOptions = TThemeModes.map((x) => {
    return {
        label: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
//# sourceMappingURL=ThemeMode.js.map