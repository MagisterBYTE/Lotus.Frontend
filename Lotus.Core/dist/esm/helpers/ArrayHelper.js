export class ArrayHelper {
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static getNumberArrayFromTo(from, to) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static checkIsNumbers(array) {
        return array.every((element) => {
            return typeof element === 'number';
        });
    }
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param source Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkInArrayAny(source, checked) {
        let find = true;
        for (const element of source) {
            find = checked.includes(element);
            if (find) {
                break;
            }
        }
        return find;
    }
    /**
     * Группировка массива по указанному свойству
     * @param source Исходный массив
     * @param propertyName Имя свойства по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupByProperty(source, propertyName) {
        const result = [];
        source.forEach((element) => {
            // @ts-expect-error propertyName
            const key = element[propertyName];
            const exist = result.find((x) => x.groupKey === key);
            if (exist) {
                exist.items.push(element);
            }
            else {
                const newUserGroup = { groupKey: key, items: [element] };
                result.push(newUserGroup);
            }
        });
        return result;
    }
}
