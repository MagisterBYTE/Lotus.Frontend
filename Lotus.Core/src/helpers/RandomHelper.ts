export abstract class RandomHelper
{
  /**
   * Получает случайное число в диапазоне от min до max
   * @param min Минимальное значение
   * @param max Максимальное значение
   * @returns Случайное число в диапазоне от min до max
   */
  public static getMinMax(min: number, max: number): number
  {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Получает случайное число в диапазоне от 0 до max
   * @param max Максимальное значение
   * @returns Случайное число в диапазоне от 0 до max
   */
  public static getMax(max: number): number
  {
    return Math.floor(Math.random() * max);
  }
}
