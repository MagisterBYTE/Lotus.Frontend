import { ColorCssPaletteVariants } from 'lotus-core/modules/color';
import { CssVariables } from '#designSystem/сssVariables';
/**
 * Набор стандартных цветов для дизайн системы
 */
export class ColorDesignSystem {
    // #region Const
    /**
     * Стандартные цвета дизайн-системы для светлой темы
     */
    static LightDefault = new ColorDesignSystem('blue', 5, ColorCssPaletteVariants.Light);
    /**
     * Стандартные цвета дизайн-системы для темной темы
     */
    static DarkDefault = new ColorDesignSystem('blue', 5, ColorCssPaletteVariants.Dark);
    // #endregion
    // #region Fields
    /**
     * Основной цвет
     */
    primaryColor;
    /**
     * Основной оттенок цвета
     */
    primaryShade;
    /**
     * Набор цветов
     */
    colors;
    // #endregion
    constructor(primaryColor, primaryShade, colors) {
        this.primaryColor = primaryColor;
        this.primaryShade = primaryShade;
        this.colors = colors;
    }
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
        document.documentElement.style.setProperty(CssVariables.PrimaryColor0.match(CssVariables.RegExtractName)[0], this.colors.primary[0]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor1.match(CssVariables.RegExtractName)[0], this.colors.primary[1]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor2.match(CssVariables.RegExtractName)[0], this.colors.primary[2]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor3.match(CssVariables.RegExtractName)[0], this.colors.primary[3]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor4.match(CssVariables.RegExtractName)[0], this.colors.primary[4]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor5.match(CssVariables.RegExtractName)[0], this.colors.primary[5]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor6.match(CssVariables.RegExtractName)[0], this.colors.primary[6]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor7.match(CssVariables.RegExtractName)[0], this.colors.primary[7]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor8.match(CssVariables.RegExtractName)[0], this.colors.primary[8]);
        document.documentElement.style.setProperty(CssVariables.PrimaryColor9.match(CssVariables.RegExtractName)[0], this.colors.primary[9]);
    }
}
//# sourceMappingURL=ColorDesignSystem.js.map