/**
 * Тип для глобального идентификатора объекта.
 * Этот тип представляет собой строку с форматом UUID
 * @template TGuid
 */
export type TGuid = `${string}-${string}-${string}-${string}-${string}`;
/**
 * Регулярное выражение для проверки формата UUID (TGuid)
 */
export declare const TGuidRegex: RegExp;
/**
 * Проверка объекта на тип TGuid
 * @param value Проверяемый объект
 * @returns true, если объект соответствует типу TGuid, false в противном случае
 */
export declare function checkOfGuid(value: any): value is TGuid;
export declare function createGuid(): TGuid;
export declare function createGuidV7(): TGuid;
