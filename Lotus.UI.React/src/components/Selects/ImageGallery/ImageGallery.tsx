 
import { IImageResource } from 'lotus-core/resources/image';
import { Primitive } from '#components/Common';
import { GallerySelect, IGallerySelectProps } from '../GallerySelect';

export interface IImageGalleryProps extends Omit<IGallerySelectProps<IImageResource>, 'items'|'selectedItem'>
{
  /**
   * Выбранное изображение
   */
  selectedImage: unknown;

  /**
   * Ширина картинки в пикселях
   */
  width?: number

  /**
   * Высота изображения в пикселях
   */
  height?: number
}
 
export function ImageGallery(props: IImageGalleryProps) 
{
  const { selectedImage, width, height, imageDatabase, size } = props;

  if (!imageDatabase) return <>Image Database empty</>;

  const images = imageDatabase.getAllImages();

  const selectedItem = imageDatabase.getImage(selectedImage);

  // #region Render
  const renderValue = (item?: IImageResource) => 
  {
    if (!item) return <></>;
    return <Primitive.Image height={height} icon={item.source} iconSize={size} width={width} />;
  };

  const renderItem = (item?: IImageResource) => 
  {
    if (!item) return <></>;
    return <Primitive.Image height={height} icon={item.source} iconSize={size} width={width} />;
  };

  // #endregion

  return (<GallerySelect items={images} {...props} renderItem={renderItem}
    renderValue={renderValue} selectedItem={selectedItem}
  />);
}
