/**
 * Определение размера
 */
export type TSizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export declare const TSizeTypes: readonly TSizeType[];
export declare const instanceOfSizeType: (value: unknown) => value is TSizeType;
export declare const castToSizeType: (value: unknown) => TSizeType | undefined;
//# sourceMappingURL=SizeType.d.ts.map