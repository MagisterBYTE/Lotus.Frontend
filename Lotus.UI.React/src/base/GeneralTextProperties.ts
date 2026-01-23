import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { FontDesignSystem } from '#designSystem/font';
import { FontSizes, LineSpacingSizes } from '#designSystem/sizes';
import { TTextEffect, TCssTextAlign, TCssFontSize, TCssLineHeight, TCssProperties, TFontAccent, TSizeType, TCssColor } from '#types';

/**
 * Общие свойства текста для элемента UI
 */
export interface IGeneralTextProperties
{
  /**
   * Размер шрифта
   */
  fontSize?: TCssFontSize | TSizeType;

  /**
   * Статус жирного шрифта
   */
  fontBold?: boolean;

  /**
   * Использовать шрифт для акцента внимания
   */
  fontAccent?: TFontAccent;

  /**
   * Тип эффекта для текста
   */
  textEffect?: TTextEffect;

  /**
   * Выравнивание текста по горизонтали внутри блока
   */
  textAlign?: TCssTextAlign;

  /**
   * Использовать гармоничный цвет текста, а не контрастный
   */
  textColorHarmonious?: boolean;

  /**
   * Цвет текста
   */
  textColor?: TCssColor|TColorToken;

  /**
   * Межстрочный интервал текста
   */
  textLineSpacing?: TCssLineHeight | TSizeType;
}

/**
 * Вспомогательный класс для работы с общими свойства текста для элемента UI
 */
export abstract class TextPropertiesHelper
{
  // #region Font
  /**
   * Создать свойства CSS по общим свойствам текста в виде TCssProperties
   * @param props Общие свойства текста для элемента UI
   * @returns Свойства CSS по общим свойствам текста в виде TCssProperties
   */
  public static createTextProps(props: IGeneralTextProperties): TCssProperties
  {
    const textProps: TCssProperties = {};

    if (Assert.existValue(props.fontSize))
    {
      textProps.fontSize = FontSizes.getFromCssVariable(props.fontSize);
    }

    if (props.fontBold)
    {
      textProps.fontWeight = 'bold';
    }

    if (props.fontAccent)
    {
      textProps.fontFamily = FontDesignSystem.getFromCssVariable(props.fontAccent);
    }

    if (props.textEffect)
    {
      switch (props.textEffect)
      {
        case 'shadow':
          {
            const sizeShadow = FontSizes.Default.getSizeShadow(props.fontSize);
            textProps.textShadow = `${sizeShadow}rem ${sizeShadow}rem 0 rgba(0, 0, 0, 0.15)`;
          }
          break;
        case 'stroke':
          {
            const sizeStroke = FontSizes.Default.getSizeStroke(props.fontSize);
            textProps.WebkitTextStroke = `${sizeStroke}px black`;
          }
          break;
      }
    }

    if (props.textAlign)
    {
      textProps.textAlign = props.textAlign;
    }

    if (props.textColor)
    {
      textProps.color = ColorCssHelper.getColorCss(props.textColor);
    }

    if (props.textLineSpacing)
    {
      textProps.lineHeight = LineSpacingSizes.getFromCssVariable(props.textLineSpacing);
    }

    return textProps;
  }
}
