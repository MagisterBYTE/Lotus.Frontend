import { ArrayHelper } from './ArrayHelper';

interface ITestItem
{
  id: number;
  name: string;
  category: string;
}

interface User
{
  id: number;
  name: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' },
  { id: 4, name: 'David', role: 'moderator' }
];

describe('ArrayHelper', () => 
{
  describe('createNumber', () => 
  {
    it('should return correct array for positive range', () => 
    {
      expect(ArrayHelper.createNumber(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return correct array for negative range', () => 
    {
      expect(ArrayHelper.createNumber(-3, 1)).toEqual([-3, -2, -1, 0, 1]);
    });

    it('should return single element array when from equals to', () => 
    {
      expect(ArrayHelper.createNumber(7, 7)).toEqual([7]);
    });

    it('should return empty array when from > to', () => 
    {
      expect(ArrayHelper.createNumber(5, 1)).toEqual([]);
    });
  });

  describe('checkIsNumbers', () => 
  {
    it('should return true for array of numbers', () => 
    {
      expect(ArrayHelper.checkIsNumbers([1, 2, 3])).toBe(true);
    });

    it('should return false for array with non-numbers', () => 
    {
      expect(ArrayHelper.checkIsNumbers([1, '2', 3])).toBe(false);
    });

    it('should return true for empty array', () => 
    {
      expect(ArrayHelper.checkIsNumbers([])).toBe(true);
    });

    it('should return false for array with objects', () => 
    {
      expect(ArrayHelper.checkIsNumbers([1, {}, 3])).toBe(false);
    });
  });

  describe('checkIn', () => 
  {
    it('should return true when any element exists in checked array', () => 
    {
      expect(ArrayHelper.checkIn([1, 2, 3], [3, 4, 5])).toBe(true);
    });

    it('should return false when no elements exist in checked array', () => 
    {
      expect(ArrayHelper.checkIn([1, 2, 3], [4, 5, 6])).toBe(false);
    });

    it('should return false when source array is empty', () => 
    {
      expect(ArrayHelper.checkIn([], [1, 2, 3])).toBe(false);
    });

    it('should return false when checked array is empty', () => 
    {
      expect(ArrayHelper.checkIn([1, 2, 3], [])).toBe(false);
    });

    it('should work with strings', () => 
    {
      expect(ArrayHelper.checkIn(['a', 'b'], ['b', 'c'])).toBe(true);
    });
  });

  describe('groupBy', () => 
  {
    const testData: ITestItem[] = [
      { id: 1, name: 'Item 1', category: 'A' },
      { id: 2, name: 'Item 2', category: 'B' },
      { id: 3, name: 'Item 3', category: 'A' },
      { id: 4, name: 'Item 4', category: 'C' }
    ];

    it('should group items by specified property', () => 
    {
      const result = ArrayHelper.groupBy(testData, 'category');

      expect(result.length).toBe(3);
      // eslint-disable-next-line max-nested-callbacks
      expect(result.find(g => g.groupKey == 'A')?.items.length).toBe(2);
      // eslint-disable-next-line max-nested-callbacks
      expect(result.find(g => g.groupKey == 'B')?.items.length).toBe(1);
      // eslint-disable-next-line max-nested-callbacks
      expect(result.find(g => g.groupKey == 'C')?.items.length).toBe(1);
    });

    it('should return empty array for empty input', () => 
    {
      expect(ArrayHelper.groupBy([], 'category')).toEqual([]);
    });

    it('should handle non-existent property by creating groups with undefined keys', () => 
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = ArrayHelper.groupBy(testData, 'nonexistent' as any);
      expect(result.length).toBe(1);
      expect(result[0].groupKey).toBeUndefined();
      expect(result[0].items.length).toBe(4);
    });
  });

  describe('uniqueBy', () => 
  {
    const testData: ITestItem[] = [
      { id: 1, name: 'Item 1', category: 'A' },
      { id: 2, name: 'Item 2', category: 'B' },
      { id: 1, name: 'Item 1 Duplicate', category: 'A' },
      { id: 3, name: 'Item 3', category: 'A' }
    ];

    it('should return unique items by specified key', () => 
    {
      const result = ArrayHelper.uniqueBy(testData, 'id');
      expect(result.length).toBe(3);
      // eslint-disable-next-line max-nested-callbacks
      expect(result.map(i => i.id)).toEqual([1, 2, 3]);
    });

    it('should return unique items by string property', () => 
    {
      const result = ArrayHelper.uniqueBy(testData, 'name');
      expect(result.length).toBe(4);
    });

    it('should return empty array for empty input', () => 
    {
      expect(ArrayHelper.uniqueBy([], 'id')).toEqual([]);
    });
  });

  describe('hasDuplicatedBy', () => 
  {
    const testData: ITestItem[] = [
      { id: 1, name: 'Item 1', category: 'A' },
      { id: 2, name: 'Item 2', category: 'B' },
      { id: 1, name: 'Item 1 Duplicate', category: 'A' },
      { id: 3, name: 'Item 3', category: 'A' }
    ];

    it('should return true when duplicates exist by key', () => 
    {
      expect(ArrayHelper.hasDuplicatedBy(testData, 'id')).toBe(true);
    });

    it('should return false when no duplicates exist by key', () => 
    {
      expect(ArrayHelper.hasDuplicatedBy(testData, 'name')).toBe(false);
    });

    it('should return false for empty array', () => 
    {
      expect(ArrayHelper.hasDuplicatedBy([], 'id')).toBe(false);
    });

    it('should return false for single item array', () => 
    {
      expect(ArrayHelper.hasDuplicatedBy([testData[0]], 'id')).toBe(false);
    });
  });

  describe('toRemoveBy', () =>
  {
    let users: User[];

    beforeEach(() =>
    {
      users = [...initialUsers];
    });

    test('should remove item by single value', () =>
    {
      const result = ArrayHelper.toRemoveBy(users, 'id', 2);
      expect(result).toEqual([
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 3, name: 'Charlie', role: 'user' },
        { id: 4, name: 'David', role: 'moderator' }
      ]);
      expect(users).toEqual(initialUsers); // исходный массив не изменился
    });

    test('should remove items by array of values', () =>
    {
      const result = ArrayHelper.toRemoveBy(users, 'role', ['user', 'moderator']);
      expect(result).toEqual([
        { id: 1, name: 'Alice', role: 'admin' }
      ]);
    });

    test('should return same array if value not found', () =>
    {
      const result = ArrayHelper.toRemoveBy(users, 'id', 99);
      expect(result).toEqual(users);
    });

    test('should handle empty array', () =>
    {
      // @ts-expect-error ArrayHelper.removeByKey - empty array
      const result = ArrayHelper.toRemoveBy([], 'id', 1);
      expect(result).toEqual([]);
    });

    test('should work with different value types', () =>
    {
      const mixedArray = [
        { id: 1, flag: true },
        { id: 2, flag: false },
        { id: 3, flag: true }
      ];
      const result = ArrayHelper.toRemoveBy(mixedArray, 'flag', true);
      expect(result).toEqual([{ id: 2, flag: false }]);
    });
  });

  describe('removeBy', () =>
  {
    let users: User[];

    beforeEach(() =>
    {
      users = [...initialUsers];
    });

    test('should remove item by single value and mutate array', () =>
    {
      const removedCount = ArrayHelper.removeBy(users, 'id', 2);
      expect(removedCount).toBe(1);
      expect(users).toEqual([
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 3, name: 'Charlie', role: 'user' },
        { id: 4, name: 'David', role: 'moderator' }
      ]);
    });

    test('should remove multiple items by array of values', () =>
    {
      const removedCount = ArrayHelper.removeBy(users, 'role', ['user', 'moderator']);
      expect(removedCount).toBe(3);
      expect(users).toEqual([
        { id: 1, name: 'Alice', role: 'admin' }
      ]);
    });

    test('should return 0 if value not found', () =>
    {
      const originalLength = users.length;
      const removedCount = ArrayHelper.removeBy(users, 'id', 99);
      expect(removedCount).toBe(0);
      expect(users.length).toBe(originalLength);
    });

    test('should handle empty array', () =>
    {
      const emptyArray: User[] = [];
      const removedCount = ArrayHelper.removeBy(emptyArray, 'id', 1);
      expect(removedCount).toBe(0);
      expect(emptyArray).toEqual([]);
    });

    test('should return correct count of removed items', () =>
    {
      const usersCopy = [...users, { id: 5, name: 'Eve', role: 'user' }];
      const removedCount = ArrayHelper.removeBy(usersCopy, 'role', 'user');
      expect(removedCount).toBe(3); // Bob, Charlie и Eve
    });
  });
});