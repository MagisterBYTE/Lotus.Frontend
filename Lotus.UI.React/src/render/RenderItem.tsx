/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionHelper } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { TSizeType } from '#types';
import { RenderOption } from './RenderOption';

/**
 * Отрисовка объекта как опции
 */
export abstract class RenderItem
{
  /**
   * Отрисовка иконки и контента
   * @param size Размер элемента UI
   * @param item Объект
   * @param context Контекст вызова
   * @param imageDatabase База данных изображений
   * @param wrapContainer Следует ли обвернуть в блок div
   * @returns ReactElement
   */
  // eslint-disable-next-line max-params
  public static renderItem(size: TSizeType, item: any, context?: any, imageDatabase?: IImageDatabase, wrapContainer?: boolean): ReactElement
  {
    if (OptionHelper.instanceOfOption(item))
    {
      return RenderOption.renderOption(size, item, context, imageDatabase, wrapContainer);
    }
    
 
    return <></>;
  }
}
