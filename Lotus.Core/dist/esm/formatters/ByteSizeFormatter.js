import { LocalizationCore, LocalizationDispatcher } from '../localization';
import { NumberFormatter } from './NumberFormatter';
export class ByteSizeFormatter {
    /**
     *
     * @param sizeInBytes
     * @returns
     */
    static byteSize(sizeInBytes, locale = LocalizationDispatcher.currentLanguage) {
        let size = sizeInBytes / 1024;
        if (size < 1000) {
            return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Kb}`;
        }
        size = size / 1024;
        if (size < 1000) {
            return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Mb}`;
        }
        size = size / 1024;
        return `${NumberFormatter.numberFixed(size, 2, locale)} ${LocalizationCore.data.byteSize.Gb}`;
    }
    ;
}
