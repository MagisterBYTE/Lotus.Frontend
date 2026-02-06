/**
 * Статический класс для генерации одномерного шума.
 */
export declare abstract class GenerationNoise1D {
    /**
     * Случайное число источника
     */
    static seed: number;
    /**
     * Текущая активная функция шума
     */
    static noiseInteger1D: (value: number) => number;
    /**
     * Линейная интерполяция между a и b.
     * @param a Начальное значение
     * @param b Конечное значение
     * @param t Шаг [0, 1]
     */
    static lerp(a: number, b: number, t: number): number;
    /**
     * Косинусная интерполяция (более плавная, чем линейная).
     */
    static cosine(a: number, b: number, t: number): number;
    /**
     * Целочисленная шумовая функция V1 (Алгоритм на основе полиномов).
     * Хорошо подходит для простых эффектов.
     */
    static noiseInteger1DV1(value: number): number;
    /**
     * Целочисленная шумовая функция V2 (Продвинутый алгоритм на базе PCG/Xorshift).
     * Дает более высокое качество случайности.
     */
    static noiseInteger1DV2(value: number): number;
    /**
     * Возвращает шум в диапазоне [0.0, 1.0].
     */
    static noiseSingle1D(value: number): number;
    /**
     * Плавный (интерполированный) шум.
     * Позволяет получать значения в любой дробной точке x.
     * @example
     * const height =
     *  GenerationNoise1D.smoothNoise1D(x * 1.0) * 1.0 +  // Основная форма
     *  GenerationNoise1D.smoothNoise1D(x * 2.0) * 0.5 +  // Мелкие детали
     *  GenerationNoise1D.smoothNoise1D(x * 4.0) * 0.25;  // Микро-неровности
     * @param x Координата шума
     * @param interpolationFn Функция интерполяции (по умолчанию Lerp)
     */
    static smoothNoise1D(x: number, interpolationFn?: (a: number, b: number, t: number) => number): number;
}
//# sourceMappingURL=GenerationNoise1D.d.ts.map