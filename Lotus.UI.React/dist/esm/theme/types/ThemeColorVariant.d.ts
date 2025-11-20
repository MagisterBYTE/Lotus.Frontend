import { TColorSemantic, TColorVariantName } from 'lotus-core/modules/color';
import { TThemeColor } from './ThemeColor';
/**
 * Вариант цвета темы
 */
export type TThemeColor = `${TThemeColor}${Exclude<Capitalize<TColorVariantName>, 'Main'>}` | TThemeColor | TColorSemantic;
export type ThemeColorVariantUndef = TThemeColor | undefined;
//# sourceMappingURL=TThemeColor.d.ts.map