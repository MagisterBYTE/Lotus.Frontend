import { ActionIconProps, ButtonProps, MenuItemProps, NavLinkProps } from '@mantine/core';
import { BaseActionCommand } from 'lotus-core/modules/actionCommand';
import { TElementSize } from '#types';
/**
 * Базовый интерфейс с общими свойствами
 */
interface ICommandElementBaseProps {
    /**
     * Размер элемента
     */
    size?: TElementSize;
    /**
     * Команда
     */
    command: BaseActionCommand;
}
export type ICommandElementProps = (ICommandElementBaseProps & {
    elementType: 'icon';
} & ActionIconProps) | (ICommandElementBaseProps & {
    elementType: 'button';
} & ButtonProps) | (ICommandElementBaseProps & {
    elementType: 'listItem';
} & NavLinkProps) | (ICommandElementBaseProps & {
    elementType: 'menuItem';
} & MenuItemProps);
export declare function CommandElement(props: ICommandElementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CommandElement.d.ts.map