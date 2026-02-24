import { IImageResource } from './ImageResource';
/**
 * Интерфейс для описания базы данных для доступа к ресурсам изображениям
 */
export interface IImageDatabase {
    /**
    * Получить список всех ресурсов изображений
    * @returns Список всех ресурсов изображений
    */
    getAllImages(): IImageResource[];
    /**
     * Получить ресурс изображения по его id или имени
     * @param id Идентификатор изображения или имени ресурса изображения
     * @param category Категория изображения
     * @returns Ресурс изображения
     */
    getImageByIdOrName(id?: number | string, category?: string): IImageResource | undefined;
    /**
     * Получить ресурс изображения
     * @param image Любая идентификация ресурса
     * @param category Категория изображения
     * @returns Ресурс изображения
     */
    getImage(image?: any, category?: string): IImageResource | undefined;
}
//# sourceMappingURL=ImageDatabase.d.ts.map