import { TCssBorderColor, TCssBorderRadius, TCssBorderWidth } from '#types';
import { IDesignSystemItem } from '../types/DesignSystemItem';
/**
 * Определение данных дизайн-системы для границы
 */
export declare class BorderDesignSystem implements IDesignSystemItem {
    /**
     * Стандартные параметры дизайн-системы для границы для светлой темы
     */
    static readonly LightDefault: BorderDesignSystem;
    /**
     * Стандартные параметры дизайн-системы для границы для темной темы
     */
    static readonly DarkDefault: BorderDesignSystem;
    /**
     * Размер радиуса границы по умолчанию
     */
    radius: TCssBorderRadius;
    /**
     * Размер толщины границы по умолчанию
     */
    width: TCssBorderWidth;
    /**
     * Цвет границы по умолчанию (зависит от темы)
     */
    color: TCssBorderColor;
    /**
     * Цвет тени границы по умолчанию (зависит от темы)
     */
    shadowColor: TCssBorderColor;
    constructor(radius: TCssBorderRadius, width: TCssBorderWidth, color: TCssBorderColor, shadowColor: TCssBorderColor);
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=BorderDesignSystem.d.ts.map