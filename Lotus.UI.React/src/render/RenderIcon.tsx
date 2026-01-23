/* eslint-disable jsx-a11y/alt-text */
import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { IImageDatabase } from 'lotus-core/resources/image';
import { Assert } from 'lotus-core/utils';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { IconSizes } from '#designSystem/sizes';
import { TCssColor, TSizeType } from '#types';


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
  public static renderIcon(size: TSizeType, icon:any, other?:ReactNode, iconStyle?:CSSProperties, 
    iconColor?: TCssColor|TColorToken, imageDatabase?:IImageDatabase, wrapDiv?: boolean, wrapDivStyle?:CSSProperties):ReactElement|undefined
  {
    if (Assert.emptyValue(icon)) return undefined;

    const iconColorCss = ColorCssHelper.getColorCss(iconColor);

    // Если строка
    if (typeof icon === 'string')
    {
      const sizeIcon = `${IconSizes.Default.toPixel(size)}px`;
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
        const sizeIcon = `${IconSizes.Default.toPixel(size)}px`;

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
      const sizeIcon = IconSizes.Default.toRemCss(size);
      if (other)
      {
        if (wrapDiv)
        {
          return (<div style={wrapDivStyle}>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorCss, style: iconStyle }}>
              {icon}
            </IconContext.Provider>
            {other}
          </div>);
        }
        else
        {
          return (<>
            <IconContext.Provider value={{ size: sizeIcon, color: iconColorCss, style: iconStyle }}>
              {icon}
            </IconContext.Provider>
            {other}
          </>);
        }
      }
      else
      {
        return (<IconContext.Provider value={{ size: sizeIcon, color: iconColorCss, style: iconStyle }}>
          {icon}
        </IconContext.Provider>);
      }
    }
  }
}