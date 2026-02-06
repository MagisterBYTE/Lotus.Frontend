/**
 * Современный генератор псевдослучайных значений на основе алгоритма Xorshift+.
 * Xorshift+ является улучшенной версией классического Xorshift.
 * Он обладает периодом 2^128 - 1 и обеспечивает отличную статистическую равномерность,
 * превосходя Ranq1 по качеству случайных чисел.
 */
export class RandomXorShift {
    // #region Const
    /**
     * Коэффициент перевода в вещественное число (1.0 / 2^32).
     */
    static TO_SINGLE_COEFF = 1.0 / 4294967296.0;
    /**
     * Константа для инициализации второго состояния.
     */
    static SEED_MIXER = 0x9e3779b97f4a7c15n;
    // #endregion
    // #region Fields
    /**
     * Первое 64-битное состояние генератора.
     */
    _s0;
    /**
     * Второе 64-битное состояние генератора.
     */
    _s1;
    /**
     * Конструктор с заданным 32-битным зерном (seed).
     * @param {number} seed - Базовое число для инициализации состояния.
     */
    constructor(seed) {
        if (seed === undefined) {
            seed = Date.now();
        }
        // Инициализируем два состояния, чтобы они не были нулевыми
        this._s0 = (BigInt(seed) << 32n) | BigInt(seed);
        this._s1 = this._s0 ^ RandomXorShift.SEED_MIXER;
        // "Прогрев" генератора для стабилизации последовательности
        for (let i = 0; i < 4; i++) {
            this.generateInteger();
        }
    }
    // #endregion
    // #region Main methods
    /**
     * Основной метод генерации: возвращает случайное 32-битное целое.
     * @returns {number} Псевдослучайное число.
     */
    generateInteger() {
        let x = this._s0;
        const y = this._s1;
        this._s0 = y;
        x ^= x << 23n; // a
        this._s1 = x ^ y ^ (x >> 17n) ^ (y >> 26n); // b, c
        // В алгоритме Xorshift+ результат — это сумма состояний.
        // Берем старшие 32 бита для лучшей энтропии.
        return Number((this._s1 + y) >> 32n);
    }
    // #endregion
    // #region IRandomGenerator methods
    /**
     * Получить следующее псевдослучайное вещественное число в диапазоне [0, max)
     * @param {number} max - Максимальное значение.
     * @returns {number} Псевдослучайное число.
     */
    nextSingle(max) {
        return this.generateInteger() * RandomXorShift.TO_SINGLE_COEFF * (max);
    }
    /**
     * Получить следующее псевдослучайное беззнаковое 32-битное целое число.
     * @param max Верхняя граница (исключая).
     */
    nextInteger(max) {
        if (max === 0)
            return 0;
        const rand = this.generateInteger();
        return (rand % max);
    }
}
//# sourceMappingURL=RandomXorShift.js.map