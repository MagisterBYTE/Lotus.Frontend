import { ColorDesignSystem } from '../colors';
import { CssVariables } from '../сssVariables';
/**
 * Определение данных дизайн-системы для границы
 */
export class BorderDesignSystem {
    // #region Const
    /**
     * Стандартные параметры дизайн-системы для границы для светлой темы
     */
    static LightDefault = new BorderDesignSystem('0.25rem', 'thin', ColorDesignSystem.LightDefault.colors.gray[4], ColorDesignSystem.LightDefault.colors.gray[4]);
    /**
     * Стандартные параметры дизайн-системы для границы для темной темы
     */
    static DarkDefault = new BorderDesignSystem('0.25rem', 'thin', ColorDesignSystem.LightDefault.colors.dark[4], ColorDesignSystem.LightDefault.colors.dark[4]);
    // #endregion
    // #region Fields
    /**
     * Размер радиуса границы по умолчанию
     */
    radius;
    /**
     * Размер толщины границы по умолчанию
     */
    width;
    /**
     * Цвет границы по умолчанию (зависит от темы)
     */
    color;
    /**
     * Цвет тени границы по умолчанию (зависит от темы)
     */
    shadowColor;
    // #endregion
    constructor(radius, width, color, shadowColor) {
        this.radius = radius;
        this.width = width;
        this.color = color;
        this.shadowColor = shadowColor;
    }
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
        document.documentElement.style.setProperty(CssVariables.BorderColor.match(CssVariables.RegExtractName)[0], this.color);
        document.documentElement.style.setProperty(CssVariables.BorderShadowColor.match(CssVariables.RegExtractName)[0], this.shadowColor);
        document.documentElement.style.setProperty(CssVariables.BorderWidth.match(CssVariables.RegExtractName)[0], this.width.toString());
        document.documentElement.style.setProperty(CssVariables.BorderRadius.match(CssVariables.RegExtractName)[0], this.radius.toString());
    }
}
//# sourceMappingURL=BorderDesignSystem.js.map