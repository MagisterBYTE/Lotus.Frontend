import { IValidationItem } from './ValidationItem';
/**
 * Интерфейс для определения валидации отдельного элемента
 */
export interface IValidateItem<TValue = unknown> {
    /**
     * Валидации отдельного элемента/значения
     * @param value Значение
     * @param context Контекст вызова
     * @returns Объект валидации отдельного элемента/значения
     */
    validateItem(value: TValue, context?: any): IValidationItem;
}
//# sourceMappingURL=ValidateItem.d.ts.map