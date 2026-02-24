import { IImageDatabase, IImageResource } from 'lotus-core/resources/image';
import { BrowserHelper, ImageHelper } from 'lotus-core/helpers';

const images: IImageResource[] = [
  {
    id: 1,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  },
  {
    id: 2,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'
  },
  {
    id: 3,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png'
  },
  {
    id: 4,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png'
  },
  {
    id: 5,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'
  },
  {
    id: 6,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png'
  },
  {
    id: 7,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
  },
  {
    id: 8,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
  },
  {
    id: 9,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
  },
  {
    id: 10,
    name: 'avatar',
    source: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png'
  }
];

export const ImageDatabase: IImageDatabase = {
  getAllImages: function (): IImageResource[]
  {
    return images;
  },
  getImageByIdOrName: function (id?: number | string, category?: string): IImageResource | undefined
  {
    if (typeof id === 'number') return images.find((x) => x.id == id);
    if (typeof id === 'string') return images.find((x) => x.name == id);
  },
  getImage: function (image?: any, category?: string): IImageResource | undefined
  {
    if (typeof image === 'number') return images.find((x) => x.id == image);

    if (typeof image === 'string')
    {
      if (ImageHelper.isDataURL(image) || BrowserHelper.isAbsoluteUrl(image))
      {
        return images.find((x) => x.source == image);
      } else
      {
        return images.find((x) => x.name == image);
      }
    }
  }
};
