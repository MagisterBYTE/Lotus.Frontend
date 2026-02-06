/**
 * Интерфейс для генераторов случайных чисел.
 */
export interface IRandomGenerator
{
  /**
   * Возвращает случайное вещественное число в диапазоне [0, max)
   */
  nextSingle(max: number): number;

  /**
   * Возвращает случайное целое число в диапазоне [0, max)
   */
  nextInteger(max: number): number;
}
