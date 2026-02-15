/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionHelper } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
import { RenderOption } from './RenderOption';

/**
 * Вспомогательный класс для отрисовки произвольного объекта
 */
export abstract class RenderItem
{
  /**
   * Отрисовка произвольного элемента
   * @param size Размер элемента UI
   * @param item Объект
   * @param imageDatabase База данных изображений
   * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
   * @returns ReactElement
   */
  public static renderItem(size: TSizeType, item: any, imageDatabase?: IImageDatabase, wrapContainer?: IHorizontalStackProps): ReactElement
  {
    if (OptionHelper.instanceOfOption(item))
    {
      return RenderOption.renderOption(size, item, imageDatabase, wrapContainer);
    }
    
    return <></>;
  }
}
