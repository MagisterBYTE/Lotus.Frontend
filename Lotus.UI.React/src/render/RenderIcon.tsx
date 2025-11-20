import { CssSizerHelper } from '#helpers';
import { ThemeInstance } from '#theme';
import { TThemeColor } from '#theme/types';
import { TElementSize } from '#types';
import { IImageDatabase } from 'lotus-core/resources/image';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';

/**
 * Отрисовка иконки
 */
export abstract class RenderIcon
{
  /**
   * Отрисовка иконки и контента
   * @param size Размер элемента UI
   * @param icon Данные иконки
   * @param other Другие данные
   * @param iconStyle Стиль иконки
   * @param iconColor Цвет иконки (влияет только на векторные)
   * @param imageDatabase База данных изображений
   * @param wrapDiv Следует ли обвернуть в блок div
   * @returns ReactElement
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static renderIcon(size: TElementSize, icon:any, other?:ReactNode, iconStyle?:CSSProperties, 
    iconColor?: TThemeColor, imageDatabase?:IImageDatabase, wrapDiv?: boolean, wrapDivStyle?:CSSProperties):ReactElement
  {
    const iconColorText = (iconColor !== undefined) ? ThemeInstance.getElementColor(iconColor)?.toCSSRgbValue() : undefined;

    // Если строка
    if (typeof icon === 'string')
    {
      const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;
      if(other)
      {
        if(wrapDiv)
        {
          return <div style={wrapDivStyle}>
            <img src={icon} width={sizeIcon} height={sizeIcon} style={iconStyle} />
            {other}
          </div>
        }
        else
        {
          return <>
            <img src={icon} width={sizeIcon} height={sizeIcon} style={iconStyle} />
            {other}
          </>
        }
      }
      else
      {
        return <img src={icon} width={sizeIcon} height={sizeIcon} style={iconStyle} />
      }
    }

    // Если это число есть база данных
    if(typeof icon === 'number' && imageDatabase)
    {
      const iconData = imageDatabase.getImageByIdOrName(icon);
      
      if(iconData)
      {
        const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;

        if(other)
        {
          if(wrapDiv)
          {
            return <div style={wrapDivStyle}>
              <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={iconStyle} />
              {other}
            </div>
          }
          else
          {
            return <>
              <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={iconStyle} />
              {other}
            </>
          }
        }
        else
        {
          return <img src={iconData.source} width={sizeIcon} height={sizeIcon} style={iconStyle} />
        }
      }

      return <></>;
    }

    // Это иконка React
    else
    {
      const sizeIcon = `${CssSizerHelper.convertSizeToIconInRem(size)}rem`;
      if(other)
      {
        if(wrapDiv)
        {
          return <div style={wrapDivStyle}>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle}} >
              {icon}
            </IconContext.Provider>
            {other}
          </div>
        }
        else
        {
          return <>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle}} >
              {icon}
            </IconContext.Provider>
            {other}
          </>
        }
      }
      else
      {
        return <IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle}}>
          {icon}
        </IconContext.Provider>
      }
    }
  }
}