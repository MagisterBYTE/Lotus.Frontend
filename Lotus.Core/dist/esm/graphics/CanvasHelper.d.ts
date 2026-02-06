/**
 * Вспомогательный класс для работы с канвой
 */
export declare abstract class CanvasHelper {
    /**
     * Рисует настраиваемую сетку на холсте.
     * Реализована как "чистая" процедура: восстанавливает состояние контекста после выполнения.
     *
     * @param ctx - Контекст 2D холста.
     * @param x - Координата X начала сетки.
     * @param y - Координата Y начала сетки.
     * @param width - Общая ширина сетки.
     * @param height - Общая высота сетки.
     * @param divisions - Количество ячеек по горизонтали и вертикали (для правила третей — 3).
     * @param strokeWidth - Толщина линий в пикселях.
     * @param gridColor - Цвет линий.
     */
    static drawGrid(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, divisions?: number, strokeWidth?: number, gridColor?: string): void;
    /**
     * Применяет скругление к целевому холсту на основе исходного.
     * Оптимизирована для частого вызова: позволяет переиспользовать существующий Canvas.
     *
     * @param source - Исходный холст с изображением.
     * @param borderRadius - Радиус скругления.
     * @param targetCanvas - (Опционально) Холст, в который нужно отрисовать результат.
     *                       Если не передан, создается новый.
     * @returns Холст с примененным скруглением.
     */
    static clipCanvasRounded(source: HTMLCanvasElement, borderRadius: number, targetCanvas?: HTMLCanvasElement): HTMLCanvasElement;
    /**
     * Удаляет фон, используя алгоритм заливки от краев (Flood Fill).
     * Это предотвращает удаление похожих цветов внутри самого объекта.
     * @param source - Исходный холст с изображением.
     * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
     */
    static removeImageBackground(image: HTMLImageElement | HTMLCanvasElement, threshold?: number): HTMLCanvasElement;
    /**
     * Удаляет фон, используя алгоритм заливки от краев (Flood Fill).
     * Это предотвращает удаление похожих цветов внутри самого объекта.
     * @param source - Контекст 2D рендеринга.
     * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
     */
    static removeBackground(context: CanvasRenderingContext2D, threshold?: number): void;
    /**
     * Удаляет однородный фон со спрайтов, используя алгоритм связной заливки.
     * Идеально подходит для иконок с четкими границами.
     * @param source - Исходный холст с изображением.
     * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
     */
    static removeSpriteBackground(image: HTMLImageElement | HTMLCanvasElement, threshold?: number): HTMLCanvasElement;
    /**
     * Удаляет однородный фон со спрайтов, используя алгоритм связной заливки.
     * Идеально подходит для иконок с четкими границами.
     * @param context - Контекст 2D рендеринга.
     * @param threshold - Чувствительность (0.0 - 1.0). Оптимально 0.1 - 0.15.
     */
    static removeSpriteBackgroundFromContext(context: CanvasRenderingContext2D, threshold?: number): void;
    /**
     * Удаляет одиночные пиксели и мелкий "шум" (Despeckle).
     * Проверяет количество соседей у каждого пикселя.
     *
     * @param canvas - Холст для очистки.
     * @param neighborThreshold - Минимальное кол-во соседей (1-8), чтобы пиксель выжил.
     * @returns Очищенный холст.
     */
    static cleanupIsolatedPixels(canvas: HTMLCanvasElement, neighborThreshold?: number): HTMLCanvasElement;
    /**
     * Сглаживает края спрайта, используя технику Alpha Thresholding.
     * Убирает "лесенку" и делает контур обтекаемым.
     *
     * @param canvas - Холст для обработки.
     * @param smoothness - Радиус размытия контура (1-3). Больше значение — сильнее сглаживание.
     * @param cutoff - Порог отсечения альфа-канала (0-255).
     *
     * @example
     * // 📝 Советы по настройке:
     * // 1. Если край "рваный" — увеличь smoothness до 2.
     * // 2. Если спрайт теряет детали (худеет) — уменьши cutoff до 80-100.
     * // 3. Если виден ободок старого фона — увеличь cutoff до 160-200.
     *
     * @returns Обработанный холст с четким сглаженным краем.
     */
    static smoothCanvasEdges(canvas: HTMLCanvasElement, smoothness?: number, cutoff?: number): HTMLCanvasElement;
    /**
     * Сглаживает края спрайта, используя технику Alpha Thresholding.
     * Убирает "лесенку" и делает контур обтекаемым.
     *
     * @param context - Контекст 2D рендеринга.
     * @param smoothness - Радиус размытия контура (1-3). Больше значение — сильнее сглаживание.
     * @param cutoff - Порог отсечения альфа-канала (0-255).
     *
     * @example
     * // 📝 Советы по настройке:
     * // 1. Если край "рваный" — увеличь smoothness до 2.
     * // 2. Если спрайт теряет детали (худеет) — уменьши cutoff до 80-100.
     * // 3. Если виден ободок старого фона — увеличь cutoff до 160-200.
     *
     * @returns Обработанный холст с четким сглаженным краем.
     */
    static smoothCanvasEdgesFromContext(context: CanvasRenderingContext2D, smoothness?: number, cutoff?: number): void;
}
//# sourceMappingURL=CanvasHelper.d.ts.map