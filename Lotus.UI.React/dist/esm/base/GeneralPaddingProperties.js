import { PaddingSizes } from '#designSystem/sizes';
/**
 * Вспомогательный класс для работы с внутренними отступами элемента UI
 */
export class PaddingPropertiesHelper {
    /**
     * Создать свойства CSS по внутреннему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static createPaddingProps(props) {
        const paddingProps = {};
        if (props.p) {
            paddingProps.padding = PaddingSizes.getFromCssVariable(props.p);
        }
        else {
            paddingProps.paddingLeft = PaddingSizes.getFromCssVariable(props.pl);
            paddingProps.paddingRight = PaddingSizes.getFromCssVariable(props.pr);
            paddingProps.paddingTop = PaddingSizes.getFromCssVariable(props.pt);
            paddingProps.paddingBottom = PaddingSizes.getFromCssVariable(props.pb);
        }
        return paddingProps;
    }
}
//# sourceMappingURL=GeneralPaddingProperties.js.map