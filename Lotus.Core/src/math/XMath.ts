/**
 * Статический класс, реализующий математические методы и функции.
 */
export abstract class XMath
{
  // #region Const
  /**
   * Значение, для которого все абсолютные значения меньше, чем считаются равными нулю.
   */
  public static readonly ZeroTolerance: number = 0.000000001;

  /**
   * Точность вещественного числа.
   */
  public static readonly Epsilon: number = 0.00000001;

  /**
   * Точность вещественного числа.
   */
  public static readonly Epsilon3: number = 0.001;

  /**
   * Коэффициент для преобразования радианов в градусы.
   */
  public static readonly RadianToDegree: number = 57.29577951;

  /**
   * Коэффициент для преобразования градусов в радианы.
   */
  public static readonly DegreeToRadian: number = 0.01745329;

  /**
   * Экспонента.
   */
  public static readonly Exponent: number = 2.71828182;

  /**
   * Log2(e).
   */
  public static readonly Log2E: number = 1.44269504;

  /**
   * Log10(e).
   */
  public static readonly Log10E: number = 0.43429448;

  /**
   * Ln(2).
   */
  public static readonly Ln2: number = 0.69314718;

  /**
   * Ln(10).
   */
  public static readonly Ln10: number = 2.30258509;

  /**
   * Число Pi * 2.
   */
  public static readonly PI2: number = 6.283185306;

  /**
   * Число Pi.
   */
  public static readonly PI: number = 3.141592653;

  /**
   * Число Pi/2.
   */
  public static readonly PI_2: number = 1.570796326;

  /**
   * Число Pi/3.
   */
  public static readonly PI_3: number = 1.047197551;

  /**
   * Число Pi/4.
   */
  public static readonly PI_4: number = 0.785398163;

  /**
   * Число Pi/6.
   */
  public static readonly PI_6: number = 0.523598775598;
  // #endregion

  // #region Main methods
  /**
   * Проверка на нулевое значение.
   * @param {number} value - Значение.
   * @returns {boolean} Статус проверки.
   */
  public static isZero(value: number): boolean
  {
    return Math.abs(value) < XMath.ZeroTolerance;
  }

  /**
   * Проверка на единичное значение.
   * @param {number} value - Значение.
   * @returns {boolean} Статус проверки.
   */
  public static isOne(value: number): boolean
  {
    return XMath.isZero(value - 1.0);
  }

  /**
   * Ограничение значения в пределах от 0 до 1.
   * @param {number} value - Значение.
   * @returns {number} Значение.
   */
  public static clamp01(value: number): number
  {
    if (value < 0) value = 0;
    if (value > 1) value = 1;
    return value;
  }

  /**
   * Ограничение значения в указанных пределах.
   * @param {number} value - Значение.
   * @param {number} min - Минимальное значение.
   * @param {number} max - Максимальное значение.
   * @returns {number} Значение.
   */
  public static clamp(value: number, min: number, max: number): number
  {
    if (value < min) value = min;
    if (value > max) value = max;
    return value;
  }

  /**
   * Аппроксимация равенства значений.
   * @param {number} a - Первое значение.
   * @param {number} b - Второе значение.
   * @param {number} [epsilon=0.0001] - Погрешность.
   * @returns {boolean} Статус равенства значений.
   */
  public static almost(a: number, b: number, epsilon: number = 0.0001): boolean
  {
    return Math.abs(a - b) < epsilon;
  }

  /**
   * Вычисление квадратного корня.
   * @param {number} value - Значение.
   * @returns {number} Квадратный корень.
   */
  public static sqrt(value: number): number
  {
    return Math.sqrt(value);
  }

  /**
   * Вычисление обратного квадратного корня.
   * @param {number} value - Значение.
   * @returns {number} Значение обратного квадратного корня.
   */
  public static invSqrt(value: number): number
  {
    const result = Math.sqrt(value);
    return result > XMath.ZeroTolerance ? 1.0 / result : 1.0;
  }

  /**
   * Вычисление синуса.
   * @param {number} radians - Угол в радианах.
   * @returns {number} Значение синуса.
   */
  public static sin(radians: number): number
  {
    return Math.sin(radians);
  }

  /**
   * Вычисление косинуса.
   * @param {number} radians - Угол в радианах.
   * @returns {number} Значение косинуса.
   */
  public static cos(radians: number): number
  {
    return Math.cos(radians);
  }

  /**
   * Преобразование интервала одного к другому.
   * @param {number} destStart - Начало целевого интервала.
   * @param {number} destEnd - Конец целевого интервала.
   * @param {number} sourceStart - Начало исходного интервала.
   * @param {number} sourceEnd - Конец исходного интервала.
   * @param {number} value - Исходное значение.
   * @returns {number} Целевое значение.
   */
  // eslint-disable-next-line max-params
  public static convertInterval(destStart: number, destEnd: number, sourceStart: number, sourceEnd: number, value: number): number
  {
    const x1 = destStart;
    const x2 = destEnd;
    const y1 = sourceStart;
    const y2 = sourceEnd;

    const k = (y2 - y1) / (x2 - x1);
    const b = y1 - k * x1;

    return k * value + b;
  }

  /**
   * Преобразование процента в часть.
   * @param {number} percent - Процент от 0 до 100.
   * @returns {number} Часть.
   */
  public static toPartFromPercent(percent: number): number
  {
    let p = percent;
    if (percent <= 0) p = 0;
    if (percent >= 100) p = 100;
    return p / 100.0;
  }

  /**
   * Округление до нужного целого.
   * @param {number} value - Значение.
   * @param {number} round - Степень округления.
   * @returns {number} Округленное значение.
   */
  public static roundToNearest(value: number, round: number): number
  {
    if (value >= 0)
    {
      return Math.floor((value + round / 2) / round) * round;
    }
    else
    {
      return Math.ceil((value - round / 2) / round) * round;
    }
  }

  /**
   * Округление до нужного.
   * @param {number} value - Значение.
   * @param {number} round - Степень округления.
   * @returns {number} Округленное значение.
   */
  public static roundToSingle(value: number, round: number): number
  {
    if (value >= 0)
    {
      return Math.floor((value + round / 2) / round) * round;
    }
    else
    {
      return Math.ceil((value - round / 2) / round) * round;
    }
  }
  // #endregion
}
