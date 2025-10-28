/**
 * Прокси интерфейс служащий оболочкой над реальным объектом
 */
export interface IProxiedObject<TType> {
    /**
     * Реальный объект
     */
    object: TType;
    /**
     * Функция для обновления прокси
     * @param sender Источник обновления
     */
    refresh: (sender?: any) => void;
}
//# sourceMappingURL=ProxiedObject.d.ts.map