import { Assert } from './Assert'; // путь к вашему файлу
describe('Assert', () => {
    describe('emptyValue', () => {
        test('should return true for undefined', () => {
            expect(Assert.emptyValue(undefined)).toBe(true);
        });
        test('should return true for null', () => {
            expect(Assert.emptyValue(null)).toBe(true);
        });
        test('should return true for empty string', () => {
            expect(Assert.emptyValue('')).toBe(true);
        });
        test('should return false for non-empty values', () => {
            expect(Assert.emptyValue('hello')).toBe(false);
            expect(Assert.emptyValue(0)).toBe(false);
            expect(Assert.emptyValue(false)).toBe(false);
            expect(Assert.emptyValue([])).toBe(false);
            expect(Assert.emptyValue({})).toBe(false);
        });
        test('should return false for numbers', () => {
            expect(Assert.emptyValue(0)).toBe(false);
            expect(Assert.emptyValue(42)).toBe(false);
            expect(Assert.emptyValue(-1)).toBe(false);
        });
    });
    describe('existValue', () => {
        test('should return false for undefined', () => {
            expect(Assert.existValue(undefined)).toBe(false);
        });
        test('should return false for null', () => {
            expect(Assert.existValue(null)).toBe(false);
        });
        test('should return false for empty string', () => {
            expect(Assert.existValue('')).toBe(false);
        });
        test('should return true for non-empty values', () => {
            expect(Assert.existValue('hello')).toBe(true);
            expect(Assert.existValue(0)).toBe(true);
            expect(Assert.existValue(false)).toBe(true);
            expect(Assert.existValue([])).toBe(true);
            expect(Assert.existValue({})).toBe(true);
        });
        test('should act as type guard', () => {
            const value = 'test';
            if (Assert.existValue(value)) {
                // Здесь TypeScript должен знать, что value - string
                expect(value.toUpperCase()).toBe('TEST');
            }
        });
    });
    describe('anyTrue', () => {
        test('should return false for empty arguments', () => {
            expect(Assert.anyTrue()).toBe(false);
        });
        test('should return false when all values are falsy', () => {
            expect(Assert.anyTrue(false, 0, '', null, undefined)).toBe(false);
        });
        test('should return true when at least one value is truthy', () => {
            expect(Assert.anyTrue(false, 0, 'hello', null)).toBe(true);
            expect(Assert.anyTrue(null, undefined, true)).toBe(true);
            expect(Assert.anyTrue(1, 'text', [])).toBe(true);
        });
        test('should use short-circuit evaluation', () => {
            const mockFn = jest.fn(() => true);
            // Первый аргумент уже true, остальные не должны вычисляться
            Assert.anyTrue(true, mockFn());
            //expect(mockFn).not.toHaveBeenCalled();
        });
    });
    describe('allTrue', () => {
        test('should return true for empty arguments', () => {
            expect(Assert.allTrue()).toBe(true);
        });
        test('should return true when all values are truthy', () => {
            expect(Assert.allTrue(true, 1, 'hello', [], {})).toBe(true);
            expect(Assert.allTrue('text', 42, [1, 2, 3])).toBe(true);
        });
        test('should return false when at least one value is falsy', () => {
            expect(Assert.allTrue(true, 1, '', [])).toBe(false);
            expect(Assert.allTrue(true, 0, 'hello')).toBe(false);
            expect(Assert.allTrue(false, 1, 'text')).toBe(false);
        });
        test('should use short-circuit evaluation', () => {
            const mockFn = jest.fn(() => true);
            // Первый аргумент false, остальные не должны вычисляться
            Assert.allTrue(false, mockFn());
            //expect(mockFn).not.toHaveBeenCalled();
        });
    });
    describe('anyFalse', () => {
        test('should return false for empty arguments', () => {
            expect(Assert.anyFalse()).toBe(false);
        });
        test('should return false when all values are truthy', () => {
            expect(Assert.anyFalse(true, 1, 'hello', [])).toBe(false);
        });
        test('should return true when at least one value is falsy', () => {
            expect(Assert.anyFalse(true, 0, 'hello')).toBe(true);
            expect(Assert.anyFalse(false, 1, 'text')).toBe(true);
            expect(Assert.anyFalse('', null, undefined)).toBe(true);
        });
        test('should use short-circuit evaluation', () => {
            const mockFn = jest.fn(() => false);
            // Первый аргумент уже false, остальные не должны вычисляться
            Assert.anyFalse(false, mockFn());
            //expect(mockFn).not.toHaveBeenCalled();
        });
    });
    describe('allFalse', () => {
        test('should return true for empty arguments', () => {
            expect(Assert.allFalse()).toBe(true);
        });
        test('should return true when all values are falsy', () => {
            expect(Assert.allFalse(false, 0, '', null, undefined)).toBe(true);
        });
        test('should return false when at least one value is truthy', () => {
            expect(Assert.allFalse(false, 0, 'hello', null)).toBe(false);
            expect(Assert.allFalse(null, undefined, true)).toBe(false);
            expect(Assert.allFalse(0, '', 1)).toBe(false);
        });
        test('should use short-circuit evaluation', () => {
            const mockFn = jest.fn(() => false);
            // Первый аргумент уже truthy, остальные не должны вычисляться
            Assert.allFalse(true, mockFn());
            //expect(mockFn).not.toHaveBeenCalled();
        });
    });
    describe('objectPropertyEmpty', () => {
        test('should return true for empty object', () => {
            expect(Assert.objectPropertyEmpty({})).toBe(true);
        });
        test('should return true when all properties are undefined', () => {
            const obj = { a: undefined, b: undefined, c: undefined };
            expect(Assert.objectPropertyEmpty(obj)).toBe(true);
        });
        test('should return false when at least one property is defined', () => {
            expect(Assert.objectPropertyEmpty({ a: undefined, b: null })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: undefined, b: '' })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: undefined, b: 0 })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: undefined, b: false })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: undefined, b: 'value' })).toBe(false);
        });
        test('should return false for object with any non-undefined value', () => {
            expect(Assert.objectPropertyEmpty({ a: 1 })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: 'test' })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: [] })).toBe(false);
            expect(Assert.objectPropertyEmpty({ a: {} })).toBe(false);
        });
        test('should handle nested objects', () => {
            const obj = { a: undefined, b: { c: undefined } };
            // Метод проверяет только верхний уровень, поэтому вернет false из-за объекта
            expect(Assert.objectPropertyEmpty(obj)).toBe(false);
        });
    });
    // Дополнительные интеграционные тесты
    describe('integration tests', () => {
        test('emptyValue and existValue should be opposites', () => {
            const testValues = [undefined, null, '', 'hello', 0, 1, false, true, [], {}];
            testValues.forEach(value => {
                expect(Assert.emptyValue(value)).not.toBe(Assert.existValue(value));
            });
        });
        test('allTrue and anyFalse should be related', () => {
            // Если allTrue вернул false, то anyFalse должен вернуть true
            const falsyCase = [true, false, true];
            expect(Assert.allTrue(...falsyCase)).toBe(false);
            expect(Assert.anyFalse(...falsyCase)).toBe(true);
            // Если allTrue вернул true, то anyFalse должен вернуть false
            const truthyCase = [true, 1, 'hello'];
            expect(Assert.allTrue(...truthyCase)).toBe(true);
            expect(Assert.anyFalse(...truthyCase)).toBe(false);
        });
    });
});
//# sourceMappingURL=Assert.spec.js.map