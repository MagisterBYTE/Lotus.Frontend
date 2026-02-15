/**
 * Массив доступных акцентов шрифта
 */
export declare const TFontAccentValues: readonly ["default", "accent", "monospace"];
/**
 * Тип акцента шрифта
 */
export type TFontAccent = (typeof TFontAccentValues)[number];
/**
 * Enum типа акцента шрифта
 */
export declare const TFontAccents: {
    readonly Default: "default";
    readonly Accent: "accent";
    readonly Monospace: "monospace";
    readonly getAllValues: () => typeof TFontAccentValues;
    readonly isFontAccent: (value: unknown) => value is TFontAccent;
    readonly getByIndex: (index: number) => TFontAccent | undefined;
    readonly getByName: (name: string) => TFontAccent | undefined;
};
//# sourceMappingURL=FontAccent.d.ts.map