/**
 * Массив значений типов функций фильтрации
 */
export const TFilterFunctionValues = ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan',
  'greaterThanOrEqual', 'between', 'contains', 'startsWith', 'endsWith', 'like', 'notEmpty',
  'empty', 'includeAny', 'includeAll', 'includeEquals', 'includeNone'] as const;

/**
 * Тип функции для фильтрации данных
 */
export type TFilterFunction = (typeof TFilterFunctionValues)[number];

/**
 * Объект для представления типов функций фильтрации
 */
export const TFilterFunctions = {
  Equals: TFilterFunctionValues[0],
  NotEqual: TFilterFunctionValues[1],
  LessThan: TFilterFunctionValues[2],
  LessThanOrEqual: TFilterFunctionValues[3],
  GreaterThan: TFilterFunctionValues[4],
  GreaterThanOrEqual: TFilterFunctionValues[5],
  Between: TFilterFunctionValues[6],
  Contains: TFilterFunctionValues[7],
  StartsWith: TFilterFunctionValues[8],
  EndsWith: TFilterFunctionValues[9],
  Like: TFilterFunctionValues[10],
  NotEmpty: TFilterFunctionValues[11],
  Empty: TFilterFunctionValues[12],
  IncludeAny: TFilterFunctionValues[13],
  IncludeAll: TFilterFunctionValues[14],
  IncludeEquals: TFilterFunctionValues[15],
  IncludeNone: TFilterFunctionValues[16],

  getAllValues(): typeof TFilterFunctionValues
  {
    return TFilterFunctionValues;
  },

  isFilterFunction(value: unknown): value is TFilterFunction
  {
    return TFilterFunctionValues.includes(value as TFilterFunction);
  },

  getByIndex(index: number): TFilterFunction | undefined
  {
    return TFilterFunctionValues[index];
  },

  getByName(name: string): TFilterFunction | undefined
  {
    return TFilterFunctionValues.find((v) => v === name);
  }
} as const;