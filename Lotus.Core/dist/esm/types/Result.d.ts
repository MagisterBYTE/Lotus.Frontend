/**
 * Определение интерфейса для представления ответа/результата выполнения операции
 */
export interface IResult<TData = any> {
    /**
     * Статус успешности выполнения метода
     */
    succeeded: boolean;
    /**
     * Код
     */
    code?: number | string;
    /**
     * Сообщение о результате выполнения операции
     */
    message?: string;
    /**
     * Дополнительные данные
     */
    data?: TData;
}
/**
 * Произвольный текст ответа/результата операции
 */
export interface IResultMessage {
    /**
     * Условный уровень текста
     * @description В зависимости от контекста, уровень текста может по-разному интерпретироваться или его вообще не может быть
     */
    level?: number | string;
    /**
     * Произвольный текст.
     */
    text: string;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IResult}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfResult(value: unknown): value is IResult;
/**
 * Преобразование объекта к интерфейсу {@link IResult}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToResult(value: unknown): IResult | undefined;
//# sourceMappingURL=Result.d.ts.map