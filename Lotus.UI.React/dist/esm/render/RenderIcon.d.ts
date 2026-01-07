import { TColorToken } from 'lotus-core/modules/color';
import { IImageDatabase } from 'lotus-core/resources/image';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { TCssColor, TSizeType } from '#types';
/**
 * Отрисовка иконки
 */
export declare abstract class RenderIcon {
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
    static renderIcon(size: TSizeType, icon: any, other?: ReactNode, iconStyle?: CSSProperties, iconColor?: TCssColor | TColorToken, imageDatabase?: IImageDatabase, wrapDiv?: boolean, wrapDivStyle?: CSSProperties): ReactElement | undefined;
}
//# sourceMappingURL=RenderIcon.d.ts.map