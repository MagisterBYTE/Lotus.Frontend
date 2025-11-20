import { IGeneralBackgroundProperties, IGeneralBorderProperties, IGeneralContainerProperties, IGeneralMarginProperties, IGeneralPaddingProperties, IGeneralTextProperties } from '#base';
import { TControlSize, TCssProperties, TTextEffect, TCssTextAlign } from '#types';
import { CSSProperties } from 'react';
type TLotusCustomProps = keyof IGeneralBackgroundProperties | keyof IGeneralBorderProperties | keyof IGeneralContainerProperties | keyof IGeneralMarginProperties | keyof IGeneralPaddingProperties | keyof IGeneralTextProperties;
export declare class CssPropertiesHelper {
    static filterDOMProps<T extends Record<string, any>>(props: T): Omit<T, TLotusCustomProps>;
    static overrideStyleValue<TKey extends keyof CSSProperties>(source: CSSProperties, key: TKey, value: CSSProperties[TKey], override: boolean): void;
    static overrideStyle(source: CSSProperties, override: CSSProperties): void;
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param size Размере элемента UI
     * @param isBold Жирный шрифт
     * @param isFontAccent  Использовать шрифт для акцента внимания
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontProps(size?: TControlSize, isBold?: boolean, isFontAccent?: boolean): TCssProperties;
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param size Размере элемента UI
     * @param effect Эффекты текста
     * @param textAlign Выравнивание текста по горизонтали внутри блока
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectProps(size?: TControlSize, effect?: TTextEffect, textAlign?: TCssTextAlign): TCssProperties;
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps(): TCssProperties;
    /**
     * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
     * @param scale Масштаб
     * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
     */
    static getTransformScaleProps(scale?: number): TCssProperties;
}
export {};
//# sourceMappingURL=CssPropertiesHelper.d.ts.map