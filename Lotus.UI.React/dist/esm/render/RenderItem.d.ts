import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { TSizeType } from '#types';
/**
 * Отрисовка объекта как опции
 */
export declare abstract class RenderItem {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param item Объект
     * @param context Контекст вызова
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    static renderItem(size: TSizeType, item: any, context?: any, imageDatabase?: IImageDatabase, wrapContainer?: boolean): ReactElement;
}
//# sourceMappingURL=RenderItem.d.ts.map