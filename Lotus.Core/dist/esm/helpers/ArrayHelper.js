export class ArrayHelper {
    /**
     * Находит максимальное значение в массиве чисел.
     *
     * @param {number[]} array - Исходный массив чисел
     * @returns {number} Максимальное значение в массиве
     * @throws {Error} Если массив пустой
     *
     * @example
     * const max = ArrayHelper.max([1, 5, 3, 2]); // 5
     */
    static max(array) {
        if (array.length === 0) {
            throw new Error('Array cannot be empty');
        }
        return Math.max(...array);
    }
    /**
     * Находит максимальное значение в массиве объектов по указанному ключу.
     *
     * @template TItem - Тип объектов в массиве
     * @param {TItem[]} array - Исходный массив объектов
     * @param {keyof TItem} key - Ключ, по которому производится сравнение
     * @returns {TItem} Объект с максимальным значением по указанному ключу
     * @throws {Error} Если массив пустой или ключ не существует
     *
     * @example
     * const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
     * const oldest = ArrayHelper.maxBy(users, 'age'); // { age: 30 }
     */
    static maxBy(array, key) {
        if (array.length === 0) {
            throw new Error('Array cannot be empty');
        }
        return array.reduce((max, current) => {
            return current[key] > max[key] ? current : max;
        });
    }
    /**
     * Находит минимальное значение в массиве чисел.
     *
     * @param {number[]} array - Исходный массив чисел
     * @returns {number} Минимальное значение в массиве
     * @throws {Error} Если массив пустой
     *
     * @example
     * const min = ArrayHelper.min([1, 5, 3, 2]); // 1
     */
    static min(array) {
        if (array.length === 0) {
            throw new Error('Array cannot be empty');
        }
        return Math.min(...array);
    }
    /**
     * Находит минимальное значение в массиве объектов по указанному ключу.
     *
     * @template TItem - Тип объектов в массиве
     * @param {TItem[]} array - Исходный массив объектов
     * @param {keyof TItem} key - Ключ, по которому производится сравнение
     * @returns {TItem} Объект с минимальным значением по указанному ключу
     * @throws {Error} Если массив пустой или ключ не существует
     *
     * @example
     * const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
     * const youngest = ArrayHelper.minBy(users, 'age'); // { age: 20 }
     */
    static minBy(array, key) {
        if (array.length === 0) {
            throw new Error('Array cannot be empty');
        }
        return array.reduce((min, current) => {
            return current[key] < min[key] ? current : min;
        });
    }
    /**
     * Пропускает указанное количество элементов и возвращает новый массив.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} count - Количество элементов для пропуска
     * @returns {TItem[]} Новый массив без первых count элементов
     *
     * @example
     * const result = ArrayHelper.skip([1, 2, 3, 4, 5], 2); // [3, 4, 5]
     * @example
     * const result = ArrayHelper.skip([1, 2, 3], 5); // []
     */
    static skip(array, count) {
        return array.slice(count);
    }
    /**
     * Берет указанное количество элементов с начала массива и возвращает новый массив.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} count - Количество элементов для взятия
     * @returns {TItem[]} Новый массив с первыми count элементами
     *
     * @example
     * const result = ArrayHelper.take([1, 2, 3, 4, 5], 3); // [1, 2, 3]
     * @example
     * const result = ArrayHelper.take([1, 2, 3], 5); // [1, 2, 3]
     */
    static take(array, count) {
        return array.slice(0, count);
    }
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static createNumber(from, to) {
        const result = [];
        for (let i = from; i <= to; i++) {
            result.push(i);
        }
        return result;
    }
    /**
     * Проверка массива что он является строго числовым
     * @param array Проверяемый массив
     * @returns Статус проверки
     */
    static checkIsNumbers(array) {
        return array.every((element) => {
            return typeof element === 'number';
        });
    }
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param array Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkIn(array, checked) {
        let find = false;
        for (const element of array) {
            find = checked.includes(element);
            if (find) {
                break;
            }
        }
        return find;
    }
    /**
     * Группировка массива по указанному ключу key
     * @param array Исходный массив
     * @param key Ключ по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupBy(array, key) {
        const result = [];
        for (const item of array) {
            const value = item[key];
            const exist = result.find((x) => x.groupKey === value);
            if (exist) {
                exist.items.push(item);
            }
            else {
                const newUserGroup = { groupKey: value, items: [item] };
                result.push(newUserGroup);
            }
        }
        return result;
    }
    /**
     * Получает массив уникальный по ключу key
     * @param array Массив
     * @param key Ключ уникальности
     * @returns Массив уникальный по ключу key
     */
    static uniqueBy(array, key) {
        const seen = new Set();
        return array.filter((item) => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }
    /**
     * Проверка массива на наличие дубликатов
     *
     * @param array Массив
     * @param key Ключ по которому идет проверка
     * @returns Статус проверки
     */
    static hasDuplicatedBy(array, key) {
        const newArray = array.map((element) => element[key]);
        return new Set(newArray).size !== newArray.length;
    }
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений)
     * @param array Исходный массив объектов
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Новый массив без удаленных элементов
     */
    static toRemoveBy(array, key, value) {
        const valuesToRemove = Array.isArray(value) ? value : [value];
        return array.filter((item) => {
            const itemValue = item[key];
            return !valuesToRemove.includes(itemValue);
        });
    }
    /**
     * Удаляет элементы из массива по ключу и значению (или массиву значений), мутируя исходный массив
     * @param array Исходный массив объектов (будет мутирован)
     * @param key Ключ, по которому производится поиск
     * @param value Значение или массив значений для удаления
     * @returns Количество удаленных элементов
     */
    static removeBy(array, key, value) {
        const valuesToRemove = Array.isArray(value) ? value : [value];
        let removedCount = 0;
        for (let i = array.length - 1; i >= 0; i--) {
            const itemValue = array[i][key];
            if (valuesToRemove.includes(itemValue)) {
                array.splice(i, 1);
                removedCount++;
            }
        }
        return removedCount;
    }
    /**
     * Вставка данных в указанный массив, мутируя исходный массив
     * @param array Исходный массив (будет мутирован)
     * @param index Индекс вставки
     * @param direction Направление вставки
     * @param value Значение или массив значений для вставки
     */
    static insert(array, index, direction, value) {
        const elementsToInsert = Array.isArray(value) ? value : [value];
        if (index < 0) {
            if (Array.isArray(value)) {
                array.push(...value);
            }
            else {
                array.push(value);
            }
            return;
        }
        // Корректируем индекс в зависимости от направления вставки
        let insertIndex = index;
        if (direction === 'lower') {
            // Вставка ниже указанного индекса (после элемента)
            insertIndex = index + 1;
        }
        else if (direction === 'end') {
            // Вставка в конец массива
            insertIndex = array.length;
        }
        // Если direction === 'Upper', вставка происходит на место index (перед элементом)
        // Вставляем элементы
        array.splice(insertIndex, 0, ...elementsToInsert);
    }
    /**
     * Вставка данных в указанный массив
     * @param array Исходный массив (будет мутирован)
     * @param index Индекс вставки
     * @param direction Направление вставки
     * @param value Значение или массив значений для вставки
     * @returns Новый массив с данными
     */
    static toInsert(array, index, direction, value) {
        const newArray = [...array];
        ArrayHelper.insert(newArray, index, direction, value);
        return newArray;
    }
    /**
     * Возвращает срез массива, соответствующий указанной странице.
     *
     * @template TItem - Тип элементов массива
     * @param {TItem[]} array - Исходный массив
     * @param {number} pageNumber - Номер страницы (отсчет от нуля)
     * @param {number} pageSize - Размер страницы (количество элементов на странице). По умолчанию 10
     * @returns {TItem[]} Массив элементов для указанной страницы
     *
     * @example
     * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
     *
     * // Получить первую страницу (элементы 0-9)
     * const page1 = ArrayHelper.slicePage(array, 0, 10);
     * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
     *
     * // Получить вторую страницу (элементы 10-11)
     * const page2 = ArrayHelper.slicePage(array, 1, 10);
     * // [11, 12]
     *
     * // Получить третью страницу (пустой массив, так как элементов нет)
     * const page3 = ArrayHelper.slicePage(array, 2, 10);
     * // []
     *
     * // Работа с пользователями из примера Persons
     * const page1Users = ArrayHelper.slicePage(Persons, 0, 10);
     * const page2Users = ArrayHelper.slicePage(Persons, 1, 10);
     * const page3Users = ArrayHelper.slicePage(Persons, 2, 10);
     * const page4Users = ArrayHelper.slicePage(Persons, 3, 10);
     * const page5Users = ArrayHelper.slicePage(Persons, 4, 10); // Последняя страница с 6 элементами
     */
    static slicePage(array, pageNumber, pageSize = 10) {
        if (pageNumber < 0) {
            throw new Error('Page number cannot be negative');
        }
        if (pageSize <= 0) {
            throw new Error('Page size must be greater than 0');
        }
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        return array.slice(startIndex, endIndex);
    }
    /**
     * Меняет местами элементы массива по указанным индексам.
     * @template TItem - Тип элементов массива.
     * @param {TItem[]} array - Массив, в котором нужно поменять элементы местами.
     * @param {number} oldIndex - Индекс элемента, который нужно переместить.
     * @param {number} newIndex - Индекс элемента, с которым нужно поменять местами.
     */
    static swapItem(array, oldIndex, newIndex) {
        const temp = array[newIndex];
        array[newIndex] = array[oldIndex];
        array[oldIndex] = temp;
    }
    /**
     * Перемещает элемент массива из одной позиции в другую.
     * Если новый индекс выходит за пределы массива, массив расширяется пустыми элементами (`undefined`).
     * @template TItem - Тип элементов массива.
     * @param {TItem[]} array - Массив, в котором нужно переместить элемент.
     * @param {number} oldIndex - Индекс элемента, который нужно переместить.
     * @param {number} newIndex - Новый индекс, куда нужно переместить элемент.
     */
    static moveItem(array, oldIndex, newIndex) {
        if (newIndex >= array.length) {
            let k = newIndex - array.length + 1;
            while (k--) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                array.push(undefined);
            }
        }
        // Удаляем элемент из старой позиции и вставляем в новую
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    }
}
//# sourceMappingURL=ArrayHelper.js.map