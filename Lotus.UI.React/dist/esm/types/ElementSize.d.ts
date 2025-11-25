/**
 * Размер элемента UI
 */
export type TElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const TElementSizes: readonly TElementSize[];
export declare const instanceOfElementSize: (value: unknown) => value is TElementSize;
export declare const castToElementSize: (value: unknown) => TElementSize | undefined;
//# sourceMappingURL=ElementSize.d.ts.map