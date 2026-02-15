import { IIdentifierId } from '#types';
/**
 * Класс для представления данных файла.
 */
export interface IResourceFile extends IIdentifierId<string> {
    /**
     * Наименование файла.
     */
    name?: string;
    /**
     * Размер файла в байтах.
     */
    sizeInBytes?: number;
}
/**
 * Класс для представления данных файла в формате строки base64.
 */
export interface IResourceFileBase64 extends IResourceFile {
    /**
     * Данные файла в формате строки base64.
     */
    data: string;
}
/**
 * Класс для представления данных файла в формате байтового массива.
 */
export interface IResourceFileRaw extends IResourceFile {
    /**
     * Данные файла.
     */
    data: Uint8Array;
}
//# sourceMappingURL=ResourceFile.d.ts.map