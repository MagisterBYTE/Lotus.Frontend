import { IRequest } from '#modules/requestAndResponse';
/**
 * Класс для получения списка файлов с учетом фильтрации и сортировки.
 */
export interface IResourceFilesRequest extends IRequest {
    /**
     * Идентификатор автора файла.
     */
    authorId?: string;
    /**
     * Идентификатор типа файла.
     */
    fileTypeId?: number;
    /**
     * Идентификатор группы файла.
     */
    groupId?: number;
}
//# sourceMappingURL=ResourceFilesRequest%20.d.ts.map