import { CSSProperties } from 'react';
import { IGeneralBackgroundProperties, IGeneralBorderProperties, IGeneralContainerProperties, IGeneralIconProperties, IGeneralMarginProperties, IGeneralPaddingProperties, IGeneralTextProperties } from '#base';
import { IEffectContextProps, IInteractivityElementProperties, TInteractivityModel } from '#interactivity';
import { TCssProperties } from '#types';
type TLotusCustomProps = keyof IGeneralBackgroundProperties | keyof IGeneralBorderProperties | keyof IGeneralContainerProperties | keyof IGeneralMarginProperties | keyof IGeneralPaddingProperties | keyof IGeneralTextProperties | keyof IGeneralIconProperties;
export declare class CssPropertiesHelper {
    static buildInteractivityElement(model: TInteractivityModel, props: IInteractivityElementProperties, context?: IEffectContextProps): CSSProperties;
    static filterDOMProps<T extends Record<string, any>>(props: T): Omit<T, TLotusCustomProps>;
    static overrideStyleValue<TKey extends keyof CSSProperties>(source: CSSProperties, key: TKey, value: CSSProperties[TKey], override: boolean): void;
    static overrideStyle(source: CSSProperties, override: CSSProperties): void;
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