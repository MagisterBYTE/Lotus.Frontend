import { IPageInfoResponse } from './PageInfo';
import { IResponse } from './Response';
/**
 * Интерфейс для постраничного получения данных
 */
export interface IResponsePage<TPayload = unknown> extends Omit<IResponse<TPayload>, 'payload'> {
    /**
    * Данные
    */
    payload?: TPayload[];
    /**
     * Информация о странице
     */
    pageInfo?: IPageInfoResponse;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IResponsePage}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfResponsePage(value: unknown): value is IResponsePage;
/**
 * Преобразование объекта к интерфейсу {@link IResponsePage}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToResponsePage(value: unknown): IResponsePage | undefined;
//# sourceMappingURL=ResponsePage.d.ts.map