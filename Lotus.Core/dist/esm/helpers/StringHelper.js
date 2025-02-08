export class StringHelper {
    /**
     * see for details: https://stackoverflow.com/a/2140644
     * (warning: function may not work with Unicode special characters)
     */
    static equalIgnoreCase(first, second) {
        return first.toLocaleUpperCase() === second.toLocaleUpperCase();
    }
    /**
     *
     * @param value
     * @returns
     */
    static isNullOrEmpty(value) {
        return value === undefined || value === null || value.trim() === '';
    }
    /**
     *
     * @param value
     * @returns
     */
    static capitalizeFirstLetter(value) {
        if (value.length > 0) {
            return value[0].toLocaleUpperCase() + value.slice(1);
        }
        return value;
    }
    /**
     *
     * @param value
     * @returns
     */
    static lowercaseFirstLetter(value) {
        if (value.length > 0) {
            return value[0].toLocaleLowerCase() + value.slice(1);
        }
        return value;
    }
    /**
     *
     * @param value
     * @returns
     */
    static toUpperCaseAllFirstLetters(value) {
        return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    }
}
