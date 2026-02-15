import { Assert } from 'lotus-core/utils';

/**
 * Примитив для обозначения размера
 */
export class SizePrimitive
{
  // #region Static methods
  /**
   * Конвертирует размера в пиксели
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns Значение размера в пикселях
   */
  public static fromCss(value?: string|number):number|undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;

    const v = parseFloat(value);
    const unit = value.replace(value.toString(), '').toLowerCase();

    switch (unit)
    {
      case 'px':
        return v;
      case 'rem':
        return v / 16;
      case 'em':
        // Для em нужно знать контекст, возвращаем приблизительное значение
        return v / 16; 
      case 'pt':
        return v * 1.333; // 1pt = 1.333px
      case 'mm':
        return v * 3.7795; // 1mm = 3.7795px
      case 'cm':
        return v * 37.795; // 1cm = 37.795px
      case 'in':
        return v * 96; // 1inch = 96px
      case '%':
        return v / 100; // предполагаем базовый размер 16px
      default:
        // Если единица не распознана, возвращаем как есть (предполагаем px)
        return v;
    }
  }
  // #endregion

  // #region Fields
  /**
   * Размер в пикселях
   */
  public value: number;
  // #endregion

  // #region Properties
  /**
   * Получение размер в пикселях
   */
  public get px(): number
  {
    return this.value;
  }

  /**
   * Получение размер в rem
   */
  public get rem()
  {
    return this.value / 16;
  }

  /**
   * Получение размер в точках
   */
  public get pt()
  {
    return this.value * 1.333;
  }

  /**
   * Получение размер в миллиметрах
   */
  public get mm()
  {
    return this.value * 3.7795;
  }

  /**
   * Получение размер в сантиметрах
   */
  public get cm()
  {
    return this.value * 37.795;
  }

  /**
   * Получение размер в дюймах
   */
  public get inch()
  {
    return this.value * 96;
  }
  // #endregion

  constructor(value?: number)
  {
    this.value = value ?? 0;
  }

  // #region Main methods
  public toPixel(): string
  {
    return `${this.value}px`;
  }

  public toPixelNegative()
  {
    return `-${this.value}px`;
  }

  public toRem(): string
  {
    return `${this.value / 16}rem`;
  }

  public toRemNegative()
  {
    return `-${this.value / 16}rem`;
  }

  public add(value?: string|number):SizePrimitive
  {
    if (Assert.emptyValue(value)) return this;
    const pixel = SizePrimitive.fromCss(value)!;
    return new SizePrimitive(this.px + pixel);
  }
  // #endregion
}
