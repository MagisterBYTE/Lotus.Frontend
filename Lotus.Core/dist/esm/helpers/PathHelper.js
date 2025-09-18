/**
 * Вспомогательный класс для работы с путями и файлами
 */
export class PathHelper {
    /**
     * Разделяет имя файла на название и расширение
     * @param {string} fileName - Полное имя файла
     * @returns {[string, string]} Кортеж [имя_файла_без_расширения, расширение]
     * @example
     * PathHelper.splitNameAndExtension('document.pdf'); // ['document', '.pdf']
     * PathHelper.splitNameAndExtension('archive.tar.gz'); // ['archive.tar', '.gz']
     * PathHelper.splitNameAndExtension('fileWithoutExtension'); // ['fileWithoutExtension', '']
     */
    static splitNameAndExtension(fileName) {
        const index = fileName.lastIndexOf('.');
        if (index !== -1) {
            return [fileName.substring(0, index), fileName.substring(index)];
        }
        return [fileName, ''];
    }
    ;
    /**
     * Проверяет, имеет ли файл расширение
     * @param {string} fileName - Имя файла для проверки
     * @returns {boolean} true, если файл имеет расширение
     * @example
     * PathHelper.hasExtension('image.jpg'); // true
     * PathHelper.hasExtension('document'); // false
     */
    static hasExtension(fileName) {
        const index = fileName.lastIndexOf('.');
        return index > 0;
    }
    /**
     * Получает расширение файла
     * @param {string} fileName - Имя файла
     * @returns {string} Расширение файла (включая точку) или пустую строку
     * @example
     * PathHelper.getExtension('presentation.pptx'); // '.pptx'
     * PathHelper.getExtension('fileWithoutExtension'); // ''
     */
    static getExtension(fileName) {
        return this.splitNameAndExtension(fileName)[1];
    }
    /**
     * Объединяет путь и имя файла, корректно обрабатывая разделители
     * @param {string} path - Базовый путь
     * @param {string} fileName - Имя файла
     * @returns {string} Полный путь к файлу
     * @example
     * PathHelper.joinPathAndFile('dir/subdir', 'file.txt'); // 'dir/subdir/file.txt'
     * PathHelper.joinPathAndFile('dir/', '/file.txt'); // 'dir/file.txt'
     */
    static joinPathAndFile(path, fileName) {
        const normalizedPath = path.replace(/[\\/]+$/, '');
        const normalizedFile = fileName.replace(/^[\\/]+/, '');
        return `${normalizedPath}/${normalizedFile}`;
    }
}
//# sourceMappingURL=PathHelper.js.map