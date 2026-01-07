import { MarginSizes } from '#designSystem/sizes';
/**
 * Вспомогательный класс для работы с внешними отступами элемента UI
 */
export class MarginPropertiesHelper {
    /**
     * Создать свойства CSS по внешнему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static createMarginProps(props) {
        const marginProps = {};
        if (props.m) {
            marginProps.margin = MarginSizes.getFromCssVariable(props.m);
        }
        else {
            marginProps.marginLeft = MarginSizes.getFromCssVariable(props.ml);
            marginProps.marginRight = MarginSizes.getFromCssVariable(props.mr);
            marginProps.marginTop = MarginSizes.getFromCssVariable(props.mt);
            marginProps.marginBottom = MarginSizes.getFromCssVariable(props.mb);
        }
        return marginProps;
    }
}
//# sourceMappingURL=GeneralMarginProperties.js.map