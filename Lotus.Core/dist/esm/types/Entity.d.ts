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
//# sourceMappingURL=Entity.d.ts.map