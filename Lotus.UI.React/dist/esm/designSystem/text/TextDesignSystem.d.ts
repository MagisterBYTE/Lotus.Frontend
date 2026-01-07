import { TCssColor } from '#types';
import { IDesignSystemItem } from '../types/DesignSystemItem';
/**
 * Определение данных дизайн-системы для текста
 */
export declare class TextDesignSystem implements IDesignSystemItem {
    /**
     * Стандартные параметры дизайн-системы для текста для светлой темы
     */
    static readonly LightDefault: TextDesignSystem;
    /**
     * Стандартные параметры дизайн-системы для текста для темной темы
     */
    static readonly DarkDefault: TextDesignSystem;
    /**
     * Цвет текста по умолчанию (зависит от темы)
     */
    color: TCssColor;
    constructor(color: TCssColor);
    /**
     * Применить текущие значения к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=TextDesignSystem.d.ts.map