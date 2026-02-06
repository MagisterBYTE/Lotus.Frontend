/**
 * Вспомогательный класс для работы с изображениями
 */
export declare abstract class ImageHelper {
    static readonly RegExpDataURL: RegExp;
    /**
     * Проверяет, является ли строка форматом Data URL (base64)
     * Используется для определения, нужны ли CORS-настройки для загрузки
     */
    static isDataURL(str: string): boolean;
    /**
     * Асинхронно загружает изображение по URL
     * @param imageURL - Ссылка на картинку или Data URL
     * @param crossOrigin - Режим CORS (например, 'anonymous'), если нужен для Canvas
     * @returns Promise с готовым объектом HTMLImageElement
     */
    static loadImageURL(imageURL: string, crossOrigin?: string): Promise<HTMLImageElement>;
    /**
     * Преобразует объект File (например, из <input type="file">) в HTMLImageElement
     * @param file - Файл изображения из системы пользователя
     */
    static loadImageFile(file: File): Promise<HTMLImageElement>;
}
//# sourceMappingURL=ImageHelper.d.ts.map