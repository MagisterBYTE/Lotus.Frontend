
/**
 * Вспомогательный класс для работы с путями и файлами
 */
export abstract class PathHelper
{
  /**
   * Разделяет имя файла на название и расширение
   * @param {string} fileName - Полное имя файла
   * @returns {[string, string]} Кортеж [имя_файла_без_расширения, расширение]
   * @example
   * PathHelper.splitNameAndExtension('document.pdf'); // ['document', '.pdf']
   * PathHelper.splitNameAndExtension('archive.tar.gz'); // ['archive.tar', '.gz']
   * PathHelper.splitNameAndExtension('fileWithoutExtension'); // ['fileWithoutExtension', '']
   */
  public static splitNameAndExtension(fileName: string): [string, string] 
  {
    const index = fileName.lastIndexOf('.');
    if (index !== -1) 
    {
      return [fileName.substring(0, index), fileName.substring(index)];
    }

    return [fileName, ''];
  }

  /**
   * Проверяет, имеет ли файл расширение
   * @param {string} fileName - Имя файла для проверки
   * @returns {boolean} true, если файл имеет расширение
   * @example
   * PathHelper.hasExtension('image.jpg'); // true
   * PathHelper.hasExtension('document'); // false
   */
  public static hasExtension(fileName: string): boolean
  {
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
  public static getExtension(fileName: string): string
  {
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
  public static joinPathAndFile(path: string, fileName: string): string
  {
    const normalizedPath = path.replace(/[\\/]+$/, '');
    const normalizedFile = fileName.replace(/^[\\/]+/, '');
    return `${normalizedPath}/${normalizedFile}`;
  }
}