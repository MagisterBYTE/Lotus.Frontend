import { ActionIcon, ActionIconProps, Button, ButtonProps, Menu, MenuItemProps, NavLink, NavLinkProps } from '@mantine/core';
import { TActionCommandTypes, BaseActionCommand } from 'lotus-core/modules/actionCommand';
import { IImageDatabase } from 'lotus-core/resources/image';
import { Assert } from 'lotus-core/utils';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { RenderIcon } from '#render';
import { TSizeType } from '#types';
import { TCommandElementTypes } from './CommandElementType';

/**
 * Базовый интерфейс с общими свойствами
 */
interface ICommandElementBaseProps
{
  /**
   * Размер элемента
   */
  size?: TSizeType;

  /**
   * Команда
   */
  command: BaseActionCommand;

  /**
   * База данных изображений
   */
  imageDatabase?: IImageDatabase;
}

export type ICommandElementProps =
  | (ICommandElementBaseProps & {
    elementType: 'icon';
  } & ActionIconProps)
  | (ICommandElementBaseProps & {
    elementType: 'button';
  } & ButtonProps)
  | (ICommandElementBaseProps & {
    elementType: 'listItem';
  } & NavLinkProps)
  | (ICommandElementBaseProps & {
    elementType: 'menuItem';
  } & MenuItemProps);

export function CommandElement(props: ICommandElementProps) 
{
  const { size = 'md', elementType, command, imageDatabase, ...propsComponent } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const isSelected = command.isSelectedCommand();
  const disabled = !command.canExecuteCommand();
  const isDelimiter = command.commandType === TActionCommandTypes.Delimiter;

  const handleClick = () => 
  {
    if (command) 
    {
      if (command.commandType === TActionCommandTypes.Navigation) 
      {
        if (command.route!.path !== '' && location.pathname !== command.route!.path) 
        {
          void navigate(command.route!.path);
        }
      }
      else 
      {
        command.executeCommand();
      }
    }
  };

  const renderLabel = (): ReactNode => 
  {
    if (command.label && Assert.isString(command.label)) 
    {
      return command.label;
    }
    if (command.label && Assert.isFunction(command.label)) 
    {
      return command.label(command) as ReactNode;
    }

    return undefined;
  };

  switch (elementType) 
  {
    case TCommandElementTypes.Icon: {
      const actionIconProps = propsComponent as ActionIconProps;
      return (
        <ActionIcon {...actionIconProps} disabled={actionIconProps.disabled ?? disabled} size={actionIconProps.size ?? size} onClick={handleClick}>
          {RenderIcon.renderIcon(size, command.icon, undefined, undefined, undefined, imageDatabase)}
        </ActionIcon>
      );
    }
    case TCommandElementTypes.Button: {
      const buttonProps = propsComponent as ButtonProps;
      return (
        <Button {...buttonProps} disabled={buttonProps.disabled ?? disabled}
          leftSection={RenderIcon.renderIcon(size, command.icon, undefined, undefined, undefined, imageDatabase)} size={buttonProps.size ?? size} onClick={handleClick}>
          {renderLabel()}
        </Button>
      );
    }
    case TCommandElementTypes.ListItem: {
      const navLinkProps = propsComponent as NavLinkProps;
      return (
        <NavLink {...navLinkProps} active={navLinkProps.active ?? isSelected}
          disabled={navLinkProps.disabled ?? disabled}
          leftSection={RenderIcon.renderIcon(size, command.icon, undefined, undefined, undefined, imageDatabase)}
          onClick={handleClick}>
          {renderLabel()}
        </NavLink>
      );
    }
    case TCommandElementTypes.MenuItem: {
      if (isDelimiter)
      {
        return <Menu.Divider />;
      }

      const menuItemProps = propsComponent as MenuItemProps;
      return (
        <Menu.Item {...menuItemProps}
          disabled={menuItemProps.disabled ?? disabled}
          leftSection={RenderIcon.renderIcon(size, command.icon, undefined, undefined, undefined, imageDatabase)}
          onClick={handleClick}>
          {renderLabel()}
        </Menu.Item>
      );
    }
  }
  return <></>;
}
