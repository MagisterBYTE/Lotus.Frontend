/**
 * Допустимые значения типа свойства.
 */
export const TPropertyTypeValues = ['bool', 'int', 'long', 'float', 'double', 'enum', 'string', 'dateTime', 'guid'] as const;

/**
 * Тип свойства
 */
export type TPropertyType = (typeof TPropertyTypeValues)[number];

/**
 * Объект-обёртка для работы с типами свойств (EnumClass-паттерн).
 */
export const TPropertyTypes = {
  /**
   * Логические и числовые типы
   */
  Bool: TPropertyTypeValues[0],
  Int: TPropertyTypeValues[1],
  Long: TPropertyTypeValues[2],
  Float: TPropertyTypeValues[3],
  Double: TPropertyTypeValues[4],

  /**
   * Специальные и строковые типы
   */
  Enum: TPropertyTypeValues[5],
  String: TPropertyTypeValues[6],
  DateTime: TPropertyTypeValues[7],
  Guid: TPropertyTypeValues[8],

  /**
   * Возвращает все доступные значения.
   */
  getAllValues(): readonly TPropertyType[] 
  {
    return TPropertyTypeValues;
  },

  /**
   * Проверяет, является ли значение допустимым TPropertyType.
   */
  isPropertyType(value: unknown): value is TPropertyType 
  {
    return typeof value === 'string' && TPropertyTypeValues.includes(value as TPropertyType);
  },

  /**
   * Возвращает тип свойства по индексу, если он существует.
   */
  getByIndex(index: number): TPropertyType | undefined 
  {
    return TPropertyTypeValues[index];
  },

  /**
   * Возвращает тип свойства по имени (сравнение без учёта регистра).
   */
  getByName(name: string): TPropertyType | undefined 
  {
    const lowerName = name.toLowerCase();
    return TPropertyTypeValues.find((value) => value === lowerName);
  }
} as const;
