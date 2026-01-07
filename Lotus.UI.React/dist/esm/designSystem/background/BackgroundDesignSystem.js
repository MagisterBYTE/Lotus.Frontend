import { ColorDesignSystem } from '../colors';
import { CssVariables } from '../сssVariables';
/**
 * Определение данных дизайн-системы для фона
 */
export class BackgroundDesignSystem {
    // #region Const
    /**
     * Стандартные параметры дизайн-системы для фона для светлой темы
     */
    static LightDefault = new BackgroundDesignSystem('white');
    /**
     * Стандартные параметры дизайн-системы для фона для темной темы
     */
    static DarkDefault = new BackgroundDesignSystem(ColorDesignSystem.Default.dark[8]);
    // #endregion
    // #region Fields
    /**
     * Цвет фона по умолчанию (зависит от темы)
     */
    color;
    // #endregion
    constructor(color) {
        this.color = color;
    }
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
        document.documentElement.style.setProperty(CssVariables.BackgroundColor.match(CssVariables.RegExtractName)[0], this.color);
    }
}
//# sourceMappingURL=BackgroundDesignSystem.js.map