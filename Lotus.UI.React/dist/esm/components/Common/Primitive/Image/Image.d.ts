import { IGeneralIconProperties } from '#base';
export interface IImageProps extends IGeneralIconProperties {
    /**
     * Ширина картинки в пикселях
     */
    width?: number;
    /**
     * Высота изображения в пикселях
     */
    height?: number;
    /**
     * Настройки CORS запросов для данных получаемых элементом
     */
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
}
export declare const Image: import("react").MemoExoticComponent<(props: IImageProps) => import("react/jsx-runtime").JSX.Element | null>;
//# sourceMappingURL=Image.d.ts.map