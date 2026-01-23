import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionIcon, Button, Menu, NavLink } from '@mantine/core';
import { TActionCommandTypes } from 'lotus-core/modules/actionCommand';
import { Assert } from 'lotus-core/utils';
import { useLocation, useNavigate } from 'react-router';
import { RenderIcon } from '#render';
export function CommandElement(props) {
    const { size = 'md', elementType, command, ...propsComponent } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const isSelected = command.isSelectedCommand();
    const disabled = !command.canExecuteCommand();
    const isDelimiter = command.commandType === TActionCommandTypes.Delimiter;
    const handleClick = () => {
        if (command) {
            if (command.commandType === TActionCommandTypes.Navigation) {
                if (command.route.path !== '' && location.pathname !== command.route.path) {
                    void navigate(command.route.path);
                }
            }
            else {
                command.executeCommand();
            }
        }
    };
    const renderLabel = () => {
        if (command.label && Assert.isString(command.label)) {
            return command.label;
        }
        if (command.label && Assert.isFunction(command.label)) {
            return command.label(command);
        }
        return undefined;
    };
    switch (elementType) {
        case 'icon': {
            const actionIconProps = propsComponent;
            return (_jsx(ActionIcon, { ...actionIconProps, disabled: actionIconProps.disabled ?? disabled, size: actionIconProps.size ?? size, onClick: handleClick, children: RenderIcon.renderIcon(size, command.icon) }));
        }
        case 'button': {
            const buttonProps = propsComponent;
            return (_jsx(Button, { ...buttonProps, disabled: buttonProps.disabled ?? disabled, leftSection: RenderIcon.renderIcon(size, command.icon), size: buttonProps.size ?? size, onClick: handleClick, children: renderLabel() }));
        }
        case 'listItem': {
            const navLinkProps = propsComponent;
            return (_jsx(NavLink, { ...navLinkProps, active: navLinkProps.active ?? isSelected, disabled: navLinkProps.disabled ?? disabled, leftSection: RenderIcon.renderIcon(size, command.icon), onClick: handleClick, children: renderLabel() }));
        }
        case 'menuItem': {
            if (isDelimiter) {
                return _jsx(Menu.Divider, {});
            }
            const menuItemProps = propsComponent;
            return (_jsx(Menu.Item, { ...menuItemProps, disabled: menuItemProps.disabled ?? disabled, leftSection: RenderIcon.renderIcon(size, command.icon), onClick: handleClick, children: renderLabel() }));
        }
    }
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=CommandElement.js.map