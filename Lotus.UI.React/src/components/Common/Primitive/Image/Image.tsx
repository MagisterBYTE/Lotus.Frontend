import { BrowserHelper, ImageHelper } from 'lotus-core/helpers';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { isValidElement, memo, useMemo } from 'react';
import { IconContext } from 'react-icons';
import { IGeneralIconProperties } from '#base';
import { IconSizes } from '#designSystem/sizes';

export interface IImageProps extends IGeneralIconProperties {

  /**
   * Ширина картинки в пикселях
   */
  width?: number

  /**
   * Высота изображения в пикселях
   */
  height?: number

  /**
   * Настройки CORS запросов для данных получаемых элементом
   */
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
}

export const Image = memo((props: IImageProps) => 
{
  const { width, height, icon, iconColor, iconSize, iconStyle, imageDatabase, crossOrigin } = props;

  // 1. Ранний выход — самая быстрая операция
  if (Assert.emptyValue(icon)) return null;

  // 2. Мемоизируем вычисления, которые могут быть "дорогими" при сотнях иконок
  const sizePx = useMemo(() => `${IconSizes.Default.toPixel(iconSize)}px`, [iconSize]);
  const iconColorCss = useMemo(() => ColorCssHelper.getColor(iconColor), [iconColor]);

  // Мемоизируем сам объект настроек контекста.
  // Теперь ссылка на этот объект изменится ТОЛЬКО если изменится размер, цвет или стиль.
  const contextValue = useMemo(() => ({
    size: IconSizes.Default.toRemCss(iconSize),
    width: width,
    height: height,
    color: iconColorCss,
    style: iconStyle
  }), [width, height, iconSize, iconColorCss, iconStyle]);

  // --- Логика рендеринга ---

  // Кейс 1: Прямая ссылка или DataURL
  if (typeof icon === 'string' && (ImageHelper.isDataURL(icon) || BrowserHelper.isAbsoluteUrl(icon))) 
  {
    return (
      <img
        alt="icon"
        crossOrigin={crossOrigin}
        height={height ?? sizePx}
        loading="lazy" // Оптимизация для галерей: не грузить то, что вне экрана
        src={icon}
        style={iconStyle}
        width={width ?? sizePx}
      />
    );
  }

  // Кейс 2: Поиск в базе данных
  if ((typeof icon === 'number' || typeof icon === 'string') && imageDatabase) 
  {
    const iconData = imageDatabase.getImageByIdOrName(icon);
    if (!iconData) return <>{icon}</>;

    return (
      <img
        alt={iconData.name || 'database-icon'}
        crossOrigin={crossOrigin}
        height={height ?? sizePx}
        loading="lazy"
        src={iconData.source}
        style={iconStyle}
        width={width ?? sizePx}
      />
    );
  }

  // Кейс 3: React Element (SVG / Font Icon)
  if (isValidElement(icon)) 
  {
    // Провайдер может быть "тяжелым", если его значение часто меняется.
    // Передаем мемоизированный объект value.
    return <IconContext.Provider value={contextValue}>{icon}</IconContext.Provider>;
  }

  return null;
});

// Назначаем имя для отладки в DevTools
Image.displayName = 'Icon';
