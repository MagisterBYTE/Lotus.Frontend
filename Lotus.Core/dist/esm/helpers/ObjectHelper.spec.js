import { ObjectHelper } from './ObjectHelper';
test('works with a shallow object', () => {
    expect(ObjectHelper.getValue({ param: 1 }, 'param')).toBe(1);
});
test('works with a shallow array', () => {
    expect(ObjectHelper.getValue([1, 2, 3], '[2]')).toBe(3);
});
test('works with a shallow array when shouldThrow is true', () => {
    expect(ObjectHelper.getValue([1, 2, 3], '[2]', true)).toBe(3);
});
test('works with a nested object', () => {
    const source = { param: [{}, { test: 'A' }] };
    expect(ObjectHelper.getValue(source, 'param[1].test')).toBe('A');
});
test('returns undefined when source is null', () => {
    expect(ObjectHelper.getValue({}, 'param[1].test')).toBeUndefined();
});
test('returns undefined when path is wrong', () => {
    expect(ObjectHelper.getValue({ param: [] }, 'param[1].test')).toBeUndefined();
});
test('throws an exception when path is wrong and shouldThrow is true', () => {
    expect(ObjectHelper.getValue({ param: [] }, 'param[1].test')).toBeUndefined();
});
describe('setValue', () => {
    test('should set value for simple property', () => {
        const obj = { name: 'John' };
        ObjectHelper.setValue(obj, 'name', 'Jane');
        expect(obj.name).toBe('Jane');
    });
    test('should set value for nested property', () => {
        const obj = { user: { profile: { name: 'John' } } };
        ObjectHelper.setValue(obj, 'user.profile.name', 'Jane');
        expect(obj.user.profile.name).toBe('Jane');
    });
    test('should create nested objects when setting deep property', () => {
        const obj = {};
        ObjectHelper.setValue(obj, 'user.profile.name', 'John');
        expect(obj).toEqual({ user: { profile: { name: 'John' } } });
    });
    test('should set value for array index', () => {
        const obj = { items: ['a', 'b', 'c'] };
        ObjectHelper.setValue(obj, 'items[1]', 'x');
        expect(obj.items).toEqual(['a', 'x', 'c']);
    });
    test('should set undefined value', () => {
        const obj = { value: 'test' };
        ObjectHelper.setValue(obj, 'value', undefined);
        expect(obj.value).toBeUndefined();
    });
    test('should set null value', () => {
        const obj = { value: 'test' };
        ObjectHelper.setValue(obj, 'value', undefined);
        expect(obj.value).toBeUndefined();
    });
});
describe('cloneDeep', () => {
    test('should create deep clone of object', () => {
        const original = {
            name: 'John',
            address: {
                city: 'Moscow',
                coordinates: { lat: 55.75, lng: 37.61 }
            },
            tags: ['a', 'b', 'c']
        };
        const clone = ObjectHelper.cloneDeep(original);
        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
        // @ts-expect-error address
        expect(clone.address).not.toBe(original.address);
        // @ts-expect-error address.coordinates
        expect(clone.address.coordinates).not.toBe(original.address.coordinates);
        // @ts-expect-error tags
        expect(clone.tags).not.toBe(original.tags);
    });
    test('should clone array', () => {
        const original = [1, 2, { value: 'test' }];
        const clone = ObjectHelper.cloneDeep(original);
        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
        // @ts-expect-error clone[2]
        expect(clone[2]).not.toBe(original[2]);
    });
    test('should clone date objects', () => {
        const date = new Date();
        const original = { createdAt: date };
        const clone = ObjectHelper.cloneDeep(original);
        // @ts-expect-error createdAt
        expect(clone.createdAt).toEqual(date);
        // @ts-expect-error createdAt
        expect(clone.createdAt).not.toBe(date);
    });
    test('should handle null input', () => {
        const clone = ObjectHelper.cloneDeep(null);
        expect(clone).toBeUndefined();
    });
    test('should handle undefined input', () => {
        const clone = ObjectHelper.cloneDeep(undefined);
        expect(clone).toBeUndefined();
    });
});
describe('equality', () => {
    test('should return true for identical objects', () => {
        const obj1 = { name: 'John', age: 30 };
        const obj2 = { name: 'John', age: 30 };
        expect(ObjectHelper.equality(obj1, obj2)).toBe(true);
    });
    test('should return false for different objects', () => {
        const obj1 = { name: 'John', age: 30 };
        const obj2 = { name: 'Jane', age: 30 };
        expect(ObjectHelper.equality(obj1, obj2)).toBe(false);
    });
    test('should return true for identical nested objects', () => {
        const obj1 = { user: { profile: { name: 'John' } } };
        const obj2 = { user: { profile: { name: 'John' } } };
        expect(ObjectHelper.equality(obj1, obj2)).toBe(true);
    });
    test('should return false for different nested objects', () => {
        const obj1 = { user: { profile: { name: 'John' } } };
        const obj2 = { user: { profile: { name: 'Jane' } } };
        expect(ObjectHelper.equality(obj1, obj2)).toBe(false);
    });
    test('should return true for identical arrays', () => {
        const arr1 = [1, 2, { value: 'test' }];
        const arr2 = [1, 2, { value: 'test' }];
        expect(ObjectHelper.equality(arr1, arr2)).toBe(true);
    });
    test('should return false for different arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 4];
        expect(ObjectHelper.equality(arr1, arr2)).toBe(false);
    });
    test('should handle null values', () => {
        expect(ObjectHelper.equality(null, null)).toBe(true);
        expect(ObjectHelper.equality(null, undefined)).toBe(false);
        expect(ObjectHelper.equality({}, null)).toBe(false);
    });
    test('should handle undefined values', () => {
        expect(ObjectHelper.equality(undefined, undefined)).toBe(true);
        expect(ObjectHelper.equality(undefined, null)).toBe(false);
        expect(ObjectHelper.equality({}, undefined)).toBe(false);
    });
    test('should handle primitive values', () => {
        expect(ObjectHelper.equality(5, 5)).toBe(true);
        expect(ObjectHelper.equality('test', 'test')).toBe(true);
        expect(ObjectHelper.equality(true, true)).toBe(true);
        expect(ObjectHelper.equality(5, '5')).toBe(false);
    });
    test('should handle date objects', () => {
        const date1 = new Date('2023-01-01');
        const date2 = new Date('2023-01-01');
        const date3 = new Date('2023-01-02');
        expect(ObjectHelper.equality(date1, date2)).toBe(true);
        expect(ObjectHelper.equality(date1, date3)).toBe(false);
    });
});
//# sourceMappingURL=ObjectHelper.spec.js.map