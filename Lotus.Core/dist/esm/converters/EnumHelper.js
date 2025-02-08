export class EnumConverter {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues(enumValue) {
        return Object.keys(enumValue).map((key) => enumValue[key]);
    }
    static getNames(enumValue) {
        return Object.keys(enumValue).map((key) => key);
    }
}
