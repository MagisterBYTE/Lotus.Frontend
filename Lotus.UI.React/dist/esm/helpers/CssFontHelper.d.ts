import { IGeneralTextProperties } from '#base';
import { TCssProperties, TTextEffect, TCssTextAlign, TCssFontSize, TFontSize, TCssLineHeight, TLineSpacing } from '#types';
export declare abstract class CssFontHelper {
    /**
     * Заполнить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства текста для элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static fillFontProps(style: TCssProperties, props: IGeneralTextProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param props Общие свойства текста для элемента UI
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontProps(props: IGeneralTextProperties): TCssProperties;
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param size Размер шрифта/элемента
     * @param isBold Жирный шрифт
     * @param isFontAccent  Использовать шрифт для акцента внимания
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontPropsBy(size?: TCssFontSize | TFontSize, isBold?: boolean, isFontAccent?: boolean): TCssProperties;
    /**
     * Получить значение свойства CSS по размеру шрифта в виде TCssFontSize
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по размеру шрифта в виде TCssFontSize
     */
    static getFontSizePropsValue(value?: TCssFontSize | TFontSize): TCssFontSize | undefined;
    /**
     * Конвертирует значение размера шрифта в пиксели
     * @param fontSize - размер шрифта в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    static getFontSizeInPixels(fontSize: TCssFontSize | TFontSize): number;
    /**
     * Получает корневой размер шрифта (font-size) документа
     * @returns число - размер шрифта html элемента в пикселях
     */
    static getRootFontSize(): number;
    /**
     * Заполнить свойства CSS по эффектам текста в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства текста для элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static fillTextEffect(style: TCssProperties, props: IGeneralTextProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param props Общие свойства текста для элемента UI
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectProps(props: IGeneralTextProperties): TCssProperties;
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param size Размер шрифта/элемента
     * @param effect Эффекты текста
     * @param textAlign Выравнивание текста по горизонтали внутри блока
     * @param textLineSpacing Межстрочный интервал текста
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectPropsBy(size?: TFontSize | TCssFontSize, effect?: TTextEffect, textAlign?: TCssTextAlign, textLineSpacing?: TCssLineHeight | TLineSpacing): TCssProperties;
    /**
     * Получить значение свойства CSS по межстрочному интервалу текста в виде TLineSpacing
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по межстрочному интервалу текста в виде TLineSpacing
     */
    static getLineSpacingPropsValue(value?: TCssLineHeight | TLineSpacing): TCssLineHeight | undefined;
}
//# sourceMappingURL=CssFontHelper.d.ts.map