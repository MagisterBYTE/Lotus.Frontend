export class DateTimeConverter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convert(item) {
        if (item) {
            if (item instanceof Date) {
                return item;
            }
            if (typeof item == 'number') {
                return new Date(item);
            }
            if (typeof item == 'string') {
                return new Date(Date.parse(item));
            }
        }
        return new Date(Date.now());
    }
}
