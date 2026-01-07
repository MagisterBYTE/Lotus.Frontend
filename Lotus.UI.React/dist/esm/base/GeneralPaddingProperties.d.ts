import { TCssPadding, TCssProperties, TSizeType } from '#types';
/**
 * Общие свойства внутренних отступов элемента UI
 */
export interface IGeneralPaddingProperties {
    /**
     * Внутренний отступ
     */
    p?: TCssPadding | TSizeType;
    /**
     * Внутренний отступ слева
     */
    pl?: TCssPadding | TSizeType;
    /**
     * Внутренний отступ сверху
     */
    pt?: TCssPadding | TSizeType;
    /**
     * Внутренний отступ справа
     */
    pr?: TCssPadding | TSizeType;
    /**
     * Внутренний отступ снизу
     */
    pb?: TCssPadding | TSizeType;
}
/**
 * Вспомогательный класс для работы с внутренними отступами элемента UI
 */
export declare abstract class PaddingPropertiesHelper {
    /**
     * Создать свойства CSS по внутреннему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static createPaddingProps(props: IGeneralPaddingProperties): TCssProperties;
}
//# sourceMappingURL=GeneralPaddingProperties.d.ts.map