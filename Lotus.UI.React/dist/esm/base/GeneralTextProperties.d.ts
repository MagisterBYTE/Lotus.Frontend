import { TTextEffect, TCssTextAlign, TCssFontSize, TCssLineHeight, TCssProperties, TFontAccent, TSizeType } from '#types';
/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralTextProperties {
    /**
     * Размер шрифта
     */
    fontSize?: TCssFontSize | TSizeType;
    /**
     * Статус жирного шрифта
     */
    fontBold?: boolean;
    /**
     * Использовать шрифт для акцента внимания
     */
    fontAccent?: TFontAccent;
    /**
     * Тип эффекта для текста
     */
    textEffect?: TTextEffect;
    /**
     * Выравнивание текста по горизонтали внутри блока
     */
    textAlign?: TCssTextAlign;
    /**
     * Использовать гармоничный цвет текста, а не контрастный
     */
    textColorHarmonious?: boolean;
    /**
     * Цвет текста
     */
    textColor?: string;
    /**
     * Межстрочный интервал текста
     */
    textLineSpacing?: TCssLineHeight | TSizeType;
}
/**
 * Вспомогательный класс для работы с общими свойства текста для элемента UI
 */
export declare abstract class TextPropertiesHelper {
    /**
     * Создать свойства CSS по общим свойствам текста в виде TCssProperties
     * @param props Общие свойства текста для элемента UI
     * @returns Свойства CSS по общим свойствам текста в виде TCssProperties
     */
    static createTextProps(props: IGeneralTextProperties): TCssProperties;
}
//# sourceMappingURL=GeneralTextProperties.d.ts.map