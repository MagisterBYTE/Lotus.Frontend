import { EnumConverter } from './EnumConverter'; // Импортируем класс EnumConverter
var TestEnum;
(function (TestEnum) {
    TestEnum[TestEnum["ONE"] = 1] = "ONE";
    TestEnum[TestEnum["TWO"] = 2] = "TWO";
    TestEnum[TestEnum["THREE"] = 3] = "THREE";
})(TestEnum || (TestEnum = {}));
describe('EnumConverter', () => {
    describe('getValues', () => {
        it('should return all values of the enum', () => {
            const result = EnumConverter.getValues(TestEnum);
            expect(result).toEqual([1, 2, 3]); // Ожидаем, что значения перечисления будут возвращены правильно
        });
        it('should return an empty array for an empty enum', () => {
            const emptyEnum = {};
            const result = EnumConverter.getValues(emptyEnum);
            expect(result).toEqual([]); // Ожидаем, что пустое перечисление вернет пустой массив
        });
    });
    describe('getNames', () => {
        it('should return all names of the enum', () => {
            const result = EnumConverter.getNames(TestEnum);
            expect(result).toEqual(['ONE', 'TWO', 'THREE']); // Ожидаем корректное возвращение имен
        });
        it('should return an empty array for an empty enum', () => {
            const emptyEnum = {};
            const result = EnumConverter.getNames(emptyEnum);
            expect(result).toEqual([]); // Ожидаем, что пустое перечисление вернет пустой массив
        });
    });
});
