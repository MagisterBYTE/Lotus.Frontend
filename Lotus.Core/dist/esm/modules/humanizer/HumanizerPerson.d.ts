import { IPersonInfo } from './PersonInfo';
import { TPersonNameFormat } from './PersonNameFormat';
export declare abstract class HumanizerPerson {
    /**
     * Возвращает краткое имя в формате "Фамилия И. О." (официальный формат).
     * Пример: "Иванов И. И." или "Иванов А." при отсутствии отчества.
     * @param personInfo Объект с персональными данными пользователя.
     * @param skipIfNameEmpty Если true, возвращает пустую строку при отсутствии имени.
     *                        Если false, пытается сформировать имя только из фамилии.
     * @returns Отформатированное краткое имя или пустая строка, если недостаточно данных.
     * @remarks Алгоритм:
     * 1. Приоритет: Фамилия + инициалы имени и отчества
     * 2. Если имя отсутствует, но указана фамилия и skipIfNameEmpty=false - возвращается только фамилия
     * 3. Если данных недостаточно - возвращается пустая строка
     */
    static getShortName(personInfo: IPersonInfo | null | undefined, skipIfNameEmpty?: boolean): string;
    /**
     * Возвращает отображаемое имя в неформальном стиле "Имя Фамилия".
     * Пример: "Иван Иванов".
     * @param personInfo Объект с персональными данными пользователя.
     * @param includePatronymic Если true, добавляет отчество в формате "Иван Иванович Иванов" (для некоторых культур).
     *                          По умолчанию false.
     * @param fallbackToShortName Если true, при отсутствии имени возвращает краткий формат (фамилию с инициалами).
     *                            Если false, возвращает пустую строку.
     * @returns Удобочитаемое имя для отображения в интерфейсах.
     * @remarks Алгоритм:
     * 1. Основной формат: Имя + Фамилия (западный стиль)
     * 2. При необходимости можно включить отчество (менее распространено)
     * 3. Имеет fallback на краткое имя при отсутствии имени
     */
    static getDisplayName(personInfo: IPersonInfo | null | undefined, includePatronymic?: boolean, fallbackToShortName?: boolean): string;
    /**
     * Возвращает полное имя в формате "Фамилия Имя Отчество".
     * Пример: "Иванов Иван Иванович".
     * @param personInfo Объект с персональными данными пользователя.
     * @param skipMiddleNameIfEmpty Если true, пропускает отчество при его отсутствии (формат "Фамилия Имя").
     *                              Если false, всегда использует трехчастный формат, даже если отчество пустое.
     * @returns Отформатированное полное имя или пустая строка, если недостаточно данных.
     * @remarks Алгоритм:
     * 1. Минимально необходимые данные: Фамилия и Имя
     * 2. Отчество добавляется при наличии или если skipMiddleNameIfEmpty=false
     * 3. Все части разделяются одним пробелом
     */
    static getFullName(personInfo: IPersonInfo | null | undefined, skipMiddleNameIfEmpty?: boolean): string;
    /**
     * Возвращает инициалы в формате "ИИ" (первые буквы имени и фамилии).
     * Используется для аватаров, сокращений.
     * Пример: "ИИ" для Ивана Иванова.
     * @param personInfo Объект с персональными данными пользователя.
     * @returns Двухбуквенные инициалы или пустая строка.
     */
    static getInitials(personInfo: IPersonInfo | null | undefined): string;
    /**
     * Универсальный метод для получения имени в указанном формате.
     * @param personInfo Объект с персональными данными пользователя.
     * @param format Формат имени: Short, Full, Display, или Initials.
     * @returns Имя в запрошенном формате.
     */
    static getFormattedName(personInfo: IPersonInfo | null | undefined, format: TPersonNameFormat): string;
    /**
     * Возвращает фамилию с инициалами имени и отчества.
     * Если фамилия отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
     *
     * @param lastName Фамилия (может быть null или undefined).
     * @param firstName Имя (может быть null или undefined).
     * @param patronymic Отчество (может быть null или undefined).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
     * @returns Строка с фамилией и инициалами (например, "Иванов И.И.") или заменитель, если фамилия отсутствует.
     */
    static getLastNameWithInitials(lastName: string | null | undefined, firstName: string | null | undefined, patronymic: string | null | undefined, substitutes?: Array<string | null | undefined>): string;
    /**
     * Возвращает имя и отчество.
     * Если имя отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
     *
     * @param firstName Имя (может быть null или undefined).
     * @param patronymic Отчество (может быть null или undefined).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если имя отсутствует.
     * @returns Строка с именем и отчеством (например, "Иван Иванович") или заменитель, если имя отсутствует.
     */
    static getNameWithPatronymic(firstName: string | null | undefined, patronymic: string | null | undefined, substitutes?: Array<string | null | undefined>): string;
    /**
     * Возвращает полное имя (фамилия, имя и отчество).
     * Если фамилия отсутствует, возвращает имя и отчество с использованием метода getNameWithPatronymic.
     *
     * @param lastName Фамилия (может быть null или undefined).
     * @param firstName Имя (может быть null или undefined).
     * @param patronymic Отчество (может быть null или undefined).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
     * @returns Строка с полным именем (например, "Иванов Иван Иванович") или имя и отчество, если фамилия отсутствует.
     */
    static getNameWithLastNameWithPatronymic(lastName: string | null | undefined, firstName: string | null | undefined, patronymic: string | null | undefined, substitutes?: Array<string | null | undefined>): string;
}
//# sourceMappingURL=HumanizerPerson.d.ts.map