export declare abstract class HumanizerPerson {
    /**
     * Возвращает фамилию с инициалами имени и отчества.
     * Если фамилия отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
     *
     * @param lastName Фамилия (может быть null).
     * @param firstName Имя (может быть null).
     * @param patronymic Отчество (может быть null).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
     * @returns Строка с фамилией и инициалами (например, "Иванов И.И.") или заменитель, если фамилия отсутствует.
     */
    static getLastNameWithInitials(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string;
    /**
     * Возвращает имя и отчество.
     * Если имя отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
     *
     * @param firstName Имя (может быть null).
     * @param patronymic Отчество (может быть null).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если имя отсутствует.
     * @returns Строка с именем и отчеством (например, "Иван Иванович") или заменитель, если имя отсутствует.
     */
    static getNameWithPatronymic(firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string;
    /**
     * Возвращает полное имя (фамилия, имя и отчество).
     * Если фамилия отсутствует, возвращает имя и отчество с использованием метода getNameWithPatronymic.
     *
     * @param lastName Фамилия (может быть null).
     * @param firstName Имя (может быть null).
     * @param patronymic Отчество (может быть null).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
     * @returns Строка с полным именем (например, "Иванов Иван Иванович") или имя и отчество, если фамилия отсутствует.
     */
    static getFullName(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string;
}
//# sourceMappingURL=HumanizerPerson.d.ts.map