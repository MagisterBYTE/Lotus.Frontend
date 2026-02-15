/**
 * Массив доступных ориентаций
 */
export declare const TOrientationValues: readonly ["horizontal", "vertical"];
/**
 * Ориентация
 */
export type TOrientation = (typeof TOrientationValues)[number];
/**
 * Enum типа ориентации
 */
export declare const TOrientations: {
    readonly Horizontal: "horizontal";
    readonly Vertical: "vertical";
    readonly getAllValues: () => typeof TOrientationValues;
    readonly isOrientation: (value: unknown) => value is TOrientation;
    readonly getByIndex: (index: number) => TOrientation | undefined;
    readonly getByName: (name: string) => TOrientation | undefined;
};
//# sourceMappingURL=Orientation.d.ts.map