import { Colors } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { IGeneralBackgroundProperties } from '#base';
import { CssPropertiesHelper } from '#helpers';
import { ThemeInstance } from '#theme';
import { TThemeColor } from '#theme/types';
import { TCssBackgroundColor, TCssBoxShadow, TCssProperties, TShadowElevation } from '#types';

export abstract class CssBackgroundHelper
{
  // #region BackgroundColor
  /**
   * Заполнить свойства CSS по свойствам фона в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства для фона элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по свойствам фона в виде TCssProperties
   */
  public static fillBackgroundProps(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties
  {
    const backgroundColor = CssBackgroundHelper.getBackgroundColorPropsValue(props.backColor);
    
    CssPropertiesHelper.overrideStyleValue(style, 'backgroundColor', backgroundColor, override);

    return style;
  }

  /**
   * Получить свойства CSS по свойствам фона в виде TCssProperties
   * @param props Общие свойства для фона элемента UI
   * @returns Свойства CSS по свойствам фона в виде TCssProperties
   */
  public static getBackgroundProps(props: IGeneralBackgroundProperties): TCssProperties
  {
    const backProps: TCssProperties = {};
    const backgroundColor = CssBackgroundHelper.getBackgroundColorPropsValue(props.backColor);
    if (Assert.existValue(backgroundColor))
    {
      backProps.backgroundColor = backgroundColor;
    }

    return backProps;
  }

  /**
   * Получить значение свойства CSS по цвету фона в виде TCssBackgroundColor
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по цвету фона в виде TCssBackgroundColor
   */
  public static getBackgroundColorPropsValue(value?: TThemeColor): TCssBackgroundColor | undefined
  {
    if (Assert.emptyValue(value)) return undefined;

    const color = ThemeInstance.getBackgroundColor(value!);
    return color.toCSSRgbValue();
  }
  // #endregion

  // #region BoxShadow
  /**
   * Заполнить свойства CSS по тени в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства для фона элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по тени в виде TCssProperties
   */
  public static fillBoxShadowProps(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties
  {
    const boxShadow = CssBackgroundHelper.getBoxShadowPropsValue(props.shadow, props.backColor);
    
    CssPropertiesHelper.overrideStyleValue(style, 'boxShadow', boxShadow, override);

    return style;
  }

  /**
   * Получить свойства CSS по тени в виде TCssProperties
   * @param props Общие свойства для фона элемента UI
   * @returns Свойства CSS по тени в виде TCssProperties
   */
  public static getBoxShadowProps(props: IGeneralBackgroundProperties): TCssProperties
  {
    const backProps: TCssProperties = {};
    const boxShadow = CssBackgroundHelper.getBoxShadowPropsValue(props.shadow, props.backColor);
    if (Assert.existValue(boxShadow))
    {
      backProps.boxShadow = boxShadow;
    }
    return backProps;
  }

  /**
   * Получить значение свойства CSS по тени в виде TCssBoxShadow
   * @param elevation Относительный размер тени
   * @param color Вариант цвета темы
   * @returns Свойства CSS по тени в виде TCssBoxShadow
   */
  // eslint-disable-next-line complexity
  public static getBoxShadowPropsValue(elevation?: TShadowElevation, color?: TThemeColor): TCssBoxShadow | undefined
  {
    if (Assert.emptyValue(elevation)) return undefined;

    const colorShadow = Assert.emptyValue(color) ? Colors.black : ThemeInstance.getBackgroundColor(color!);

    const rgba02 = colorShadow.toCSSRgbValue(0.2);
    const rgba014 = colorShadow.toCSSRgbValue(0.14);
    const rgba012 = colorShadow.toCSSRgbValue(0.12);

    let boxShadowValue = '';

    switch (elevation)
    {
      case 1:
        boxShadowValue = `0px 2px 1px -1px ${rgba02},0px 1px 1px 0px ${rgba014},0px 1px 3px 0px ${rgba012}`;
        break;
      case 2:
        boxShadowValue = `0px 3px 1px -2px ${rgba02},0px 2px 2px 0px ${rgba014},0px 1px 5px 0px ${rgba012}`;
        break;
      case 3:
        boxShadowValue = `0px 3px 3px -2px ${rgba02},0px 3px 4px 0px ${rgba014},0px 1px 8px 0px ${rgba012}`;
        break;
      case 4:
        boxShadowValue = `0px 2px 4px -1px ${rgba02},0px 4px 5px 0px ${rgba014},0px 1px 10px 0px ${rgba012}`;
        break;
      case 5:
        boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 5px 8px 0px ${rgba014},0px 1px 14px 0px ${rgba012}`;
        break;
      case 6:
        boxShadowValue = `0px 3px 5px -1px ${rgba02},0px 6px 10px 0px ${rgba014},0px 1px 18px 0px ${rgba012}`;
        break;
      case 7:
        boxShadowValue = `0px 4px 5px -2px ${rgba02},0px 7px 10px 1px ${rgba014},0px 2px 16px 1px ${rgba012}`;
        break;
      case 8:
        boxShadowValue = `0px 5px 5px -3px ${rgba02},0px 8px 10px 1px ${rgba014},0px 3px 14px 2px ${rgba012}`;
        break;
      case 9:
        boxShadowValue = `0px 5px 6px -3px ${rgba02},0px 9px 12px 1px ${rgba014},0px 3px 16px 2px ${rgba012}`;
        break;
      case 10:
        boxShadowValue = `0px 6px 6px -3px ${rgba02},0px 10px 14px 1px ${rgba014},0px 4px 18px 3px ${rgba012}`;
        break;
      case 11:
        boxShadowValue = `0px 6px 7px -4px ${rgba02},0px 11px 15px 1px ${rgba014},0px 4px 20px 3px ${rgba012}`;
        break;
      case 12:
        boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 12px 17px 2px ${rgba014},0px 5px 22px 4px ${rgba012}`;
        break;
      case 13:
        boxShadowValue = `0px 7px 8px -4px ${rgba02},0px 13px 19px 2px ${rgba014},0px 5px 24px 4px ${rgba012}`;
        break;
      case 14:
        boxShadowValue = `0px 7px 9px -4px ${rgba02},0px 14px 21px 2px ${rgba014},0px 5px 26px 4px ${rgba012}`;
        break;
      case 15:
        boxShadowValue = `0px 8px 9px -5px ${rgba02},0px 15px 22px 2px ${rgba014},0px 6px 28px 5px ${rgba012}`;
        break;
      case 16:
        boxShadowValue = `0px 8px 10px -5px ${rgba02},0px 16px 24px 2px ${rgba014},0px 6px 30px 5px ${rgba012}`;
        break;
      case 17:
        boxShadowValue = `0px 8px 11px -5px ${rgba02},0px 17px 26px 2px ${rgba014},0px 6px 32px 5px ${rgba012}`;
        break;
      case 18:
        boxShadowValue = `0px 9px 11px -5px ${rgba02},0px 18px 28px 2px ${rgba014},0px 7px 34px 6px ${rgba012}`;
        break;
      case 19:
        boxShadowValue = `0px 9px 12px -6px ${rgba02},0px 19px 29px 2px ${rgba014},0px 7px 36px 6px ${rgba012}`;
        break;
      case 20:
        boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 20px 31px 3px ${rgba014},0px 8px 38px 7px ${rgba012}`;
        break;
      case 21:
        boxShadowValue = `0px 10px 13px -6px ${rgba02},0px 21px 33px 3px ${rgba014},0px 8px 40px 7px ${rgba012}`;
        break;
      case 22:
        boxShadowValue = `0px 10px 14px -6px ${rgba02},0px 22px 35px 3px ${rgba014},0px 8px 42px 7px ${rgba012}`;
        break;
      case 23:
        boxShadowValue = `0px 11px 14px -7px ${rgba02},0px 23px 36px 3px ${rgba014},0px 9px 44px 8px ${rgba012}`;
        break;
      case 24:
        boxShadowValue = `0px 11px 15px -7px ${rgba02},0px 24px 38px 3px ${rgba014},0px 9px 46px 8px ${rgba012}`;
        break;
    }

    return boxShadowValue;
  }
  // #endregion
}
