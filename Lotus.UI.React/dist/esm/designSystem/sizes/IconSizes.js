import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные c иконкой
 */
export class IconSizes extends SizeDimensions {
    // #region Const
    /**
     * Стандартные размеры иконок
     */
    static Default = new IconSizes(12, 15, 20, 24, 32, 40, 48);
    // #endregion
    // eslint-disable-next-line max-params, @typescript-eslint/no-useless-constructor
    constructor(xxs, xs, sm, md, lg, xl, xxl) {
        super(xxs, xs, sm, md, lg, xl, xxl);
    }
    /**
     * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
    }
}
//# sourceMappingURL=IconSizes.js.map