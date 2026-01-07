/**
 * Примитив для обозначения размера
 */
export class SizePrimitive
{
  // #region Fields
  /**
   * Размер в пикселях
   */
  public value: number;
  // #endregion

  // #region Properties
  /**
   * Получение размер в пикселях в виде строки
   */
  public get px()
  {
    return `${this.value}px`;
  }

  /**
   * Получение размер в rem в виде строки
   */
  public get rem()
  {
    return `${this.value / 16}rem`;
  }
  // #endregion

  constructor(value?: number)
  {
    this.value = value ?? 0;
  }

  public toNegativePixel()
  {
    return `-${this.value}px`;
  }

  public toNegativeRem()
  {
    return `-${this.value / 16}rem`;
  }
}
