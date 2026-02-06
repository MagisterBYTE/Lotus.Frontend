import { IRandomGenerator } from './RandomGenerator';

/**
 * Генератор псевдослучайных значений на основе 64-битного алгоритма Xorshift (Ranq1).
 * Использует BigInt для корректной работы с 64-битными сдвигами, которые не поддерживает стандартный Number.
 */
export class RandomShift implements IRandomGenerator
{
  // #region Const
  /**
   * Коэффициент перевода в вещественное число (1.0 / 2^32).
   */
  private static readonly TO_SINGLE_COEFF: number = 1.0 / 4294967296.0;
  
  private static readonly A = BigInt('2685821657736338717');
  private static readonly M = BigInt('4101842887655102017');
  // #endregion

  // #region Field
  private _value: bigint;
  // #endregion

  /**
   * @param seed Зерно инициализации. Если не задано, используется текущее время.
   */
  constructor(seed?: number)
  {
    const s = seed !== undefined ? BigInt(seed) : BigInt(Date.now());
    this._value = RandomShift.M ^ s;
    this.step(); // Прогрев генератора
  }

  /**
   * Внутренний шаг алгоритма сдвига
   *
   */
  private step(): bigint
  {
    this._value ^= this._value >> 21n;
    this._value ^= this._value << 35n;
    this._value ^= this._value >> 4n;
    return this._value * RandomShift.A;
  }

  // #region IRandomGenerator
  /**
   * Получить следующее псевдослучайное вещественное число в диапазоне [0, max)
   * @param {number} max - Максимальное значение.
   * @returns {number} Псевдослучайное число.
   */
  public nextSingle(max: number): number
  {
    const res = Number(this.step() >> 32n) >>> 0;
    return res * RandomShift.TO_SINGLE_COEFF * (max);
  }

  /**
   * Получить следующее псевдослучайное беззнаковое 32-битное целое число.
   * @param max Верхняя граница (исключая).
   */
  public nextInteger(max: number): number
  {
    // Извлекаем старшие 32 бита из 64-битного состояния
    const res = Number(this.step() >> 32n) >>> 0;
    return max ? res % max : res;
  }
  // #endregion
}
