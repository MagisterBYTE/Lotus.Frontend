/**
 * Определение функции для рисования поля объект
 */
export type RenderFieldFunction = (item?: unknown, context?: unknown, actualValue?: unknown) => unknown;
/**
 * Интерфейс для отрисовки свойства
 */
export interface IPropertyRendering {
    /**
     * Статус включенности отрисовки свойства
     */
    enabled?: boolean;
    /**
     * Функция для отрисовки поля/свойства
     */
    renderField: RenderFieldFunction;
}
//# sourceMappingURL=PropertyRendering.d.ts.map