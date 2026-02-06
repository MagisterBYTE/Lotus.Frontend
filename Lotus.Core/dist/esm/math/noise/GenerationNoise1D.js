/**
 * Статический класс для генерации одномерного шума.
 */
export class GenerationNoise1D {
    // #region Static fields
    /**
     * Случайное число источника
     */
    static seed = 16;
    /**
     * Текущая активная функция шума
     */
    static noiseInteger1D = GenerationNoise1D.noiseInteger1DV1;
    // #endregion
    // #region Interpolate methods
    /**
     * Линейная интерполяция между a и b.
     * @param a Начальное значение
     * @param b Конечное значение
     * @param t Шаг [0, 1]
     */
    static lerp(a, b, t) {
        return a + (b - a) * t;
    }
    /**
     * Косинусная интерполяция (более плавная, чем линейная).
     */
    static cosine(a, b, t) {
        const ft = t * Math.PI;
        const f = (1 - Math.cos(ft)) * 0.5;
        return a * (1 - f) + b * f;
    }
    // #endregion
    // #region Integer
    /**
     * Целочисленная шумовая функция V1 (Алгоритм на основе полиномов).
     * Хорошо подходит для простых эффектов.
     */
    static noiseInteger1DV1(value) {
        // Добавляем seed к значению
        let m = (value + GenerationNoise1D.seed) | 0;
        m = (m >> 13) ^ m;
        // В JS используем Math.imul для корректного 32-битного умножения с переполнением
        const part1 = Math.imul(m, m);
        const part2 = Math.imul(part1, 60493);
        const part3 = (part2 + 19990303) | 0;
        const part4 = Math.imul(m, part3);
        const nn = (part4 + 1376312589) & 0x7fffffff;
        return nn;
    }
    /**
     * Целочисленная шумовая функция V2 (Продвинутый алгоритм на базе PCG/Xorshift).
     * Дает более высокое качество случайности.
     */
    static noiseInteger1DV2(value) {
        // Работаем с BigInt для эмуляции ulong (64-bit)
        let state = BigInt(value + GenerationNoise1D.seed);
        state = state * state;
        // Константы из алгоритма PCG
        state = (state * 6364136223846793005n + 1442695040888963407n) & 0xffffffffffffffffn;
        const xorshifted = Number(((state >> 18n) ^ state) >> 27n) | 0;
        const rot = Number(state >> 59n);
        // Циклический сдвиг (Rotate Right)
        const v1 = xorshifted >>> rot;
        const v2 = xorshifted << (-rot & 31);
        return v1 | v2 | 0;
    }
    // #endregion
    // #region Single
    /**
     * Возвращает шум в диапазоне [0.0, 1.0].
     */
    static noiseSingle1D(value) {
        // Приводим результат NoiseInteger1D к диапазону 0-1
        return GenerationNoise1D.noiseInteger1DV1(value) / 2147483647.0;
    }
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
    static smoothNoise1D(x, interpolationFn = GenerationNoise1D.cosine) {
        const intX = Math.floor(x); // Целая часть
        const fracX = x - intX; // Дробная часть
        // Получаем значения шума в двух соседних целых точках
        const v1 = GenerationNoise1D.noiseSingle1D(intX);
        const v2 = GenerationNoise1D.noiseSingle1D(intX + 1);
        // Интерполируем между ними
        return interpolationFn(v1, v2, fracX);
    }
}
//# sourceMappingURL=GenerationNoise1D.js.map