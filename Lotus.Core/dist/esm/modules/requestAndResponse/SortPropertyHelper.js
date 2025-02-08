/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTimeConverter } from '../../converters';
import { StringHelper, BooleanHelper, NumberHelper, DateTimeHelper } from '../../helpers';
export class SortPropertyHelper {
    /**
     * Сортировка массива по указанному свойству сортировки
     * @param massive Исходный массив
     * @param sortProperty Параметры сортировки свойства
     * @returns Отсортированный массив
     */
    static sortArrayByProperty(massive, sortProperty) {
        const propertyType = sortProperty.propertyTypeDesc.type;
        const result = [...massive];
        const key = StringHelper.lowercaseFirstLetter(sortProperty.propertyPath);
        switch (propertyType) {
            case 'Boolean':
                {
                    return result.sort((a, b) => {
                        const l = BooleanHelper.parse(a[key]);
                        const r = BooleanHelper.parse(b[key]);
                        return BooleanHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
                break;
            case 'Integer':
            case 'Double':
                {
                    return result.sort((a, b) => {
                        const l = Number(a[key]);
                        const r = Number(b[key]);
                        return NumberHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
                break;
            case 'String':
            case 'Guid':
                {
                    return result.sort((a, b) => {
                        const l = String(a[key]);
                        const r = String(b[key]);
                        const status = l.localeCompare(r);
                        if (sortProperty.isDesc) {
                            if (status > 0)
                                return -1;
                            if (status < 0)
                                return 1;
                        }
                        return status;
                    });
                }
                break;
            case 'DateTime':
                {
                    return result.sort((a, b) => {
                        const l = DateTimeConverter.convert(a[key]);
                        const r = DateTimeConverter.convert(b[key]);
                        return DateTimeHelper.compare(l, r, sortProperty.isDesc);
                    });
                }
                break;
        }
        return massive;
    }
    /**
     * Сортировка массива по указанному массиву свойств сортировки
     * @param massive Исходный массив
     * @param sortProperties Массив свойств сортировки
     * @returns Отсортированный массив
     */
    static sortArrayByProperties(massive, sortProperties) {
        if (!sortProperties)
            return massive;
        let result = [...massive];
        for (const sortProperty of sortProperties) {
            result = SortPropertyHelper.sortArrayByProperty(result, sortProperty);
        }
        return result;
    }
}
