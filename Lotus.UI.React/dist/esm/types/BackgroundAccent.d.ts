/**
 * Массив доступных акцентов фона
 */
export declare const TBackgroundAccentValues: readonly ["accent", "glass"];
/**
 * Тип акцента фона
 */
export type TBackgroundAccent = (typeof TBackgroundAccentValues)[number];
/**
 * Enum типа акцента фона
 */
export declare const TBackgroundAccents: {
    readonly Accent: "accent";
    readonly Glass: "glass";
    readonly getAllValues: () => typeof TBackgroundAccentValues;
    readonly isBackgroundAccent: (value: unknown) => value is TBackgroundAccent;
    readonly getByIndex: (index: number) => TBackgroundAccent | undefined;
    readonly getByName: (name: string) => TBackgroundAccent | undefined;
};
//# sourceMappingURL=BackgroundAccent.d.ts.map