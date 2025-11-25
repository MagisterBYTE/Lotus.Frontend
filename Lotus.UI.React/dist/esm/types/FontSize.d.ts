/**
 * Размер шрифта
 */
export type TFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const TFontSizes: readonly TFontSize[];
export declare const instanceOfFontSize: (value: unknown) => value is TFontSize;
export declare const castToFontSize: (value: unknown) => TFontSize | undefined;
//# sourceMappingURL=FontSize.d.ts.map