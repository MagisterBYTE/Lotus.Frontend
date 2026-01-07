import { IDesignSystemItem } from '../types/DesignSystemItem';
import { FontSizes } from './FontSizes';
import { SizePrimitive } from './SizePrimitive';

/**
 * Определение стандартной коллекции размеров
 */
export abstract class SizeDimensions implements IDesignSystemItem
{
  // #region Fields
  public xxs:SizePrimitive;
  public xs:SizePrimitive;
  public sm:SizePrimitive;
  public md:SizePrimitive;
  public lg:SizePrimitive;
  public xl:SizePrimitive;
  public xxl:SizePrimitive;
  // #endregion

  // eslint-disable-next-line max-params
  constructor(xxs: number, xs: number, sm:number, md:number, lg:number, xl:number, xxl:number)
  {
    this.xxs = new SizePrimitive(xxs);
    this.xs = new SizePrimitive(xs);
    this.sm = new SizePrimitive(sm);
    this.md = new SizePrimitive(md);
    this.lg = new SizePrimitive(lg);
    this.xl = new SizePrimitive(xl);
    this.xxl = new SizePrimitive(xxl);
  }

  /**
   * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс CssVariables
   */
  public abstract applyToCssVariable():void;

  /**
   * Конвертирует значение размера в rem в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде строки
   */
  public toRem(value?: string|number):string|undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value/16}rem`;

    switch (value)
    {
      case 'xxs':
        return this.xxs.rem;
      case 'xs':
        return this.xs.rem;
      case 'sm':
        return this.sm.rem;
      case 'md':
        return this.md.rem;
      case 'lg':
        return this.lg.rem;
      case 'xl':
        return this.xl.rem;
      case 'xxl':
        return this.xxl.rem;
    }

    return value;
  }

  /**
   * Конвертирует значение размера в rem в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде строки
   */
  public toCssNegative<TCssType = string>(value?: string|number):TCssType|undefined
  {
    if (value === undefined) return undefined; 

    if (typeof value === 'number') return `-${value}px` as TCssType;

    switch (value)
    {
      case 'xxs':
        return this.xxs.toNegativeRem() as TCssType;
      case 'xs':
        return this.xs.toNegativeRem()  as TCssType;
      case 'sm':
        return this.sm.toNegativeRem()  as TCssType;
      case 'md':
        return this.md.toNegativeRem()  as TCssType;
      case 'lg':
        return this.lg.toNegativeRem()  as TCssType;
      case 'xl':
        return this.xl.toNegativeRem()  as TCssType;
      case 'xxl':
        return this.xxl.toNegativeRem()  as TCssType;
    }

    return value as TCssType;
  }

  /**
   * Конвертирует значение размера в rem в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде строки
   */
  public toCss<TCssType = string>(value?: string|number):TCssType|undefined
  {
    if (value === undefined) return undefined; 

    if (typeof value === 'number') return `${value}px` as TCssType;

    switch (value)
    {
      case 'xxs':
        return this.xxs.rem as TCssType;
      case 'xs':
        return this.xs.rem as TCssType;
      case 'sm':
        return this.sm.rem as TCssType;
      case 'md':
        return this.md.rem as TCssType;
      case 'lg':
        return this.lg.rem as TCssType;
      case 'xl':
        return this.xl.rem as TCssType;
      case 'xxl':
        return this.xxl.rem as TCssType;
    }

    return value as TCssType;
  }

  /**
   * Конвертирует значение размера в пиксели в виде числа
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns число - размер в пикселях
   */
  public toPixel(value?: string|number):number|undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;

    switch (value)
    {
      case 'xxs':
        return this.xxs.value;
      case 'xs':
        return this.xs.value;
      case 'sm':
        return this.sm.value;
      case 'md':
        return this.md.value;
      case 'lg':
        return this.lg.value;
      case 'xl':
        return this.xl.value;
      case 'xxl':
        return this.xxl.value;
    }
    const v = parseFloat(value);
    const unit = value.replace(value.toString(), '').toLowerCase();

    switch (unit)
    {
      case 'px':
        return v;
      case 'rem':
        return v * FontSizes.getRootFontSize();
      case 'em':
        // Для em нужно знать контекст, возвращаем приблизительное значение
        return v * 16; // предполагаем базовый размер 16px
      case 'pt':
        return v * 1.333; // 1pt = 1.333px
      case 'mm':
        return v * 3.7795; // 1mm = 3.7795px
      case 'cm':
        return v * 37.795; // 1cm = 37.795px
      case 'in':
        return v * 96; // 1inch = 96px
      case '%':
        return v * 16 / 100; // предполагаем базовый размер 16px
      default:
        // Если единица не распознана, возвращаем как есть (предполагаем px)
        return v;
    }
  }
}

