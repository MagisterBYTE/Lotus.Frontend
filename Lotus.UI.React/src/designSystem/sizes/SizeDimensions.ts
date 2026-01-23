import { IDesignSystemItem } from '../types/DesignSystemItem';
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
   * Конвертирует значение размера в rem в виде числа
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде числа
   */
  public toRem(value?: string|number):number|undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value/16;

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

    const pixel = SizePrimitive.fromCss(value)!;
    return pixel/16;
  }

  /**
   * Конвертирует значение размера в rem в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде строки
   */
  public toRemCss(value?: string|number):string|undefined
  {
    const rem = this.toRem(value);
    if (rem)
    {
      return `${rem}rem`;
    }
    return undefined;
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

    const pixel = SizePrimitive.fromCss(value)!;
    return pixel;
  }

  /**
   * Конвертирует значение размера в пиксели в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в пикселях в виде строки
   */
  public toPixelCss(value?: string|number):string|undefined
  {
    const pixel = this.toPixel(value);
    if (pixel)
    {
      return `${pixel}px`;
    }
    return undefined;
  }

  /**
   * Конвертирует значение размера в rem в виде строки
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в rem в виде строки
   */
  public toCssNegative<TCssType = string>(value?: string|number):TCssType|undefined
  {
    if (value === undefined) return undefined; 

    if (typeof value === 'number') return `-${value/16}px` as TCssType;

    switch (value)
    {
      case 'xxs':
        return this.xxs.toRemNegative() as TCssType;
      case 'xs':
        return this.xs.toRemNegative()  as TCssType;
      case 'sm':
        return this.sm.toRemNegative()  as TCssType;
      case 'md':
        return this.md.toRemNegative()  as TCssType;
      case 'lg':
        return this.lg.toRemNegative()  as TCssType;
      case 'xl':
        return this.xl.toRemNegative()  as TCssType;
      case 'xxl':
        return this.xxl.toRemNegative()  as TCssType;
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

    if (typeof value === 'number') return `${value / 16}px` as TCssType;

    switch (value)
    {
      case 'xxs':
        return this.xxs.toRem() as TCssType;
      case 'xs':
        return this.xs.toRem() as TCssType;
      case 'sm':
        return this.sm.toRem() as TCssType;
      case 'md':
        return this.md.toRem() as TCssType;
      case 'lg':
        return this.lg.toRem() as TCssType;
      case 'xl':
        return this.xl.toRem() as TCssType;
      case 'xxl':
        return this.xxl.toRem() as TCssType;
    }

    return value as TCssType;
  }

  /**
   * Конвертирует значение размера примитив размера
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера
   */
  public toSizePrimitive(value?: string|number):SizePrimitive|undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return new SizePrimitive(value);

    switch (value)
    {
      case 'xxs':
        return new SizePrimitive(this.xxs.value);
      case 'xs':
        return new SizePrimitive(this.xs.px);
      case 'sm':
        return new SizePrimitive(this.sm.px);
      case 'md':
        return new SizePrimitive(this.md.px);
      case 'lg':
        return new SizePrimitive(this.lg.px);
      case 'xl':
        return new SizePrimitive(this.xl.px);
      case 'xxl':
        return new SizePrimitive(this.xxl.px);
    }

    const pixel = SizePrimitive.fromCss(value)!;
    return new SizePrimitive(pixel);
  }
}

