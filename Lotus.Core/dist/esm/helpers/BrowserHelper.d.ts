export declare class BrowserHelper {
    /**
     * Проверяет, выполняется ли код на localhost
     * @returns {boolean} Возвращает true, если текущий хост - localhost, IPv6 localhost [::1],
     *                    или любой IPv4 адрес из диапазона 127.0.0.1/8
     * @example
     * BrowserHelper.isLocalhost(); // true, если на localhost
     */
    static isLocalhost(): boolean;
    /**
     * Проверяет, является ли URL абсолютным
     * @param {string} url - URL для проверки
     * @returns {boolean} Возвращает true, если URL абсолютный (начинается с //, http://, https:// или mailto:)
     * @example
     * BrowserHelper.isAbsoluteUrl('https://example.com'); // true
     * BrowserHelper.isAbsoluteUrl('/relative/path'); // false
     */
    static isAbsoluteUrl(url: string): boolean;
    /**
     * Открывает URL в текущем или новом окне/вкладке
     * @param {string} url - URL для открытия
     * @param {boolean} [openInNewTab=false] - Флаг, указывающий открывать ли URL в новой вкладке
     * @example
     * BrowserHelper.open('https://example.com'); // откроет в текущей вкладке
     * BrowserHelper.open('https://example.com', true); // откроет в новой вкладке
     */
    static open(url: string, openInNewTab?: boolean): void;
    /**
     * Инициирует скачивание файла из Blob объекта
     * @param {Blob} file - Blob объект файла для скачивания
     * @param {string} fileName - Имя файла для сохранения
     * @example
     * const blob = new Blob(['file content'], { type: 'text/plain' });
     * BrowserHelper.downloadBlobFile(blob, 'example.txt');
     */
    static downloadBlobFile(file: Blob, fileName: string): void;
}
