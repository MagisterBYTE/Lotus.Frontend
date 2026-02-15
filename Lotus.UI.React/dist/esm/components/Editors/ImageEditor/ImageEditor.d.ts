import { IHorizontalStackProps, IVerticalStackProps } from '#components/Layout';
import { TCssHeight, TCssWidth, TSizeType } from '#types';
interface IBaseImageEditorProps {
    /**
     * Размер элемента
     */
    size?: TSizeType;
    /**
     * Источник изображения
     */
    sourceImage?: File | string;
    /**
     * Настройки CORS запросов для данных получаемых элементом
     */
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
    /**
     * Максимальная ширина Canvas (по умолчанию 350 px)
     */
    maxCanvasWidth?: TCssWidth;
    /**
     * Максимальная высота Canvas (по умолчанию 350 px)
     */
    maxCanvasHeight?: TCssHeight;
    /**
     * Обработчик сохранения
     * @param blob
     * @returns
     */
    onSavePreview: (blob: Blob) => void;
}
interface IVerticalImageEditorProps extends IBaseImageEditorProps, IVerticalStackProps {
    orientation: 'vertical';
}
interface IHorizontalImageEditorProps extends IBaseImageEditorProps, IHorizontalStackProps {
    orientation: 'horizontal';
}
export type IImageEditorProps = IVerticalImageEditorProps | IHorizontalImageEditorProps;
export declare function ImageEditor(props: IImageEditorProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ImageEditor.d.ts.map