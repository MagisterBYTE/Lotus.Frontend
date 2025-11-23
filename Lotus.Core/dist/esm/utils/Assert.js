/* eslint-disable @typescript-eslint/no-explicit-any */
export class Assert {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static emptyValue(value) {
        return value == undefined || value == null || (typeof value === 'string' && value == '');
    }
    /**
     * Проверка на наличие значения
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static existValue(value) {
        const status = (value != undefined && value != null);
        if (status) {
            if (typeof value === 'string') {
                if (value === '')
                    return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Метод возвращает true если хотя бы один из аргументов при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static anyTrue(...args) {
        for (const arg of args) {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(arg)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allTrue(...args) {
        // Перебираем все аргументы с помощью цикла for...of
        for (const arg of args) {
            // Если хотя бы один аргумент преобразуется в false,
            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(arg)) {
                // немедленно возвращаем false (короткое замыкание)
                return false;
                // ↑
                // Не проверяем остальные аргументы, так как уже нашли false
            }
        }
        // Если ВСЕ аргументы преобразовались в true, возвращаем true
        // Также возвращает true для пустого списка аргументов
        return true;
    }
    /**
     * Метод возвращает false если хотя бы один из аргументов при преобразовании в Boolean дает false
     * @param args Список аргументов
     * @returns
     */
    static anyFalse(...args) {
        for (const arg of args) {
            if (Boolean(arg) === false) {
                return true;
            }
        }
        return false;
    }
    /**
     * Метод возвращает true если все аргументы при преобразовании в Boolean дает true
     * @param args Список аргументов
     * @returns
     */
    static allFalse(...args) {
        for (const arg of args) {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(arg)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static objectPropertyEmpty(object) {
        return !Object.values(object).some((value) => value !== undefined);
    }
}
//# sourceMappingURL=Assert.js.map