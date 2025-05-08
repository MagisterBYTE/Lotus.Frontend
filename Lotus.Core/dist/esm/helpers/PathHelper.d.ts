/**
 * Вспомогательный класс для работы с путями и файлами
 */
export declare class PathHelper {
    /**
     * Разделяет имя файла на название и расширение
     * @param {string} fileName - Полное имя файла
     * @returns {[string, string]} Кортеж [имя_файла_без_расширения, расширение]
     * @example
     * PathHelper.splitNameAndExtension('document.pdf'); // ['document', '.pdf']
     * PathHelper.splitNameAndExtension('archive.tar.gz'); // ['archive.tar', '.gz']
     * PathHelper.splitNameAndExtension('fileWithoutExtension'); // ['fileWithoutExtension', '']
     */
    static splitNameAndExtension(fileName: string): [string, string];
    /**
     * Проверяет, имеет ли файл расширение
     * @param {string} fileName - Имя файла для проверки
     * @returns {boolean} true, если файл имеет расширение
     * @example
     * PathHelper.hasExtension('image.jpg'); // true
     * PathHelper.hasExtension('document'); // false
     */
    static hasExtension(fileName: string): boolean;
    /**
     * Получает расширение файла
     * @param {string} fileName - Имя файла
     * @returns {string} Расширение файла (включая точку) или пустую строку
     * @example
     * PathHelper.getExtension('presentation.pptx'); // '.pptx'
     * PathHelper.getExtension('fileWithoutExtension'); // ''
     */
    static getExtension(fileName: string): string;
    /**
     * Объединяет путь и имя файла, корректно обрабатывая разделители
     * @param {string} path - Базовый путь
     * @param {string} fileName - Имя файла
     * @returns {string} Полный путь к файлу
     * @example
     * PathHelper.joinPathAndFile('dir/subdir', 'file.txt'); // 'dir/subdir/file.txt'
     * PathHelper.joinPathAndFile('dir/', '/file.txt'); // 'dir/file.txt'
     */
    static joinPathAndFile(path: string, fileName: string): string;
}
