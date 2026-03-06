/**
 * Массив доступных значений вариантов кнопки
 */
export declare const TButtonVariantValues: readonly ["default", "light", "gray", "coffee"];
/**
 * Тип варианта кнопки
 */
export type TButtonVariant = (typeof TButtonVariantValues)[number];
/**
 * Варианта кнопки
 */
export declare const TButtonVariants: {
    readonly Default: "default";
    readonly Light: "light";
    readonly Gray: "gray";
    readonly Coffee: "coffee";
    readonly getAllValues: () => typeof TButtonVariantValues;
    readonly isButtonVariant: (value: unknown) => value is TButtonVariant;
    readonly getByIndex: (index: number) => TButtonVariant | undefined;
    readonly getByName: (name: string) => TButtonVariant | undefined;
};
//# sourceMappingURL=ButtonVariant.d.ts.map