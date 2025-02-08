export class BooleanHelper {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static TrueValues = [
        'True',
        'true',
        '1',
        'on',
        'On',
        'истина',
        'Истина',
        'да',
        'Да'
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parse(item) {
        if (item) {
            if (typeof item == 'boolean') {
                return item;
            }
            if (typeof item == 'string') {
                return BooleanHelper.TrueValues.indexOf(item) > -1;
            }
            if (typeof item == 'number') {
                return Boolean(item);
            }
        }
        return false;
    }
    static getValue(value, yes = 'Да', no = 'Нет') {
        return (value ? yes : no);
    }
    static compare(left, right, isDesc) {
        let status = 0;
        if (left) {
            if (right) {
                status = 0;
            }
            else {
                status = 1;
            }
        }
        else {
            if (right) {
                status = -1;
            }
            else {
                status = 0;
            }
        }
        if (isDesc) {
            if (status > 0)
                return -1;
            else {
                if (status < 0)
                    return 1;
                else
                    return 0;
            }
        }
        return status;
    }
}
