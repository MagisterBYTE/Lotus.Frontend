/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { Assert } from 'lotus-core/utils';
import { ReactElement } from 'react';
import { HorizontalStack } from '#components/Layout';
import { TElementSize } from '#types';
import { RenderIcon } from './RenderIcon';

/**
 * Отрисовка опции
 */
export abstract class RenderOption
{
  /**
   * Отрисовка иконки и контента
   * @param size Размер элемента UI
   * @param option Опция
   * @param context Контекст вызова
   * @param imageDatabase База данных изображений
   * @param wrapContainer Следует ли обвернуть в блок div
   * @returns ReactElement
   */
  // eslint-disable-next-line max-params
  public static renderOption(size: TElementSize, option: IOption, context?: any, imageDatabase?: IImageDatabase, wrapContainer?: boolean): ReactElement
  {
    // 1) Может отрисовать сама
    if (option.render)
    {
      return <>{option.render(option, context)}</>;
    }

    // 2) Пустая label
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
          return (<HorizontalStack hAlign='center' spacing={'xs'} vAlign='center'>
            {RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)}
            <>{option.label}</>
          </HorizontalStack>);
        }
        else
        {
          return (
            <>
              {RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)}
              <>{option.label}</>
            </>
          );
        }
      }
      else
      {
        return <>{option.label}</>;
      }
    }
  }
}
