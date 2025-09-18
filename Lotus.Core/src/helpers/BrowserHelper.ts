export class BrowserHelper
{
  /**
   * Проверяет, выполняется ли код на localhost
   * @returns {boolean} Возвращает true, если текущий хост - localhost, IPv6 localhost [::1],
   *                    или любой IPv4 адрес из диапазона 127.0.0.1/8
   * @example
   * BrowserHelper.isLocalhost(); // true, если на localhost
   */
  public static isLocalhost(): boolean
  {
    return Boolean(
      window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  }

  /**
   * Проверяет, является ли URL абсолютным
   * @param {string} url - URL для проверки
   * @returns {boolean} Возвращает true, если URL абсолютный (начинается с //, http://, https:// или mailto:)
   * @example
   * BrowserHelper.isAbsoluteUrl('https://example.com'); // true
   * BrowserHelper.isAbsoluteUrl('/relative/path'); // false
   */
  public static isAbsoluteUrl(url: string): boolean
  {
    return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
  }

  /**
   * Открывает URL в текущем или новом окне/вкладке
   * @param {string} url - URL для открытия
   * @param {boolean} [openInNewTab=false] - Флаг, указывающий открывать ли URL в новой вкладке
   * @example
   * BrowserHelper.open('https://example.com'); // откроет в текущей вкладке
   * BrowserHelper.open('https://example.com', true); // откроет в новой вкладке
   */
  public static open(url: string, openInNewTab: boolean = false): void
  {
    window.open(url, openInNewTab ? '_blank' : '_self');
  }

  /**
   * Инициирует скачивание файла из Blob объекта
   * @param {Blob} file - Blob объект файла для скачивания
   * @param {string} fileName - Имя файла для сохранения
   * @example
   * const blob = new Blob(['file content'], { type: 'text/plain' });
   * BrowserHelper.downloadBlobFile(blob, 'example.txt');
   */
  public static downloadBlobFile(file: Blob, fileName: string): void 
  {
    const downloadUrl = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };
}
