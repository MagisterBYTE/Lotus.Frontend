import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { ColorVariants } from './ColorVariants';
export type TColorPaletteVariants = Record<TColorPalette | TColorSemantic, ColorVariants>;
/**
 * Набор цветов палитры с вариативностью цвета для темной и светлой схемы
 */
export declare abstract class ColorPaletteVariants {
    static readonly Light: TColorPaletteVariants;
    static readonly Dark: TColorPaletteVariants;
}
//# sourceMappingURL=ColorPaletteVariants.d.ts.map