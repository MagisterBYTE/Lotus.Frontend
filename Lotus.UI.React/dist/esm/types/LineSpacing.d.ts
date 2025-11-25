/**
 * Пространство между строк текста (межстроковый интервал)
 */
export type TLineSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const TLineSpacings: readonly TLineSpacing[];
export declare const instanceOfLineSpacing: (value: unknown) => value is TLineSpacing;
export declare const castToLineSpacing: (value: unknown) => TLineSpacing | undefined;
//# sourceMappingURL=LineSpacing.d.ts.map