import { ComponentPropsWithRef } from 'react';
import { IGeneralContainerProperties } from '#base';
export interface IBlockValueProps extends IGeneralContainerProperties, ComponentPropsWithRef<'div'> {
    /**
     * Название свойства
     */
    label: React.ReactNode;
    /**
     * Значение свойства
     */
    value: React.ReactNode;
    /**
     * Цвет акцента (для левой границы и заголовка)
     */
    accentColor?: string;
    /**
     * Дополнительные стили для значения
     */
    valueStyle?: React.CSSProperties;
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