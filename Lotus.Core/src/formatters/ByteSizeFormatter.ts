import { LocalizationCore, LocalizationCoreDispatcher, TLanguageType } from '#localization';
import { NumberFormatter } from './NumberFormatter';

export abstract class ByteSizeFormatter
{
  /**
   * 
   * @param sizeInBytes 
   * @returns 
   */
  public static byteSize(sizeInBytes: number, locale: TLanguageType = LocalizationCoreDispatcher.currentLanguage): string
  {
    let size = sizeInBytes / 1024;
    if (size < 1000) 
    {
      return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Kb}`;
    }

    size = size / 1024;
    if (size < 1000) 
    {
      return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Mb}`;
    }

    size = size / 1024;
    return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Gb}`;
  };
}