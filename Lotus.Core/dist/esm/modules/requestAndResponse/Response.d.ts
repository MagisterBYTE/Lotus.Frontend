import { IResult } from '#types';
/**
 * Интерфейса для получения данных
 */
export interface IResponse<TPayload = unknown> {
    /**
     * Результат
     */
    result?: IResult;
    /**
     * Данные
     */
    payload?: TPayload;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IResponse}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfResponse(value: unknown): value is IResponse;
/**
 * Преобразование объекта к интерфейсу {@link IResponse}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToResponse(value: unknown): IResponse | undefined;
//# sourceMappingURL=Response.d.ts.map