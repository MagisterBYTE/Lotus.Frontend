import { TColorToken } from 'lotus-core/modules/color';
import { ComponentPropsWithRef } from 'react';
import { IGeneralContainerProperties } from '#base';
import { TCssColor, TSizeType } from '#types';
import { ILabelProps } from '../Label';
export interface IBlockValueProps extends IGeneralContainerProperties, ComponentPropsWithRef<'div'> {
    /**
     * Размер элемента
     */
    size?: TSizeType;
    /**
     * Название свойства
     */
    label: React.ReactNode;
    /**
     * Пропсы для надписи
     */
    labelProps?: ILabelProps;
    /**
     * Значение свойства
     */
    value: React.ReactNode;
    /**
     * Пропсы для надписи
     */
    valueProps?: ILabelProps;
    /**
     * Цвет акцента (для левой границы и заголовка)
     */
    accentColor?: TCssColor | TColorToken;
    /**
     * Цвет акцента фона
     */
    accentBackground?: boolean;
    /**
     * Если true, показывать как badge
     */
    asBadge?: boolean;
    /**
     * Если true, использовать моноширинный шрифт для значения
     */
    monospaceValue?: boolean;
}
export declare function BlockValue(props: IBlockValueProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BlockValue.d.ts.map