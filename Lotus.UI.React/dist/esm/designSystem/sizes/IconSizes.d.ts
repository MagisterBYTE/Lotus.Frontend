import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные c иконкой
 */
export declare class IconSizes extends SizeDimensions {
    /**
     * Стандартные размеры иконок
     */
    static readonly Default: IconSizes;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=IconSizes.d.ts.map