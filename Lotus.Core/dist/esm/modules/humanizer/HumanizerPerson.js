import { StringHelper } from '#helpers';
export class HumanizerPerson {
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
    static getShortName(personInfo, skipIfNameEmpty = true) {
        if (!personInfo)
            return '';
        const surname = personInfo.surname?.trim();
        if (!surname)
            return '';
        const name = personInfo.name?.trim();
        const patronymic = personInfo.patronymic?.trim();
        // Если имя отсутствует и нужно пропустить
        if (!name && skipIfNameEmpty)
            return '';
        // Если нет имени, но разрешено показывать только фамилию
        if (!name && !skipIfNameEmpty)
            return surname;
        // Формируем инициал имени
        const nameInitial = name ? `${name[0]}.` : '';
        // Формируем инициал отчества, если есть
        const patronymicInitial = patronymic ? ` ${patronymic[0]}.` : '';
        return `${surname} ${nameInitial}${patronymicInitial}`.trim();
    }
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
    static getDisplayName(personInfo, includePatronymic = false, fallbackToShortName = true) {
        if (!personInfo)
            return '';
        const name = personInfo.name?.trim();
        const surname = personInfo.surname?.trim();
        const patronymic = personInfo.patronymic?.trim();
        // Если нет имени
        if (!name) {
            return fallbackToShortName ? this.getShortName(personInfo, false) : '';
        }
        // Формируем базовую строку с именем
        let result = name;
        // Добавляем отчество, если требуется
        if (includePatronymic && patronymic) {
            result = `${result} ${patronymic}`;
        }
        // Добавляем фамилию, если есть
        if (surname) {
            result = `${result} ${surname}`;
        }
        return result;
    }
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
    static getFullName(personInfo, skipMiddleNameIfEmpty = true) {
        if (!personInfo)
            return '';
        const surname = personInfo.surname?.trim();
        const name = personInfo.name?.trim();
        // Проверяем наличие обязательных данных
        if (!surname || !name)
            return '';
        const patronymic = personInfo.patronymic?.trim();
        // Если есть отчество
        if (patronymic) {
            return `${surname} ${name} ${patronymic}`;
        }
        // Если нет отчества
        if (skipMiddleNameIfEmpty) {
            return `${surname} ${name}`;
        }
        // Если нужно всегда показывать три части
        return `${surname} ${name} `;
    }
    /**
     * Возвращает инициалы в формате "ИИ" (первые буквы имени и фамилии).
     * Используется для аватаров, сокращений.
     * Пример: "ИИ" для Ивана Иванова.
     * @param personInfo Объект с персональными данными пользователя.
     * @returns Двухбуквенные инициалы или пустая строка.
     */
    static getInitials(personInfo) {
        if (!personInfo)
            return '';
        const nameInitial = personInfo.name?.trim()?.[0] || '';
        const surnameInitial = personInfo.surname?.trim()?.[0] || '';
        return `${nameInitial}${surnameInitial}`.toUpperCase();
    }
    /**
     * Универсальный метод для получения имени в указанном формате.
     * @param personInfo Объект с персональными данными пользователя.
     * @param format Формат имени: Short, Full, Display, или Initials.
     * @returns Имя в запрошенном формате.
     */
    static getFormattedName(personInfo, format) {
        switch (format) {
            case 'short':
                return HumanizerPerson.getShortName(personInfo);
            case 'full':
                return HumanizerPerson.getFullName(personInfo);
            case 'display':
                return HumanizerPerson.getDisplayName(personInfo);
            case 'initials':
                return HumanizerPerson.getInitials(personInfo);
            default:
                return HumanizerPerson.getDisplayName(personInfo);
        }
    }
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
    static getLastNameWithInitials(lastName, firstName, patronymic, substitutes) {
        // Если фамилия отсутствует, возвращаем первый непустой заменитель или пустую строку
        if (!lastName) {
            return (substitutes && substitutes.find((sub) => !!sub)) || '';
        }
        // Формируем строку с фамилией и инициалами
        return StringHelper.toUpperCaseAllFirstLetters(`${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`);
    }
    /**
     * Возвращает имя и отчество.
     * Если имя отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
     *
     * @param firstName Имя (может быть null).
     * @param patronymic Отчество (может быть null).
     * @param substitutes Массив строк-заменителей, которые будут использованы, если имя отсутствует.
     * @returns Строка с именем и отчеством (например, "Иван Иванович") или заменитель, если имя отсутствует.
     */
    static getNameWithPatronymic(firstName, patronymic, substitutes) {
        // Если имя отсутствует, возвращаем первый непустой заменитель или пустую строку
        if (!firstName) {
            return (substitutes && substitutes.find((sub) => !!sub)) || '';
        }
        // Формируем строку с именем и отчеством
        return StringHelper.toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
    }
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
    static getNameWithLastNameWithPatronymic(lastName, firstName, patronymic, substitutes) {
        // Если фамилия отсутствует, возвращаем имя и отчество
        if (!lastName) {
            return HumanizerPerson.getNameWithPatronymic(firstName, patronymic, substitutes);
        }
        // Получаем имя и отчество
        const nameWithPatronymic = HumanizerPerson.getNameWithPatronymic(firstName, patronymic);
        // Если имя и отчество существуют, добавляем их к фамилии
        if (nameWithPatronymic) {
            return StringHelper.toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
        }
        else {
            // Если имя и отчество отсутствуют, возвращаем только фамилию
            return StringHelper.toUpperCaseAllFirstLetters(lastName);
        }
    }
}
//# sourceMappingURL=HumanizerPerson.js.map