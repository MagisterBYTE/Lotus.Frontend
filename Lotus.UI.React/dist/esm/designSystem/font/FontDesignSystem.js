import { DesignSystemConstants } from '../DesignSystemConstants';
import { CssVariables } from '../сssVariables';
/**
 * Определение данных дизайн-системы для шрифтов
 */
export class FontDesignSystem {
    // #region Const
    /**
     * Стандартные параметры дизайн-системы для шрифтов
     */
    static Default = new FontDesignSystem(DesignSystemConstants.FontDefault, DesignSystemConstants.FontMonospace, DesignSystemConstants.FontAccent);
    // #endregion
    // #region Static methods
    /**
     * Получить значение шрифта через переменную Css
     * @param value Семейство или акцент шрифта
     */
    static getFromCssVariable(value) {
        if (value === undefined)
            return undefined;
        switch (value) {
            case 'default':
                return CssVariables.FontFamily;
            case 'accent':
                return CssVariables.FontFamilyAccent;
            case 'monospace':
                return CssVariables.FontFamilyMonospace;
        }
        return value;
    }
    // #endregion
    // #region Fields
    /**
     * Основной шрифт
     */
    normal;
    /**
     * Моноширинный шрифт
     */
    monospace;
    /**
     * Шрифт для акцента данных
     */
    accent;
    // #endregion
    constructor(normal, monospace, accent) {
        this.normal = normal;
        this.monospace = monospace;
        this.accent = accent;
    }
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
        document.documentElement.style.setProperty(CssVariables.FontFamily.match(CssVariables.RegExtractName)[0], this.normal);
        document.documentElement.style.setProperty(CssVariables.FontFamilyMonospace.match(CssVariables.RegExtractName)[0], this.monospace);
        document.documentElement.style.setProperty(CssVariables.FontFamilyAccent.match(CssVariables.RegExtractName)[0], this.accent);
    }
}
//# sourceMappingURL=FontDesignSystem.js.map