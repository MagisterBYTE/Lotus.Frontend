import { TElementSize } from '#types';

export class CssSizerHelper
{
  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в rem
   */
  public static convertSizeToIconInRem(size?: TElementSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'xs': return 10 / 16 * 1.5;
        case 'sm': return 13 / 16 * 1.5;
        case 'md': return 1.5;
        case 'lg': return 19 / 16 * 1.5;
        case 'xl': return 24 / 16 * 1.5;
      }
    }

    return 1.5;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в пикселях
   */
  public static convertSizeToIconInPixel(size?: TElementSize): number
  {
    if (size)
    {
      switch (size)
      {
        case 'xs': return 10  * 1.5;
        case 'sm': return 13  * 1.5;
        case 'md': return 16 * 1.5;
        case 'lg': return 19 * 1.5;
        case 'xl': return 24 * 1.5;
      }
    }

    return 16 * 1.5;
  }
}