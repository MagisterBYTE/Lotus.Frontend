import { TElementSize } from '#types';
import { IOption } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { StringHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { ReactElement } from 'react';
import { RenderIcon } from './RenderIcon';
import { HorizontalStack } from '#components/Layout';

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
        return RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase);
      } else
      {
        return <></>;
      }
    } else
    {
      if (Assert.existValue(option.icon))
      {
        if(Boolean(wrapContainer))
        {
          return (<HorizontalStack hAlign='center' vAlign='center' spacing={'xs'}>
            {RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase)}
            <>{option.label}</>
          </HorizontalStack>)
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
      } else
      {
        return <>{option.label}</>;
      }
    }
  }
}
