import { TFilterFunction } from './FilterFunction';
/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc {
    id: number;
    type: TFilterFunction;
    abbr: string;
    desc: string;
}
/**
 * Перечисление для типа функции для фильтрации данных
 */
export declare const FilterFunctionDescriptors: Record<TFilterFunction, IFilterFunctionDesc>;
//# sourceMappingURL=FilterFunctionDesc.d.ts.map