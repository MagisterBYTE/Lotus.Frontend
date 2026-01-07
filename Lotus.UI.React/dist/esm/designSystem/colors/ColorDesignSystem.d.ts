import { TColorSemantic, TColorVariantTuple } from 'lotus-core/modules/color';
import { TColorPalette } from './ColorPalette';
/**
 * Тип для обозначения всех доступных цветов с учетом вариативности без привязки к цветовой схеме
 */
export type TColorDesignSystemTuples = Record<TColorPalette | TColorSemantic, TColorVariantTuple>;
/**
 * Набор стандартных цветов для дизайн системы
 */
export declare abstract class ColorDesignSystem {
    static readonly Default: TColorDesignSystemTuples;
}
//# sourceMappingURL=ColorDesignSystem.d.ts.map