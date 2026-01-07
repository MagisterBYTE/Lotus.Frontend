import { TCssFontFamily, TFontAccent } from '#types';
import { IDesignSystemItem } from '../types/DesignSystemItem';
/**
 * Определение данных дизайн-системы для шрифтов
 */
export declare class FontDesignSystem implements IDesignSystemItem {
    /**
     * Стандартные параметры дизайн-системы для шрифтов
     */
    static readonly Default: FontDesignSystem;
    /**
     * Получить значение шрифта через переменную Css
     * @param value Семейство или акцент шрифта
     */
    static getFromCssVariable(value?: TCssFontFamily | TFontAccent): TCssFontFamily | undefined;
    /**
     * Основной шрифт
     */
    normal: TCssFontFamily;
    /**
     * Моноширинный шрифт
     */
    monospace: TCssFontFamily;
    /**
     * Шрифт для акцента данных
     */
    accent: TCssFontFamily;
    constructor(normal: TCssFontFamily, monospace: TCssFontFamily, accent: TCssFontFamily);
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=FontDesignSystem.d.ts.map