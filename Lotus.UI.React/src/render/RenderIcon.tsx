/* eslint-disable jsx-a11y/alt-text */
import { IImageDatabase } from 'lotus-core/resources/image';
import { Assert } from 'lotus-core/utils';
import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { CssSizerHelper } from '#helpers';
import { ThemeInstance } from '#theme';
import { TThemeColor } from '#theme/types';
import { TElementSize } from '#types';


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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-params
  public static renderIcon(size: TElementSize, icon:any, other?:ReactNode, iconStyle?:CSSProperties, 
    iconColor?: TThemeColor, imageDatabase?:IImageDatabase, wrapDiv?: boolean, wrapDivStyle?:CSSProperties):ReactElement|undefined
  {
    if (Assert.emptyValue(icon)) return undefined;

    const iconColorText = (iconColor !== undefined) ? ThemeInstance.getElementColor(iconColor)?.toCSSRgbValue() : undefined;

    // Если строка
    if (typeof icon === 'string')
    {
      const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;
      if (other)
      {
        if (wrapDiv)
        {
          return (<div style={wrapDivStyle}>
            <img height={sizeIcon} src={icon} style={iconStyle} width={sizeIcon} />
            {other}
          </div>);
        }
        else
        {
          return (<>
            <img height={sizeIcon} src={icon} style={iconStyle} width={sizeIcon} />
            {other}
          </>);
        }
      }
      else
      {
        return <img height={sizeIcon} src={icon} style={iconStyle} width={sizeIcon} />;
      }
    }

    // Если это число есть база данных
    if (typeof icon === 'number' && imageDatabase)
    {
      const iconData = imageDatabase.getImageByIdOrName(icon);
      
      if (iconData)
      {
        const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;

        if (other)
        {
          if (wrapDiv)
          {
            return (<div style={wrapDivStyle}>
              <img height={sizeIcon} src={iconData.source} style={iconStyle} width={sizeIcon} />
              {other}
            </div>);
          }
          else
          {
            return (<>
              <img height={sizeIcon} src={iconData.source} style={iconStyle} width={sizeIcon} />
              {other}
            </>);
          }
        }
        else
        {
          return <img height={sizeIcon} src={iconData.source} style={iconStyle} width={sizeIcon} />;
        }
      }

      return <></>;
    }

    // Это иконка React
    else
    {
      const sizeIcon = `${CssSizerHelper.convertSizeToIconInRem(size)}rem`;
      if (other)
      {
        if (wrapDiv)
        {
          return (<div style={wrapDivStyle}>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle }}>
              {icon}
            </IconContext.Provider>
            {other}
          </div>);
        }
        else
        {
          return (<>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle }}>
              {icon}
            </IconContext.Provider>
            {other}
          </>);
        }
      }
      else
      {
        return (<IconContext.Provider value={{ size: sizeIcon, color: iconColorText, style: iconStyle }}>
          {icon}
        </IconContext.Provider>);
      }
    }
  }
}