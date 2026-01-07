import { TColorSemantic, TColorVariantTuple } from 'lotus-core/modules/color';
import { BackgroundDesignSystem } from './background';
import { BorderDesignSystem } from './border';
import { TColorPalette } from './colors';
import { FontDesignSystem } from './font';
import { FontSizes, GapSizes, LineSpacingSizes, MarginSizes, PaddingSizes, RadiusSizes } from './sizes';
import { TextDesignSystem } from './text';
/**
 * Дизайн система представляет собой совокупность визуальных настроек
 */
export interface IDesignSystem {
    /**
     * Размеры связанные со шрифтами
     */
    fontSizes: FontSizes;
    /**
     * Размеры связанные с межстрочным интервалом
     */
    lineSpacingSizes: LineSpacingSizes;
    /**
     * Размеры связанные с внутренним отступом
     */
    marginSizes: MarginSizes;
    /**
     * Размеры связанные с внешним отступом
     */
    paddingSizes: PaddingSizes;
    /**
     * Размеры связанные с расстоянием между элементами
     */
    gapSizes: GapSizes;
    /**
     * Размеры связанные с радиусом закругления
     */
    radiusSizes: RadiusSizes;
    /**
     * Определение данных дизайн-системы для шрифтов
     */
    font: FontDesignSystem;
    /**
     * Определение данных дизайн-системы для границы
     */
    border: BorderDesignSystem;
    /**
     * Определение данных дизайн-системы для текста
     */
    text: TextDesignSystem;
    /**
     * Определение данных дизайн-системы для фона
     */
    background: BackgroundDesignSystem;
    /**
     * Набор цветов с учетом вариативности без привязки к цветовой схеме
     */
    colors: Record<TColorPalette | TColorSemantic, TColorVariantTuple>;
}
//# sourceMappingURL=DesignSystem.d.ts.map