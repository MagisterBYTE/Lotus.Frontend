/* eslint-disable max-len */
import { BooleanConverter, DateTimeConverter } from '#converters';
import { StringHelper, ObjectHelper } from '#helpers';
export class FilterPropertyHelper {
    /**
     * Проверка на значение фильтра свойства
     * @param filterProperty Параметры фильтрации свойства
     */
    static hasValue(filterProperty) {
        if (!filterProperty.value && !filterProperty.values)
            return false;
        if (filterProperty.value && !filterProperty.values) {
            if (filterProperty.value === '') {
                return false;
            }
            return true;
        }
        if (!filterProperty.value && filterProperty.values) {
            if (filterProperty.values.length === 0) {
                return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Проверка на значение фильтров свойств
     * @param filterProperty Список параметров фильтрации свойства
     */
    static hasValues(filterProperties) {
        let findValue = false;
        filterProperties.forEach(x => {
            if (findValue === false) {
                findValue = FilterPropertyHelper.hasValue(x);
            }
        });
        return findValue;
    }
    /**
     * Фильтрация массива по указанному фильтру свойства
     * @param massive Исходный массив
     * @param filterProperty Параметры фильтрации свойства
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperty(massive, filterProperty) {
        if (FilterPropertyHelper.hasValue(filterProperty)) {
            const propertyType = filterProperty.propertyTypeDesc.type;
            const filterFunction = filterProperty.function.type;
            const key = StringHelper.lowercaseFirstLetter(filterProperty.propertyPath);
            switch (propertyType) {
                case 'Boolean':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => BooleanConverter.toBoolean((ObjectHelper.getValue(x, key))) === BooleanConverter.toBoolean(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => BooleanConverter.toBoolean((ObjectHelper.getValue(x, key))) !== BooleanConverter.toBoolean(filterProperty.value));
                        }
                    }
                    break;
                case 'Integer':
                case 'Double':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) === Number(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) !== Number(filterProperty.value));
                            case 'LessThan': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) < Number(filterProperty.value));
                            case 'LessThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) <= Number(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) > Number(filterProperty.value));
                            case 'GreaterThanOrEqual': return massive.filter(x => Number((ObjectHelper.getValue(x, key))) >= Number(filterProperty.value));
                            case 'Between': return massive.filter(x => {
                                const check = Number((ObjectHelper.getValue(x, key)));
                                const left = Number(filterProperty.values[0]);
                                const right = Number(filterProperty.values[1]);
                                return (check > left) && (check < right);
                            });
                        }
                    }
                    break;
                case 'String':
                case 'Guid':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => String((ObjectHelper.getValue(x, key))) === filterProperty.value);
                            case 'NotEqual': return massive.filter(x => String((ObjectHelper.getValue(x, key))) !== filterProperty.value);
                            case 'Contains': return massive.filter(x => (String((ObjectHelper.getValue(x, key)))).includes(filterProperty.value));
                            case 'StartsWith': return massive.filter(x => (String((ObjectHelper.getValue(x, key)))).startsWith(filterProperty.value));
                            case 'EndsWith': return massive.filter(x => (String((ObjectHelper.getValue(x, key)))).endsWith(filterProperty.value));
                            case 'NotEmpty': return massive.filter(x => StringHelper.isNullOrEmpty(String((ObjectHelper.getValue(x, key)))) === false);
                            case 'LessThan': return massive.filter(x => String((ObjectHelper.getValue(x, key))).localeCompare(filterProperty.value) < 0);
                            case 'LessThanOrEqual': return massive.filter(x => String((ObjectHelper.getValue(x, key))).localeCompare(filterProperty.value) <= 0);
                            case 'GreaterThan': return massive.filter(x => String((ObjectHelper.getValue(x, key))).localeCompare(filterProperty.value) > 0);
                            case 'GreaterThanOrEqual': return massive.filter(x => String((ObjectHelper.getValue(x, key))).localeCompare(filterProperty.value) >= 0);
                        }
                    }
                    break;
                case 'DateTime':
                    {
                        switch (filterFunction) {
                            case 'Equals': return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) === DateTimeConverter.toDateTime(filterProperty.value));
                            case 'NotEqual': return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) !== DateTimeConverter.toDateTime(filterProperty.value));
                            case 'LessThan': return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) < DateTimeConverter.toDateTime(filterProperty.value));
                            case 'LessThanOrEqual': return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) <= DateTimeConverter.toDateTime(filterProperty.value));
                            case 'GreaterThan': return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) > DateTimeConverter.toDateTime(filterProperty.value));
                            case 'GreaterThanOrEqual':
                                return massive.filter(x => DateTimeConverter.toDateTime((ObjectHelper.getValue(x, key))) >= DateTimeConverter.toDateTime(filterProperty.value));
                        }
                    }
                    break;
            }
        }
        return massive;
    }
    /**
     * Фильтрация массива по указанному массиву фильтров свойств
     * @param massive Исходный массив
     * @param filterProperties Массив фильтров свойств
     * @returns Отфильтрованный массив
     */
    static filterArrayByProperties(massive, filterProperties) {
        if (!filterProperties)
            return massive;
        let result = [...massive];
        for (const filterProperty of filterProperties) {
            result = FilterPropertyHelper.filterArrayByProperty(result, filterProperty);
        }
        return result;
    }
}
//# sourceMappingURL=FilterPropertyHelper.js.map