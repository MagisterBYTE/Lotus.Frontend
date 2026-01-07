import { TCssPadding, TCssProperties, TSizeType } from '#types';
/**
 * Общие свойства внешних отступов элемента UI
 */
export interface IGeneralMarginProperties {
    /**
     * Внешний отступ
     */
    m?: TCssPadding | TSizeType;
    /**
     * Внешний отступ слева
     */
    ml?: TCssPadding | TSizeType;
    /**
     * Внешний отступ сверху
     */
    mt?: TCssPadding | TSizeType;
    /**
     * Внешний отступ справа
     */
    mr?: TCssPadding | TSizeType;
    /**
     * Внешний отступ снизу
     */
    mb?: TCssPadding | TSizeType;
}
/**
 * Вспомогательный класс для работы с внешними отступами элемента UI
 */
export declare abstract class MarginPropertiesHelper {
    /**
     * Создать свойства CSS по внешнему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static createMarginProps(props: IGeneralMarginProperties): TCssProperties;
}
//# sourceMappingURL=GeneralMarginProperties.d.ts.map