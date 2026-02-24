import { IOption } from 'lotus-core/modules/option';
import { Assert } from 'lotus-core/utils';
import { memo } from 'react';
import { IGeneralIconProperties } from '#base';
import { HorizontalStack, IHorizontalStackProps } from '#components/Layout';
import { TSizeType, TSizeTypes } from '#types';
import { Icon } from '../Icon';
import { Span } from '../Span';

export interface IOptionProps extends IGeneralIconProperties {
  /**
   * Опция
   */
  option: IOption;

  /**
   * Размер элемента UI
   */
  size?: TSizeType;

  /**
   * Следует ли обвернуть в горизонтальный контейнер
   */
  wrapContainer?: IHorizontalStackProps,
}

export const Option = memo((props: IOptionProps) => 
{
  const { option, size = 'md', wrapContainer, ...iconProps } = props;

  if (Assert.emptyValue(option.label)) 
  {
    if (Assert.existValue(option.icon)) 
    {
      return <Icon {...iconProps} icon={option.icon} iconSize={size} />;
    }
    else 
    {
      return <></>;
    }
  }
  else 
  {
    if (Assert.existValue(option.icon)) 
    {
      if (wrapContainer) 
      {
        return (
          <HorizontalStack
            {...wrapContainer}
            hAlign={wrapContainer.hAlign ?? 'flex-start'}
            spacing={TSizeTypes.clamp(size, 'xs', 'lg')}
            vAlign={wrapContainer.vAlign ?? 'center'}
          >
            <Icon {...iconProps} icon={option.icon} iconSize={size} />
            <Span disabled={option.disabled} fontSize={size} text={option.label} />

          </HorizontalStack>
        );
      }
      else 
      {
        return (
          <>
            <Icon {...iconProps} icon={option.icon} iconSize={size} />
            <Span disabled={option.disabled} fontSize={size} text={option.label} />
          </>
        );
      }
    }
    else 
    {
      if (wrapContainer) 
      {
        return (
          <HorizontalStack
            {...wrapContainer}
            hAlign={wrapContainer.hAlign ?? 'flex-start'}
            spacing={TSizeTypes.clamp(size, 'xs', 'lg')}
            vAlign={wrapContainer.vAlign ?? 'center'}
          >
            <Span disabled={option.disabled} fontSize={size} text={option.label} />
          </HorizontalStack>
        );
      }
      else 
      {
        return <Span disabled={option.disabled} fontSize={size} text={option.label} />;
      }
    }
  }
});

// Назначаем имя для отладки в DevTools
Option.displayName = 'Option';
