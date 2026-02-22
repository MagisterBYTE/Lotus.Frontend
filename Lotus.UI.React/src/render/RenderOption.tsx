import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { Assert } from 'lotus-core/utils';
import { ReactElement } from 'react';
import { Text } from '#components/Display';
import { HorizontalStack, IHorizontalStackProps } from '#components/Layout';
import { TSizeType, TSizeTypes } from '#types';
import { RenderIcon } from './RenderIcon';

/**
 * Вспомогательный класс для отрисовки опции
 */
export abstract class RenderOption 
{
  /**
   * Отрисовка иконки и контента опции
   * @param size Размер элемента UI
   * @param option Опция
   * @param imageDatabase База данных изображений
   * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
   * @returns ReactElement
   */
  public static renderOption(size: TSizeType, option: IOption, imageDatabase?: IImageDatabase, wrapContainer?: IHorizontalStackProps): ReactElement 
  {
    if (StringHelper.isNullOrEmpty(option.label)) 
    {
      if (Assert.existValue(option.icon)) 
      {
        return RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)!;
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
              {RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)}
              <Text disabled={option.disabled} fontSize={size}>
                {option.label}
              </Text>
            </HorizontalStack>
          );
        }
        else 
        {
          return (
            <>
              {RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)}
              <Text disabled={option.disabled} fontSize={size}>
                {option.label}
              </Text>
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
              <Text disabled={option.disabled} fontSize={size}>
                {option.label}
              </Text>
            </HorizontalStack>
          );
        }
        else 
        {
          return (
            <Text disabled={option.disabled} fontSize={size}>
              {option.label}
            </Text>
          );
        }
      }
    }
  }
}
