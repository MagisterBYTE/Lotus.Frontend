import { TThemeColor } from '#theme/types';
import { TControlSize } from '#types';
import { IImageDatabase } from 'lotus-core';
import { CSSProperties, ReactElement, ReactNode } from 'react';
/**
 * Отрисовка вспомогательных элементов UI
 */
export declare abstract class RenderComponentHelper {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param icon Данные иконки
     * @param other Другие данные
     * @param iconStyle Стиль иконки
     * @param iconColor Цвет иконки (влияет только на векторные)
     * @param imageDatabase База данных изображений
     * @param wrapDiv Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    static renderIconAndValue(size: TControlSize, icon: any, other?: ReactNode, iconStyle?: CSSProperties, iconColor?: TThemeColor, imageDatabase?: IImageDatabase, wrapDiv?: boolean, wrapDivStyle?: CSSProperties): ReactElement;
}
//# sourceMappingURL=RenderComponentHelper.d.ts.map