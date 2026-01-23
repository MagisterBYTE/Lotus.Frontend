import { TColorCssPaletteVariant, TColorToken } from 'lotus-core/modules/color';
import { IDesignSystemItem } from '#designSystem/types';
import { TCssColor } from '#types';
/**
 * Набор стандартных цветов для дизайн системы
 */
export declare class ColorDesignSystem implements IDesignSystemItem {
    /**
     * Стандартные цвета дизайн-системы для светлой темы
     */
    static readonly LightDefault: ColorDesignSystem;
    /**
     * Стандартные цвета дизайн-системы для темной темы
     */
    static readonly DarkDefault: ColorDesignSystem;
    /**
     * Основной цвет
     */
    primaryColor: TCssColor | TColorToken;
    /**
     * Основной оттенок цвета
     */
    primaryShade: number;
    /**
     * Набор цветов
     */
    colors: TColorCssPaletteVariant;
    constructor(primaryColor: TCssColor | TColorToken, primaryShade: number, colors: TColorCssPaletteVariant);
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=ColorDesignSystem.d.ts.map