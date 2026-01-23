import { BackgroundDesignSystem } from './background';
import { BorderDesignSystem } from './border';
import { ColorDesignSystem } from './colors';
import { FontDesignSystem } from './font';
import { FontSizes, GapSizes, LineSpacingSizes, MarginSizes, PaddingSizes, RadiusSizes } from './sizes';
import { TextDesignSystem } from './text';
import { TColorScheme } from './types';
/**
 * Дизайн система представляет собой совокупность визуальных настроек
 */
export interface IDesignSystem {
    /**
     * Текущая цветовая схема
     */
    colorScheme: TColorScheme;
    /**
     * Размеры связанные со шрифтами
     */
    fontSizes: FontSizes;
    /**
     * Размеры связанные с межстрочным интервалом
     */
    lineSpacingSizes: LineSpacingSizes;
    /**
     * Размеры связанные с внутренним отступом
     */
    marginSizes: MarginSizes;
    /**
     * Размеры связанные с внешним отступом
     */
    paddingSizes: PaddingSizes;
    /**
     * Размеры связанные с расстоянием между элементами
     */
    gapSizes: GapSizes;
    /**
     * Размеры связанные с радиусом закругления
     */
    radiusSizes: RadiusSizes;
    /**
     * Определение данных дизайн-системы для шрифтов
     */
    font: FontDesignSystem;
    /**
     * Определение данных дизайн-системы для границы
     */
    border: BorderDesignSystem;
    /**
     * Определение данных дизайн-системы для текста
     */
    text: TextDesignSystem;
    /**
     * Определение данных дизайн-системы для фона
     */
    background: BackgroundDesignSystem;
    /**
     * Набор цветов с учетом вариативности без привязки к цветовой схеме
     */
    colors: ColorDesignSystem;
}
/**
 * Дизайн-система представляет собой совокупность визуальных настроек
 */
export declare class DesignSystem implements IDesignSystem {
    /**
     * Текущая цветовая схема
     */
    colorScheme: TColorScheme;
    /**
     * Размеры связанные со шрифтами
     */
    fontSizes: FontSizes;
    /**
     * Размеры связанные с межстрочным интервалом
     */
    lineSpacingSizes: LineSpacingSizes;
    /**
     * Размеры связанные с внутренним отступом
     */
    marginSizes: MarginSizes;
    /**
     * Размеры связанные с внешним отступом
     */
    paddingSizes: PaddingSizes;
    /**
     * Размеры связанные с расстоянием между элементами
     */
    gapSizes: GapSizes;
    /**
     * Размеры связанные с радиусом закругления
     */
    radiusSizes: RadiusSizes;
    /**
     * Определение данных дизайн-системы для шрифтов
     */
    font: FontDesignSystem;
    /**
     * Определение данных дизайн-системы для границы
     */
    border: BorderDesignSystem;
    /**
     * Определение данных дизайн-системы для текста
     */
    text: TextDesignSystem;
    /**
     * Определение данных дизайн-системы для фона
     */
    background: BackgroundDesignSystem;
    /**
     * Набор цветов с учетом вариативности без привязки к цветовой схеме
     */
    colors: ColorDesignSystem;
    constructor(props?: Partial<IDesignSystem>, colorScheme?: TColorScheme);
    /**
     * Применить текущие значения элементов дизайн-системы к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=DesignSystem.d.ts.map