/**
 * Статический класс, реализующий математические методы и функции.
 */
export class XMath {
    // #region Const
    /**
     * Значение, для которого все абсолютные значения меньше, чем считаются равными нулю.
     */
    static ZeroTolerance = 0.000000001;
    /**
     * Точность вещественного числа.
     */
    static Epsilon = 0.00000001;
    /**
     * Точность вещественного числа.
     */
    static Epsilon3 = 0.001;
    /**
     * Коэффициент для преобразования радианов в градусы.
     */
    static RadianToDegree = 57.29577951;
    /**
     * Коэффициент для преобразования градусов в радианы.
     */
    static DegreeToRadian = 0.01745329;
    /**
     * Экспонента.
     */
    static Exponent = 2.71828182;
    /**
     * Log2(e).
     */
    static Log2E = 1.44269504;
    /**
     * Log10(e).
     */
    static Log10E = 0.43429448;
    /**
     * Ln(2).
     */
    static Ln2 = 0.69314718;
    /**
     * Ln(10).
     */
    static Ln10 = 2.30258509;
    /**
     * Число Pi * 2.
     */
    static PI2 = 6.283185306;
    /**
     * Число Pi.
     */
    static PI = 3.141592653;
    /**
     * Число Pi/2.
     */
    static PI_2 = 1.570796326;
    /**
     * Число Pi/3.
     */
    static PI_3 = 1.047197551;
    /**
     * Число Pi/4.
     */
    static PI_4 = 0.785398163;
    /**
     * Число Pi/6.
     */
    static PI_6 = 0.523598775598;
    // #endregion
    // #region Main methods
    /**
     * Проверка на нулевое значение.
     * @param {number} value - Значение.
     * @returns {boolean} Статус проверки.
     */
    static isZero(value) {
        return Math.abs(value) < XMath.ZeroTolerance;
    }
    /**
     * Проверка на единичное значение.
     * @param {number} value - Значение.
     * @returns {boolean} Статус проверки.
     */
    static isOne(value) {
        return XMath.isZero(value - 1.0);
    }
    /**
     * Ограничение значения в пределах от 0 до 1.
     * @param {number} value - Значение.
     * @returns {number} Значение.
     */
    static clamp01(value) {
        if (value < 0)
            value = 0;
        if (value > 1)
            value = 1;
        return value;
    }
    /**
     * Ограничение значения в указанных пределах.
     * @param {number} value - Значение.
     * @param {number} min - Минимальное значение.
     * @param {number} max - Максимальное значение.
     * @returns {number} Значение.
     */
    static clamp(value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    }
    /**
     * Аппроксимация равенства значений.
     * @param {number} a - Первое значение.
     * @param {number} b - Второе значение.
     * @param {number} [epsilon=0.0001] - Погрешность.
     * @returns {boolean} Статус равенства значений.
     */
    static almost(a, b, epsilon = 0.0001) {
        return Math.abs(a - b) < epsilon;
    }
    /**
     * Вычисление квадратного корня.
     * @param {number} value - Значение.
     * @returns {number} Квадратный корень.
     */
    static sqrt(value) {
        return Math.sqrt(value);
    }
    /**
     * Вычисление обратного квадратного корня.
     * @param {number} value - Значение.
     * @returns {number} Значение обратного квадратного корня.
     */
    static invSqrt(value) {
        const result = Math.sqrt(value);
        return result > XMath.ZeroTolerance ? 1.0 / result : 1.0;
    }
    /**
     * Вычисление синуса.
     * @param {number} radians - Угол в радианах.
     * @returns {number} Значение синуса.
     */
    static sin(radians) {
        return Math.sin(radians);
    }
    /**
     * Вычисление косинуса.
     * @param {number} radians - Угол в радианах.
     * @returns {number} Значение косинуса.
     */
    static cos(radians) {
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
    static convertInterval(destStart, destEnd, sourceStart, sourceEnd, value) {
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
    static toPartFromPercent(percent) {
        let p = percent;
        if (percent <= 0)
            p = 0;
        if (percent >= 100)
            p = 100;
        return p / 100.0;
    }
    /**
     * Округление до нужного целого.
     * @param {number} value - Значение.
     * @param {number} round - Степень округления.
     * @returns {number} Округленное значение.
     */
    static roundToNearest(value, round) {
        if (value >= 0) {
            return Math.floor((value + round / 2) / round) * round;
        }
        else {
            return Math.ceil((value - round / 2) / round) * round;
        }
    }
    /**
     * Округление до нужного.
     * @param {number} value - Значение.
     * @param {number} round - Степень округления.
     * @returns {number} Округленное значение.
     */
    static roundToSingle(value, round) {
        if (value >= 0) {
            return Math.floor((value + round / 2) / round) * round;
        }
        else {
            return Math.ceil((value - round / 2) / round) * round;
        }
    }
}
//# sourceMappingURL=XMath.js.map