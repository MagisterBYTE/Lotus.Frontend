import { Assert } from 'lotus-core/utils';
import { IGeneralTextProperties } from '#base';
import { Theme, ThemeInstance } from '#theme';
import
{
  TCssProperties,
  TTextEffect,
  TCssTextAlign,
  TCssFontSize,
  TFontSize,
  TCssFontWeight,
  TCssFontFamily,
  TCssLineHeight,
  TLineSpacing,
  instanceOfLineSpacing,
  instanceOfFontSize
} from '#types';
import { CssPropertiesHelper } from './CssPropertiesHelper';

export abstract class CssFontHelper
{
  // #region Font
  /**
   * Заполнить свойства CSS по настройкам шрифта в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства текста для элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по контейнеру в виде TCssProperties
   */
  public static fillFontProps(style: TCssProperties, props: IGeneralTextProperties, override: boolean): TCssProperties
  {
    const fontWeight: TCssFontWeight | undefined = props.fontBold ? 'bold' : undefined;
    const fontSize: TCssFontSize | undefined = CssFontHelper.getFontSizePropsValue(props.fontSize);
    const fontFamily: TCssFontFamily | undefined = props.fontAccent ? Theme.FontAccent : undefined;

    CssPropertiesHelper.overrideStyleValue(style, 'fontSize', fontSize, override);
    CssPropertiesHelper.overrideStyleValue(style, 'fontWeight', fontWeight, override);
    CssPropertiesHelper.overrideStyleValue(style, 'fontFamily', fontFamily, override);

    return style;
  }

  /**
   * Получить свойства CSS по настройкам шрифта в виде TCssProperties
   * @param props Общие свойства текста для элемента UI
   * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
   */
  public static getFontProps(props: IGeneralTextProperties): TCssProperties
  {
    const fontProps: TCssProperties = {};

    if (props.fontAccent)
    {
      fontProps.fontFamily = Theme.FontAccent;
    }

    if (Assert.existValue(props.fontSize))
    {
      fontProps.fontSize = CssFontHelper.getFontSizePropsValue(props.fontSize);
    }

    if (props.fontBold)
    {
      fontProps.fontWeight = 'bold';
    }

    return fontProps;
  }

  /**
   * Получить свойства CSS по настройкам шрифта в виде TCssProperties
   * @param size Размер шрифта/элемента
   * @param isBold Жирный шрифт
   * @param isFontAccent  Использовать шрифт для акцента внимания
   * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
   */
  public static getFontPropsBy(size?: TCssFontSize | TFontSize, isBold?: boolean, isFontAccent?: boolean): TCssProperties
  {
    const fontProps: TCssProperties = {};

    if (isFontAccent)
    {
      fontProps.fontFamily = Theme.FontAccent;
    }

    fontProps.fontSize = CssFontHelper.getFontSizePropsValue(size);

    if (isBold)
    {
      fontProps.fontWeight = 'bold';
    }

    return fontProps;
  }

  /**
   * Получить значение свойства CSS по размеру шрифта в виде TCssFontSize
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по размеру шрифта в виде TCssFontSize
   */
  public static getFontSizePropsValue(value?: TCssFontSize | TFontSize): TCssFontSize | undefined
  {
    if (Assert.emptyValue(value)) return undefined;
    if (instanceOfFontSize(value))
    {
      switch (value)
      {
        case 'xs':
          return '0.75rem';
        case 'sm':
          return '0.875rem';
        case 'md':
          return '1rem';
        case 'lg':
          return '1.125rem';
        case 'xl':
          return '1.25rem';
      }
    }

    return value;
  }
  
  /**
   * Конвертирует значение размера шрифта в пиксели
   * @param fontSize - размер шрифта в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns число - размер в пикселях
   */
  public static getFontSizeInPixels(fontSize: TCssFontSize | TFontSize): number 
  {
    if (typeof fontSize === 'number')
    {
      return fontSize; // предполагаем, что число уже в пикселях
    }

    if (instanceOfFontSize(fontSize))
    {
      switch (fontSize)
      {
        case 'xs':
          return 0.75 * 16;
        case 'sm':
          return 0.875 * 16;
        case 'md':
          return 1 * 16;
        case 'lg':
          return 1.125 * 16;
        case 'xl':
          return 1.25 * 16;
      }
    }

    const value = parseFloat(fontSize);
    const unit = fontSize.replace(value.toString(), '').toLowerCase();

    switch (unit)
    {
      case 'px':
        return value;
      case 'rem':
        return value * CssFontHelper.getRootFontSize();
      case 'em':
        // Для em нужно знать контекст, возвращаем приблизительное значение
        return value * 16; // предполагаем базовый размер 16px
      case 'pt':
        return value * 1.333; // 1pt = 1.333px
      case 'mm':
        return value * 3.7795; // 1mm = 3.7795px
      case 'cm':
        return value * 37.795; // 1cm = 37.795px
      case 'in':
        return value * 96; // 1inch = 96px
      case '%':
        return value * 16 / 100; // предполагаем базовый размер 16px
      default:
        // Если единица не распознана, возвращаем как есть (предполагаем px)
        return value;
    }
  }

