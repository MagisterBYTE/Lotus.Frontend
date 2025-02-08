import { describe, expect, it } from '@jest/globals';
import { checkOfGuid, TGuid, createGuid, TGuidRegex } from './Guid'; // Импортируйте вашу функцию здесь

describe('Guid Functions', () => 
{
  describe('isValidGuid', () => 
  {
    it('should return true for valid GUID', () => 
    {
      const validGuid: TGuid = '123e4567-e89b-12d3-a456-426614174000';
      expect(checkOfGuid(validGuid)).toBe(true);
    });

    it('should return false for invalid GUID', () => 
    {
      const invalidGuid = '123e4567-e89b-12d3-a456-42661417400Z'; // Неверный символ "Z"
      expect(checkOfGuid(invalidGuid)).toBe(false);
    });

    it('should return false for non-GUID string', () => 
    {
      const nonGuidString = 'hello-world';
      expect(checkOfGuid(nonGuidString)).toBe(false);
    });
  });

  describe('createGuid', () => 
  {
    it('should generate a GUID string', () => 
    {
      const uuid = createGuid();
      expect(typeof uuid).toBe('string');
      expect(uuid).toHaveLength(36); // UUID имеет фиксированную длину 36 символов
    });

    it('should follow the GUID format', () => 
    {
      const uuid = createGuid();
      expect(TGuidRegex.test(uuid)).toBe(true); // Проверяем, соответствует ли UUID шаблону
    });

    it('should generate a valid GUID', () => 
    {
      const guid = createGuid();
      expect(checkOfGuid(guid)).toBe(true);
    });

    it('should generate a unique GUID each time', () => 
    {
      const guid1 = createGuid();
      const guid2 = createGuid();
      expect(guid1).not.toEqual(guid2);
    });

    it('should generate unique GUID', () => 
    {
      const uuidSet = new Set<string>();
      for (let i = 0; i < 1000; i++) 
      {
        uuidSet.add(createGuid());
      }
      expect(uuidSet.size).toBe(1000); // Если мы получили 1000 уникальных UUID, размер должен быть 1000
    });
  });
});

// describe('UUIDv7 Generation', () => 
// {
//   it('should generate a UUIDv7 string', () => 
//   {
//     const uuid = createGuidV7();
//     expect(typeof uuid).toBe('string');
//     expect(uuid).toHaveLength(36); // UUID имеет фиксированную длину 36 символов
//   });

//   it('should follow the UUIDv7 format', () => 
//   {
//     const uuid = createGuidV7();
//     const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
//     expect(uuidRegex.test(uuid)).toBe(true); // Проверяем, соответствует ли UUID шаблону
//   });

//   it('should generate unique UUIDs', () => 
//   {
//     const uuidSet = new Set<string>();
//     for (let i = 0; i < 1000; i++) 
//     {
//       uuidSet.add(createGuidV7());
//     }
//     expect(uuidSet.size).toBe(1000); // Если мы получили 1000 уникальных UUID, размер должен быть 1000
//   });

//   it('should generate UUIDv7s with a timestamp component', () => 
//   {
//     const uuid = createGuidV7();
//     const timestampHex = uuid.split('-')[0]; // Первый сегмент должен содержать временную метку в шестнадцатеричном виде
//     const timestamp = parseInt(timestampHex, 16);
    
//     const currentTime = Date.now();
//     const timeInMilliseconds = timestamp / 10000 - 0x01b21dd213814000; // Преобразование в миллисекунды
//     expect(timeInMilliseconds).toBeGreaterThanOrEqual(currentTime - 1000); // Проверяем, что таймштамп не слишком стар
//     expect(timeInMilliseconds).toBeLessThanOrEqual(currentTime); // Таймштамп не должен быть в будущем
//   });
// });