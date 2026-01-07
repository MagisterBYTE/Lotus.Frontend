import { TCssBackgroundColor } from '#types';
import { IDesignSystemItem } from '../types/DesignSystemItem';
/**
 * Определение данных дизайн-системы для фона
 */
export declare class BackgroundDesignSystem implements IDesignSystemItem {
    /**
     * Стандартные параметры дизайн-системы для фона для светлой темы
     */
    static readonly LightDefault: BackgroundDesignSystem;
    /**
     * Стандартные параметры дизайн-системы для фона для темной темы
     */
    static readonly DarkDefault: BackgroundDesignSystem;
    /**
     * Цвет фона по умолчанию (зависит от темы)
     */
    color: TCssBackgroundColor;
    constructor(color: TCssBackgroundColor);
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=BackgroundDesignSystem.d.ts.map