  /**
   * Получает корневой размер шрифта (font-size) документа
   * @returns число - размер шрифта html элемента в пикселях
   */
  public static getRootFontSize(): number
  {
    // Проверяем, доступен ли window (защита от Server-Side Rendering)
    if (typeof window === 'undefined')
    {
      // На сервере возвращаем стандартное значение 16px
      return 16;
    }

    // Получаем вычисленный стиль корневого элемента (html)
    const rootFontSize = getComputedStyle(document.documentElement)
      .fontSize // Получаем значение в формате "16px"
      .replace('px', ''); // Удаляем "px" чтобы получить чистое число

    // Парсим число и возвращаем, или 16 по умолчанию при ошибке
    return parseFloat(rootFontSize) || 16;
  }

  // #endregion

  // #region TextEffect
  /**
   * Заполнить свойства CSS по эффектам текста в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства текста для элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по контейнеру в виде TCssProperties
   */
  public static fillTextEffect(style: TCssProperties, props: IGeneralTextProperties, override: boolean): TCssProperties
  {
    const сssProperties: TCssProperties = CssFontHelper.getTextEffectPropsBy(props.fontSize, props.textEffect, props.textAlign, props.textLineSpacing);

    CssPropertiesHelper.overrideStyleValue(style, 'textShadow', сssProperties.textShadow, override);
    CssPropertiesHelper.overrideStyleValue(style, 'WebkitTextStroke', сssProperties.WebkitTextStroke, override);
    CssPropertiesHelper.overrideStyleValue(style, 'textAlign', сssProperties.textAlign, override);

    if (Assert.existValue(props.textColor))
    {
      if (Assert.existValue(style.color))
      {
        if (override)
        {
          style.color = ThemeInstance.getTextColor(props.textColor!).toCSSRgbValue();
        }
      }
      else
      {
        style.color = ThemeInstance.getTextColor(props.textColor!).toCSSRgbValue();
      }
    }

    return style;
  }

  /**
   * Получить свойства CSS по эффектам текста в виде TCssProperties
   * @param props Общие свойства текста для элемента UI
   * @returns Свойства CSS по эффектам текста в виде TCssProperties
   */
  public static getTextEffectProps(props: IGeneralTextProperties): TCssProperties
  {
    const сssProperties: TCssProperties = CssFontHelper.getTextEffectPropsBy(props.fontSize, props.textEffect, props.textAlign, props.textLineSpacing);
    if (Assert.existValue(props.textColor))
    {
      сssProperties.color = ThemeInstance.getTextColor(props.textColor!).toCSSRgbValue();
    }

    return сssProperties;
  }

  /**
   * Получить свойства CSS по эффектам текста в виде TCssProperties
   * @param size Размер шрифта/элемента
   * @param effect Эффекты текста
   * @param textAlign Выравнивание текста по горизонтали внутри блока
   * @param textLineSpacing Межстрочный интервал текста
   * @returns Свойства CSS по эффектам текста в виде TCssProperties
   */
  public static getTextEffectPropsBy(size?: TFontSize | TCssFontSize, effect?: TTextEffect, textAlign?: TCssTextAlign,
    textLineSpacing?: TCssLineHeight | TLineSpacing): TCssProperties
  {
    const textProps: TCssProperties = {};

    const getSizeShadow = (): number =>
    {
      if (size)
      {
        switch (size)
        {
          case 'xs':
          case 'smaller':
            return 0.05;
          case 'sm':
          case 'small':
            return 0.07;
          case 'md':
          case 'medium':
            return 0.085;
          case 'lg':
          case 'large':
            return 0.1;
          case 'xl':
            return 0.115;
        }
      }

      return 0.07;
    };

    const getSizeStroke = (): number =>
    {
      if (size)
      {
        switch (size)
        {
          case 'xs':
          case 'smaller':
            return 0.4;
          case 'sm':
          case 'small':
            return 0.5;
          case 'md':
          case 'medium':
            return 0.8;
          case 'lg':
          case 'large':
            return 0.8;
          case 'xl':
            return 1;
        }
      }

      return 0.5;
    };

    if (effect)
    {
      switch (effect)
      {
        case 'shadow':
          {
            const sizeShadow = getSizeShadow();
            textProps.textShadow = `${sizeShadow}rem ${sizeShadow}rem 0 rgba(0, 0, 0, 0.15)`;
          }
          break;
        case 'stroke':
          {
            const sizeStroke = getSizeStroke();
            textProps.WebkitTextStroke = `${sizeStroke}px black`;
          }
          break;
      }
    }

    if (textAlign)
    {
      textProps.textAlign = textAlign;
    }

    const lineSpacing = CssFontHelper.getLineSpacingPropsValue(textLineSpacing);
    if (Assert.existValue(lineSpacing))
    {
      textProps.lineHeight = lineSpacing;
    }

    return textProps;
  }

  /**
   * Получить значение свойства CSS по межстрочному интервалу текста в виде TLineSpacing
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по межстрочному интервалу текста в виде TLineSpacing
   */
  public static getLineSpacingPropsValue(value?: TCssLineHeight | TLineSpacing): TCssLineHeight | undefined
  {
    if (Assert.emptyValue(value)) return undefined;
    if (instanceOfLineSpacing(value))
    {
      switch (value)
      {
        case 'xs':
          return '1.4';
        case 'sm':
          return '1.45';
        case 'md':
          return '1.55';
        case 'lg':
          return '1.6';
        case 'xl':
          return '1.65';
      }
    }

    return value;
  }
  // #endregion
}
