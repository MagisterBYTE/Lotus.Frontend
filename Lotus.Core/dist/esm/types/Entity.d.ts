import { TKey } from '#types';
/**
 * Определение интерфейса для представления сущности предметной области
 */
export interface IEntity<TypeId = TKey> {
    /**
     * Идентификатор сущности
     */
    readonly id: TypeId;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IEntity}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfEntity(value: unknown): value is IEntity;
/**
 * Преобразование объекта к интерфейсу {@link IEntity}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToEntity(value: unknown): IEntity | undefined;
//# sourceMappingURL=Entity.d.ts.map