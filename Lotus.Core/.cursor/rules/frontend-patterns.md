---
name: frontend-patterns
description: Это требования к паттернам при написания кода для frontend приложений
---

# Паттерн ClassInstance:
Условие применение: при прямом указании в запросе
Цель: Предоставить постоянный доступ к экземпляру класса без необходимости его постоянного создания
Требования:
  - Реализация должна соответствовать примеру ниже.
  - Приватное статическое поле для хранения экземпляра (`private static _НАЗВАНИЕ_КЛАССА_В_CAMEL_CASE: T;`).
  - Публичный статический геттер `Instance` для доступа и ленивой инициализации.
  - Регион `#region Instance` должен быть **первым** в классе.

<example>
export class DelimiterCommand
{
  // #region Instance
  private static _delimiterCommand: DelimiterCommand;

  public static get Instance(): DelimiterCommand
  {
    return this._delimiterCommand || (this._delimiterCommand = new this(TActionCommandTypes.Delimiter));
  }
  // #endregion

  constructor(name: string) 
  {
    super(TActionCommandTypes.Delimiter, name);
  }
}
</example>


# Паттерн "Интерфейс + Type Guard + Caster"
Условие применение: при прямом указании в запросе
Цель: Получить надежные механизмы однозначной идентификации типов в runtime JavaScript
Требования:
Для каждого интерфейса TypeScript должны быть реализованы и экспортированы в том же файле две функции:
1. `instanceOf[Name]` — Type Guard для проверки реализации интерфейса, где `[Name]` это имя интерфейса без I
2. `castTo[Name]` — Безопасное преобразование (возвращает объект или `undefined`), где `[Name]` это имя интерфейса без I

<example>
export interface IEditable {
  id: TKey;
}

export function instanceOfEditable(value: unknown): value is IEditable {
  return (value && typeof value === 'object' && 'id' in value);
}

export function castToEditable(value: unknown): IEditable | undefined {
  return instanceOfEditable(value) ? value : undefined;
}
</example>

# Паттерн "CustomEvent"
Условие применение: при прямом указании в запросе
Цель: Получить унифицированную систему наименования и формирования типов стандартных событий JavaScript
Требования:
Формирование события `CustomEvent` должны строго следовать структуре:
- `[Name]EventType` — строковая константа типа.
- `I[Name]EventData` — интерфейс данных в `detail`.
- `[Name]Event` — тип самого события (`CustomEvent<I...Data>`).
- `create[Name]Event` — фабричная функция для создания события.

<example>
export const LanguageChangeEventType = 'LanguageChangeEventType' as const;

export interface ILanguageChangeEventData {
  lang: TLanguageType;
}

export type LanguageChangeEvent = CustomEvent<ILanguageChangeEventData>;

export const createLanguageChangeEvent = (lang: TLanguageType): Event => {
  const data: ILanguageChangeEventData = { lang };
  return new CustomEvent<ILanguageChangeEventData>(LanguageChangeEventType, { detail: data });
};
</example>

# Паттерн "EnumClass" (Enum-like Objects)
Условие применение: при прямом указании в запросе
Цель: Унифицировать и обогатить систему наименования и формирования литеральных типов TypeScript
Требования:
Реализация строковых перечислений должна содержать три сущности:
1. `T[Name]Values` — readonly массив строк (as const).
2. `T[Name]` — alias литерального типа.
3. `T[Name]s` — объект-обертка (с суффиксом множественного числа и ключами в PascalCase), содержащий методы: `getAllValues`, `is[Name]`, `getByIndex`, `getByName`.

<example>
export const TActionCommandTypeValues = ['default', 'navigation', 'delimiter'] as const;
export type TActionCommandType = (typeof TActionCommandTypeValues)[number];

export const TActionCommandTypes = {
  Default: TActionCommandTypeValues[0],
  Navigation: TActionCommandTypeValues[1],
  Delimiter: TActionCommandTypeValues[2],

  getAllValues(): typeof TActionCommandTypeValues {
    return TActionCommandTypeValues;
  },
  isActionCommandType(value: unknown): value is TActionCommandType {
    if (typeof value === 'string')
    {
      return TActionCommandTypeValues.includes(value as TActionCommandType);
    } 
    return false;
  },
  getByIndex(index: number): TActionCommandType | undefined {
    return TActionCommandTypeValues[index];
  },
  getByName(name: string): TActionCommandType | undefined {
    return TActionCommandTypeValues.find((v) => v === name);
  }
} as const;
</example>

















