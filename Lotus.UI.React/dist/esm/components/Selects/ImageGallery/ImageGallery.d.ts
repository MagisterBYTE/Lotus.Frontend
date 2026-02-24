import { IImageResource } from 'lotus-core/resources/image';
import { IGallerySelectProps } from '../GallerySelect';
export interface IImageGalleryProps extends Omit<IGallerySelectProps<IImageResource>, 'items' | 'selectedItem'> {
    /**
     * Выбранное изображение
     */
    selectedImage: unknown;
    /**
     * Ширина картинки в пикселях
     */
    width?: number;
    /**
     * Высота изображения в пикселях
     */
    height?: number;
}
export declare function ImageGallery(props: IImageGalleryProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ImageGallery.d.ts.map