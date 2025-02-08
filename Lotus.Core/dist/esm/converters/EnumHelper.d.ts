export declare class EnumConverter {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues<TEnum>(enumValue: Record<string, TEnum>): TEnum[];
    static getNames<TEnum>(enumValue: Record<string, TEnum>): string[];
}
