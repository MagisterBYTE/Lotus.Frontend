/**
 * Статический класс, реализующий математические методы и функции.
 */
export declare abstract class XMath {
    /**
     * Значение, для которого все абсолютные значения меньше, чем считаются равными нулю.
     */
    static readonly ZeroTolerance: number;
    /**
     * Точность вещественного числа.
     */
    static readonly Epsilon: number;
    /**
     * Точность вещественного числа.
     */
    static readonly Epsilon3: number;
    /**
     * Коэффициент для преобразования радианов в градусы.
     */
    static readonly RadianToDegree: number;
    /**
     * Коэффициент для преобразования градусов в радианы.
     */
    static readonly DegreeToRadian: number;
    /**
     * Экспонента.
     */
    static readonly Exponent: number;
    /**
     * Log2(e).
     */
    static readonly Log2E: number;
    /**
     * Log10(e).
     */
    static readonly Log10E: number;
    /**
     * Ln(2).
     */
    static readonly Ln2: number;
    /**
     * Ln(10).
     */
    static readonly Ln10: number;
    /**
     * Число Pi * 2.
     */
    static readonly PI2: number;
    /**
     * Число Pi.
     */
    static readonly PI: number;
    /**
     * Число Pi/2.
     */
    static readonly PI_2: number;
    /**
     * Число Pi/3.
     */
    static readonly PI_3: number;
    /**
     * Число Pi/4.
     */
    static readonly PI_4: number;
    /**
     * Число Pi/6.
     */
    static readonly PI_6: number;
    /**
     * Проверка на нулевое значение.
     * @param {number} value - Значение.
     * @returns {boolean} Статус проверки.
     */
    static isZero(value: number): boolean;
    /**
     * Проверка на единичное значение.
     * @param {number} value - Значение.
     * @returns {boolean} Статус проверки.
     */
    static isOne(value: number): boolean;
    /**
     * Ограничение значения в пределах от 0 до 1.
     * @param {number} value - Значение.
     * @returns {number} Значение.
     */
    static clamp01(value: number): number;
    /**
     * Ограничение значения в указанных пределах.
     * @param {number} value - Значение.
     * @param {number} min - Минимальное значение.
     * @param {number} max - Максимальное значение.
     * @returns {number} Значение.
     */
    static clamp(value: number, min: number, max: number): number;
    /**
     * Аппроксимация равенства значений.
     * @param {number} a - Первое значение.
     * @param {number} b - Второе значение.
     * @param {number} [epsilon=0.0001] - Погрешность.
     * @returns {boolean} Статус равенства значений.
     */
    static almost(a: number, b: number, epsilon?: number): boolean;
    /**
     * Вычисление квадратного корня.
     * @param {number} value - Значение.
     * @returns {number} Квадратный корень.
     */
    static sqrt(value: number): number;
    /**
     * Вычисление обратного квадратного корня.
     * @param {number} value - Значение.
     * @returns {number} Значение обратного квадратного корня.
     */
    static invSqrt(value: number): number;
    /**
     * Вычисление синуса.
     * @param {number} radians - Угол в радианах.
     * @returns {number} Значение синуса.
     */
    static sin(radians: number): number;
    /**
     * Вычисление косинуса.
     * @param {number} radians - Угол в радианах.
     * @returns {number} Значение косинуса.
     */
    static cos(radians: number): number;
    /**
     * Преобразование интервала одного к другому.
     * @param {number} destStart - Начало целевого интервала.
     * @param {number} destEnd - Конец целевого интервала.
     * @param {number} sourceStart - Начало исходного интервала.
     * @param {number} sourceEnd - Конец исходного интервала.
     * @param {number} value - Исходное значение.
     * @returns {number} Целевое значение.
     */
    static convertInterval(destStart: number, destEnd: number, sourceStart: number, sourceEnd: number, value: number): number;
    /**
     * Преобразование процента в часть.
     * @param {number} percent - Процент от 0 до 100.
     * @returns {number} Часть.
     */
    static toPartFromPercent(percent: number): number;
    /**
     * Округление до нужного целого.
     * @param {number} value - Значение.
     * @param {number} round - Степень округления.
     * @returns {number} Округленное значение.
     */
    static roundToNearest(value: number, round: number): number;
    /**
     * Округление до нужного.
     * @param {number} value - Значение.
     * @param {number} round - Степень округления.
     * @returns {number} Округленное значение.
     */
    static roundToSingle(value: number, round: number): number;
}
//# sourceMappingURL=XMath.d.ts.map