import { StringHelper } from '../../../helpers';
/**
 * Массив режимов тем
 */
export const TThemeModes = ['light', 'dark'];
/**
 * Набор режимов тем в виде опций
 */
export const ThemeModeOptions = TThemeModes.map((x) => {
    return {
        text: StringHelper.capitalizeFirstLetter(x),
        value: x
    };
});
