/**
 * Массив возможных значений эффекта для текста
 */
export declare const TTextEffectValues: readonly ["shadow", "stroke", "glow"];
/**
 * Тип эффекта для текста
 */
export type TTextEffect = (typeof TTextEffectValues)[number];
/**
 * Enum типа эффекта для текста
 */
export declare const TTextEffects: {
    readonly Shadow: "shadow";
    readonly Stroke: "stroke";
    readonly Glow: "glow";
    readonly getAllValues: () => typeof TTextEffectValues;
    readonly isTextEffect: (value: unknown) => value is TTextEffect;
    readonly getByIndex: (index: number) => TTextEffect | undefined;
    readonly getByName: (name: string) => TTextEffect | undefined;
};
//# sourceMappingURL=TextEffect.d.ts.map