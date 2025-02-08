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
    expect(ObjectHelper.getValue(null, 'param[1].test')).toBeUndefined();
});
test('returns undefined when path is wrong', () => {
    expect(ObjectHelper.getValue({ param: [] }, 'param[1].test')).toBeUndefined();
});
test('throws an exception when path is wrong and shouldThrow is true', () => {
    expect(() => ObjectHelper.getValue({ param: [] }, 'param[1].test', true)).toThrow();
});
test('works transparently with Sets and Maps', () => {
    const source = new Map([
        ['param', new Set()],
        ['innerSet', new Set([new Map(), new Map([['innerKey', 'value']])])]
    ]);
    expect(ObjectHelper.getValue(source, 'innerSet[1].innerKey')).toBe('value');
});
