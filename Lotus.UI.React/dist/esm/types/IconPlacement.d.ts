/**
 * Массив доступных вариантов размещения иконки
 */
export declare const TIconPlacementValues: readonly ["left", "right", "top", "bottom"];
/**
 * Вариант размещения иконки
 */
export type TIconPlacement = (typeof TIconPlacementValues)[number];
/**
 * Enum варианта размещения иконки
 */
export declare const TIconPlacements: {
    readonly Left: "left";
    readonly Right: "right";
    readonly Top: "top";
    readonly Bottom: "bottom";
    readonly getAllValues: () => typeof TIconPlacementValues;
    readonly isIconPlacement: (value: unknown) => value is TIconPlacement;
    readonly getByIndex: (index: number) => TIconPlacement | undefined;
    readonly getByName: (name: string) => TIconPlacement | undefined;
};
//# sourceMappingURL=IconPlacement.d.ts.map