/**
 * Пространство между элементами
 */
export type TElementSpacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export declare const TElementSpacings: readonly TElementSpacing[];
export declare const instanceOfElementSpacing: (value: unknown) => value is TElementSpacing;
export declare const castToElementSpacing: (value: unknown) => TElementSpacing | undefined;
//# sourceMappingURL=ElementSpacing.d.ts.map