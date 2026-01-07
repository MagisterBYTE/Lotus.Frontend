import { TColorToken } from 'lotus-core/modules/color';
import { ComponentPropsWithRef } from 'react';
import { IGeneralContainerProperties, IGeneralTextProperties } from '#base';
import { TCssBackgroundColor } from '#types';
export interface ITextProps extends IGeneralContainerProperties, IGeneralTextProperties, ComponentPropsWithRef<'div'> {
    /**
     * Блоковый или строчный элемент
     */
    isBlock?: boolean;
    /**
     * Если указан цвет, показывать как badge
     */
    asBadge?: TCssBackgroundColor | TColorToken;
}
export declare function Text(props: ITextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Text.d.ts.map