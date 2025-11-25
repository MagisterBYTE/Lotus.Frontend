/**
 * Размер радиуса скругления элемента UI
 */
export type TElementRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare const TElementRadiuses: readonly TElementRadius[];
export declare const instanceOfElementRadius: (value: unknown) => value is TElementRadius;
export declare const castToElementRadius: (value: unknown) => TElementRadius | undefined;
//# sourceMappingURL=ElementRadius.d.ts.map