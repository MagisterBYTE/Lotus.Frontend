/**
 * Единый модуль для генерации шума и фрактальных поверхностей (fBm).
 */
export declare abstract class Noise {
    static seed: number;
    private static lerp;
    private static cosineInterpolate;
    /** 32-битный хеш для 1D */
    static noise1D(x: number): number;
    /** 32-битный хеш для 2D */
    static noise2D(x: number, y: number): number;
    static smoothNoise1D(x: number): number;
    static smoothNoise2D(x: number, y: number): number;
    /**
     * Генерация фрактального шума в 1D.
     * @param x Координата.
     * @param octaves Количество слоев (детализация).
     * @param persistence Насколько быстро убывает влияние каждой следующей октавы (0.5 - классика).
     * @param lacunarity Насколько быстро растет частота (2.0 - классика).
     */
    static fBm1D(x: number, octaves?: number, persistence?: number, lacunarity?: number): number;
    /**
     * Генерация фрактального шума в 2D (Карта высот).
     */
    static fBm2D(x: number, y: number, octaves?: number, persistence?: number, lacunarity?: number): number;
    /**
     * Искривление области (Domain Warping).
     * Создает эффекты завихрений, жидкостей или сложного рельефа.
     * @example
     * Текстура мрамора - sin(x + domainWarp2D(x, y) * 10).
     * Эффект пламени/лавы - (x, y + time)
     * @param x Координата X.
     * @param y Координата Y.
     * @param intensity Сила искривления (сдвига).
     */
    static domainWarp2D(x: number, y: number, intensity?: number): number;
    /**
     * Генерация клеточного шума (Voronoi / Worley).
     * @example
     * Каменная кладка / Плитка: Используйте id для окраски каждой клетки в свой цвет. Так как id постоянен внутри одной клетки, вся "плитка" будет одного цвета
     * Трещины / Вода: Используйте dist. Близко к 0 — центр клетки, близко к 1.0 — границы. Если взять 1.0 - dist, получатся выпуклые формы (как чешуя)
     * Эффект витража: Комбинируйте dist и id. Например, залейте клетку цветом id, но нарисуйте черную линию, если dist > 0.9
     * @param x Координата X.
     * @param y Координата Y.
     * @returns Объект с расстоянием до ближайшей точки (dist) и ID этой точки (id).
     */
    static cellular2D(x: number, y: number): {
        dist: number;
        id: number;
    };
}
//# sourceMappingURL=Noise.d.ts.map