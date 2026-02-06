import { IRandomGenerator } from './RandomGenerator';
/**
 * Генератор псевдослучайных значений на основе 64-битного алгоритма Xorshift (Ranq1).
 * Использует BigInt для корректной работы с 64-битными сдвигами, которые не поддерживает стандартный Number.
 */
export declare class RandomShift implements IRandomGenerator {
    /**
     * Коэффициент перевода в вещественное число (1.0 / 2^32).
     */
    private static readonly TO_SINGLE_COEFF;
    private static readonly A;
    private static readonly M;
    private _value;
    /**
     * @param seed Зерно инициализации. Если не задано, используется текущее время.
     */
    constructor(seed?: number);
    /**
     * Внутренний шаг алгоритма сдвига
     *
     */
    private step;
    /**
     * Получить следующее псевдослучайное вещественное число в диапазоне [0, max)
     * @param {number} max - Максимальное значение.
     * @returns {number} Псевдослучайное число.
     */
    nextSingle(max: number): number;
    /**
     * Получить следующее псевдослучайное беззнаковое 32-битное целое число.
     * @param max Верхняя граница (исключая).
     */
    nextInteger(max: number): number;
}
//# sourceMappingURL=RandomShift.d.ts.map