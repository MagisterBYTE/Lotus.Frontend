import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { TColorVariantName } from './ColorVariantsTypes';
/**
 * Доступный цвет (может быть цветом темы палитры, семантическим цветом, в том числе с учетом вариативности)
 */
export type TColorToken = `${TColorPalette | TColorSemantic}${Capitalize<TColorVariantName>}` | TColorPalette | TColorSemantic;
export type TColorTokenTupleSemantic = {
    colorSemantic: TColorSemantic;
    colorPalette?: never;
    colorVariant?: TColorVariantName;
};
export type TColorTokenTuplePalette = {
    colorSemantic?: never;
    colorPalette: TColorPalette;
    colorVariant: TColorVariantName;
};
export type TColorTokenTuple = TColorTokenTupleSemantic | TColorTokenTuplePalette;
/**
 * Массив всех возможных типов TColorTokens
 * TColorSemantic типы расположены в начале массива
 */
export declare const TColorTokens: TColorToken[];
//# sourceMappingURL=ColorToken.d.ts.map