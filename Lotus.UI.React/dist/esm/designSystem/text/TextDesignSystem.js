import { ColorDesignSystem } from '../colors';
import { CssVariables } from '../сssVariables';
/**
 * Определение данных дизайн-системы для текста
 */
export class TextDesignSystem {
    // #region Const
    /**
     * Стандартные параметры дизайн-системы для текста для светлой темы
     */
    static LightDefault = new TextDesignSystem(ColorDesignSystem.Default.dark[9]);
    /**
     * Стандартные параметры дизайн-системы для текста для темной темы
     */
    static DarkDefault = new TextDesignSystem(ColorDesignSystem.Default.dark[0]);
    // #endregion
    // #region Fields
    /**
     * Цвет текста по умолчанию (зависит от темы)
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
        document.documentElement.style.setProperty(CssVariables.TextColor.match(CssVariables.RegExtractName)[0], this.color);
    }
}
//# sourceMappingURL=TextDesignSystem.js.map