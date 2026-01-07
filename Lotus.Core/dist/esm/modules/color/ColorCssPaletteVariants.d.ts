import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { TColorVariantTuple } from './ColorVariantsTypes';
export type TColorCssPaletteVariant = Record<TColorPalette | TColorSemantic, TColorVariantTuple>;
/**
 * Набор цветов палитры с вариативностью цвета для темной и светлой схемы
 */
export declare abstract class ColorCssPaletteVariants {
    static readonly Light: TColorCssPaletteVariant;
    static readonly Dark: TColorCssPaletteVariant;
}
//# sourceMappingURL=ColorCssPaletteVariants.d.ts.map