/**
 * Пространство между элементами
 */
export type TElementSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const TElementSpacings: readonly TElementSpacing[];
export declare const instanceOfElementSpacing: (value: any) => value is TElementSpacing;
export declare const castToElementSpacing: (value: any) => TElementSpacing | undefined;
//# sourceMappingURL=ElementSpacing.d.ts.map