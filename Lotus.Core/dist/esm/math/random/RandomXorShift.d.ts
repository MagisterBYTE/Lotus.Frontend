import { IRandomGenerator } from './RandomGenerator';
/**
 * Современный генератор псевдослучайных значений на основе алгоритма Xorshift+.
 * Xorshift+ является улучшенной версией классического Xorshift.
 * Он обладает периодом 2^128 - 1 и обеспечивает отличную статистическую равномерность,
 * превосходя Ranq1 по качеству случайных чисел.
 */
export declare class RandomXorShift implements IRandomGenerator {
    /**
     * Коэффициент перевода в вещественное число (1.0 / 2^32).
     */
    private static readonly TO_SINGLE_COEFF;
    /**
     * Константа для инициализации второго состояния.
     */
    private static readonly SEED_MIXER;
    /**
     * Первое 64-битное состояние генератора.
     */
    private _s0;
    /**
     * Второе 64-битное состояние генератора.
     */
    private _s1;
    /**
     * Конструктор по умолчанию, использующий системное время для инициализации.
     */
    constructor();
    /**
     * Основной метод генерации: возвращает случайное 32-битное целое.
     * @returns {number} Псевдослучайное число.
     */
    generateInteger(): number;
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
//# sourceMappingURL=RandomXorShift.d.ts.map