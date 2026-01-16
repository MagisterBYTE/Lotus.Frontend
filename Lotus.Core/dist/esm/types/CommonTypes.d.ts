import { TGuid } from './Guid';
/**
 * Тип для извлечения значений из объекта.
 *
 * @template T - Объект, из которого необходимо извлечь типы значений.
 * @type {InferValueTypes<T>} - Тип, представляющий значения объекта T, если T является объектом.
 * В противном случае возвращается never.
 */
export type InferValueTypes<T> = T extends {
    [key: string]: infer U;
} ? U : never;
/**
 * Заменяет значения всех свойств типа T на тип V.
 * @template T - тип объекта, свойства которого мы изменяем.
 * @template V - тип, на который мы заменяем значения свойств T.
 */
export type ReplaceValues<T, V> = {
    [K in keyof T]: V;
};
/**
 * Утилита для извлечения только значений-не-функций
 */
export type OnlyValues<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K];
}[keyof T];
/**
 * Обобщенный тип, который позволяет извлечь тип конкретного свойства из объекта.
 * @template TType - это объектный тип, из которого мы хотим получить свойство.
 * @template TPropertyName - это имя свойства, которое мы хотим извлечь. Оно должно принадлежать ключам типа TType (обозначается keyof TType).
 */
export type PropertyType<TType, TPropertyName extends keyof TType> = TType[TPropertyName];
/**
 * Тип представления словаря с ключами определённого типа и значениями.
 *
 * @template TKey - Тип ключей словаря (строка, символ, число или TGuid).
 * @template TValue - Тип значений, связанных с ключами.
 */
export type Dictionary<TKey extends string | symbol | number | TGuid, TValue> = {
    [key in TKey]: TValue;
};
//# sourceMappingURL=CommonTypes.d.ts.map