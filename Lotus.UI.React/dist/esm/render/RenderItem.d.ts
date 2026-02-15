import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
/**
 * Вспомогательный класс для отрисовки произвольного объекта
 */
export declare abstract class RenderItem {
    /**
     * Отрисовка произвольного элемента
     * @param size Размер элемента UI
     * @param item Объект
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
     * @returns ReactElement
     */
    static renderItem(size: TSizeType, item: any, imageDatabase?: IImageDatabase, wrapContainer?: IHorizontalStackProps): ReactElement;
}
//# sourceMappingURL=RenderItem.d.ts.map