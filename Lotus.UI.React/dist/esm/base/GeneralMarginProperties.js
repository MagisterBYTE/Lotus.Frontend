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
        const { m, mt, mr, mb, ml } = props;
        if (!m && !mt && !mr && !mb && !ml) {
            return {};
        }
        const getValue = (specific) => {
            const value = specific ?? m;
            return value ? MarginSizes.getFromCssVariable(value) : '0';
        };
        const top = getValue(mt);
        const right = getValue(mr);
        const bottom = getValue(mb);
        const left = getValue(ml);
        // Логика сокращения (Shorthand)
        let marginValue;
        if (top === right && right === bottom && bottom === left) {
            // Все стороны равны: margin: 10px;
            marginValue = top;
        }
        else if (top === bottom && right === left) {
            // Пары верх-низ и право-лево равны: margin: 10px 20px;
            marginValue = `${top} ${right}`;
        }
        else if (right === left) {
            // Право и лево равны: margin: 10px 20px 15px;
            marginValue = `${top} ${right} ${bottom}`;
        }
        else {
            // Все разные: margin: 10px 20px 15px 5px;
            marginValue = `${top} ${right} ${bottom} ${left}`;
        }
        return { margin: marginValue };
    }
}
//# sourceMappingURL=GeneralMarginProperties.js.map