/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringHelper } from '#helpers';
import { DateTimeFormatter } from './DateTimeFormatter';
// Мокаем navigator.language для тестов
const mockNavigatorLanguage = (lang) => {
    Object.defineProperty(global.navigator, 'language', {
        value: lang,
        writable: true,
        configurable: true
    });
};
// Сохраняем оригинальный navigator
const originalNavigator = { ...global.navigator };
describe('DateTimeFormatter', () => {
    beforeEach(() => {
        // Сбрасываем моки перед каждым тестом
        jest.restoreAllMocks();
        // Устанавливаем русскую локаль по умолчанию
        mockNavigatorLanguage('ru-RU');
    });
    afterAll(() => {
        // Восстанавливаем оригинальный navigator
        Object.defineProperty(global, 'navigator', {
            value: originalNavigator,
            writable: true
        });
    });
    describe('Basic formatting methods', () => {
        const testDate = new Date('2024-12-15T14:30:45.123Z');
        test('date() should format date with default locale', () => {
            const result = DateTimeFormatter.date(testDate);
            // Проверяем, что результат содержит ожидаемые части
            expect(result).toMatch(/\d{1,2}/); // День
            expect(result).toMatch(/\d{1,2}/); // Месяц
            expect(result).toMatch(/\d{4}/); // Год
        });
        test('date() should format date with specific locale', () => {
            const resultUS = DateTimeFormatter.date(testDate, 'en-US');
            expect(resultUS).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
            const resultDE = DateTimeFormatter.date(testDate, 'de-DE');
            expect(resultDE).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
        });
        test('date() should accept custom options', () => {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const result = DateTimeFormatter.date(testDate, 'ru-RU', options);
            expect(result).toContain('декабря');
            expect(result).toContain('2024');
            expect(result).toContain('воскресенье');
        });
        test('dateTime() should format date and time', () => {
            const result = DateTimeFormatter.dateTime(testDate);
            expect(result).toMatch(/\d{1,2}/); // Проверяем, что есть цифры
            expect(result).toMatch(/:/); // Должен быть разделитель времени
        });
        test('time() should format only time', () => {
            const result = DateTimeFormatter.time(testDate);
            expect(result).toMatch(/\d{1,2}:\d{2}/); // Формат времени
        });
        test('time() should accept custom time options', () => {
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            const result = DateTimeFormatter.time(testDate, 'ru-RU', options);
            expect(result).toBe('19:30'); // UTC время
        });
    });
    describe('relativeTime()', () => {
        test('should format positive relative time', () => {
            const result = DateTimeFormatter.formatRelativeValue(2, 'hours', 'ru-RU');
            expect(result).toBe('через 2 часа');
        });
        test('should format negative relative time', () => {
            const result = DateTimeFormatter.formatRelativeValue(-3, 'days', 'ru-RU');
            expect(result).toBe('3 дня назад');
        });
        test('should use numeric: "auto" by default', () => {
            const result = DateTimeFormatter.formatRelativeValue(1, 'day', 'ru-RU');
            // При numeric: 'auto' и value: 1 может быть "завтра"
            expect(result).toMatch(/(завтра|через 1 день)/);
        });
        test('should accept custom options', () => {
            const options = {
                numeric: 'always',
                style: 'short'
            };
            const result = DateTimeFormatter.formatRelativeValue(2, 'hours', 'ru-RU', options);
            expect(result).toBe('через 2 ч');
        });
        test('should handle different locales', () => {
            const resultEN = DateTimeFormatter.formatRelativeValue(2, 'hours', 'en-US');
            expect(resultEN).toBe('in 2 hours');
            const resultDE = DateTimeFormatter.formatRelativeValue(2, 'hours', 'de-DE');
            expect(resultDE).toBe('in 2 Stunden');
        });
        test('should handle zero value', () => {
            const result = DateTimeFormatter.formatRelativeValue(0, 'hours', 'ru-RU');
            expect(result).toBe('в этот час');
        });
        test('should handle all time units', () => {
            const units = [
                'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second'
            ];
            units.forEach(unit => {
                const result = DateTimeFormatter.formatRelativeValue(1, unit, 'ru-RU');
                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);
            });
        });
    });
    describe('formatDuration()', () => {
        test('should format duration in seconds', () => {
            const result = DateTimeFormatter.formatRelative(65, 'ru-RU');
            expect(result).toBe('через 1 минуту и 5 секунд');
        });
        test('should format duration in minutes', () => {
            const result = DateTimeFormatter.formatRelative(3665, 'ru-RU'); // 1 час 1 минута 5 секунд
            expect(result).toMatch(/1 час/);
        });
        test('should format duration in hours', () => {
            const result = DateTimeFormatter.formatRelative(7200, 'ru-RU'); // 2 часа
            expect(result).toBe('через 2 часа');
        });
        test('should format duration in days', () => {
            const result = DateTimeFormatter.formatRelative(172800, 'ru-RU'); // 2 дня
            expect(result).toBe('через 2 дня');
        });
        test('should limit max units', () => {
            const result = DateTimeFormatter.formatRelative(90061, 'ru-RU', { maxUnits: 1 });
            // 90061 секунд = 1 день 1 час 1 минута 1 секунда
            // С maxUnits: 1 должна вернуть только "1 день"
            expect(result).toBe('через 1 день');
        });
        test('should handle zero and negative durations', () => {
            const resultZero = DateTimeFormatter.formatRelative(0, 'ru-RU');
            expect(resultZero).toBe('сейчас');
            const resultNegative = DateTimeFormatter.formatRelative(-60, 'ru-RU');
            expect(resultNegative).toBe('сейчас');
        });
        test('should use custom style', () => {
            const resultShort = DateTimeFormatter.formatRelative(3665, 'ru-RU', { style: 'short' });
            expect(resultShort).toBe('через 1 ч и 1 мин.');
            const resultNarrow = DateTimeFormatter.formatRelative(3665, 'ru-RU', { style: 'narrow' });
            expect(resultNarrow).toBe('+1 ч и +1 мин');
        });
        test('should handle different locales', () => {
            const resultEN = DateTimeFormatter.formatRelative(3665, 'en-US');
            expect(resultEN).toMatch(/1 hour/);
            const resultDE = DateTimeFormatter.formatRelative(3665, 'de-DE');
            expect(resultDE).toMatch(/1 Stunde/);
        });
        test('should use custom units order', () => {
            const result = DateTimeFormatter.formatRelative(3665, 'ru-RU', {
                units: ['minute', 'second']
            });
            expect(result).toBe('через 61 минуту и 5 секунд');
        });
        test('should handle very large durations', () => {
            const oneYearInSeconds = 31536000;
            const result = DateTimeFormatter.formatRelative(oneYearInSeconds + 3600, 'ru-RU');
            expect(result).toBe('через 1 год и 1 час');
        });
        test('should handle fractions of seconds', () => {
            const result = DateTimeFormatter.formatRelative(0.5, 'ru-RU');
            expect(result).toBe('сейчас');
        });
    });
    describe('formatTimeUntil()', () => {
        const now = new Date('2024-12-15T14:30:00Z');
        beforeAll(() => {
            // Мокаем текущее время
            jest.useFakeTimers();
            jest.setSystemTime(now);
        });
        afterAll(() => {
            jest.useRealTimers();
        });
        test('should format future date', () => {
            const futureDate = new Date('2024-12-16T14:30:00Z');
            const result = DateTimeFormatter.formatRelativeOfDate(futureDate, 'ru-RU');
            expect(result).toBe('завтра');
        });
        test('should format past date', () => {
            const pastDate = new Date('2024-12-14T14:30:00Z');
            const result = DateTimeFormatter.formatRelativeOfDate(pastDate, 'ru-RU');
            expect(result).toBe('вчера');
        });
        test('should format near future', () => {
            const nearFuture = new Date('2024-12-15T15:30:00Z'); // +1 час
            const result = DateTimeFormatter.formatRelativeOfDate(nearFuture, 'ru-RU');
            expect(result).toBe('через 1 час');
        });
        test('should format near past', () => {
            const nearPast = new Date('2024-12-15T13:30:00Z'); // -1 час
            const result = DateTimeFormatter.formatRelativeOfDate(nearPast, 'ru-RU');
            expect(result).toBe('1 час назад');
        });
        test('should handle same date', () => {
            const sameDate = new Date('2024-12-15T14:30:00Z');
            const result = DateTimeFormatter.formatRelativeOfDate(sameDate, 'ru-RU');
            expect(result).toBe('сейчас');
        });
        test('should accept custom options', () => {
            const futureDate = new Date('2024-12-16T14:30:00Z');
            const options = {
                numeric: 'always',
                style: 'short'
            };
            const result = DateTimeFormatter.formatRelativeOfDate(futureDate, 'ru-RU', options);
            expect(result).toBe('через 1 дн.');
        });
        test('should handle different locales', () => {
            const futureDate = new Date('2024-12-16T14:30:00Z');
            const resultEN = DateTimeFormatter.formatRelativeOfDate(futureDate, 'en-US');
            expect(resultEN).toBe('tomorrow');
        });
    });
    describe('getWeekdays()', () => {
        test('should return array of 7 weekdays', () => {
            const weekdays = DateTimeFormatter.getWeekdays('ru-RU');
            expect(weekdays).toHaveLength(7);
            expect(weekdays[0]).toBe('воскресенье');
            expect(weekdays[1]).toBe('понедельник');
        });
        test('should return short format', () => {
            const weekdays = DateTimeFormatter.getWeekdays('en-US', 'short');
            expect(weekdays[0]).toBe('Sun');
            expect(weekdays[1]).toBe('Mon');
        });
        test('should return narrow format', () => {
            const weekdays = DateTimeFormatter.getWeekdays('en-US', 'narrow');
            expect(weekdays).toHaveLength(7);
            expect(weekdays[0].length).toBeLessThanOrEqual(2);
        });
        test('should handle different locales', () => {
            const weekdaysDE = DateTimeFormatter.getWeekdays('de-DE');
            expect(weekdaysDE[0]).toBe('Sonntag');
        });
    });
    describe('getMonths()', () => {
        test('should return array of 12 months', () => {
            const months = DateTimeFormatter.getMonths('ru-RU');
            expect(months).toHaveLength(12);
            expect(months[0]).toBe('январь');
            expect(months[11]).toBe('декабрь');
        });
        test('should return short format', () => {
            const months = DateTimeFormatter.getMonths('en-US', 'short');
            expect(months[0]).toBe('Jan');
            expect(months[11]).toBe('Dec');
        });
        test('should handle different locales', () => {
            const monthsDE = DateTimeFormatter.getMonths('de-DE');
            expect(monthsDE[0]).toBe('Januar');
        });
    });
    describe('toISOLocal()', () => {
        test('should convert date to local ISO string without Z', () => {
            const date = new Date('2024-12-15T14:30:45.123Z');
            const result = DateTimeFormatter.toISOLocal(date);
            // Проверяем формат ISO без Z
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
            expect(result).not.toMatch(/Z$/);
            expect(result).toContain('.123'); // Миллисекунды
        });
        test('should preserve local time', () => {
            // Создаем дату с явным временем
            const date = new Date(2024, 11, 15, 14, 30, 45, 123);
            const result = DateTimeFormatter.toISOLocal(date);
            // Проверяем, что время сохранилось
            expect(result).toContain('T14:30:45');
        });
    });
    describe('Support detection methods', () => {
        test('isRelativeTimeFormatSupported() should return boolean', () => {
            const result = DateTimeFormatter.isRelativeTimeFormatSupported();
            expect(typeof result).toBe('boolean');
            // В современной среде Jest с jsdom это должно быть true
            expect(result).toBe(true);
        });
        test('isDateTimeFormatSupported() should return boolean', () => {
            const result = DateTimeFormatter.isDateTimeFormatSupported();
            expect(typeof result).toBe('boolean');
            expect(result).toBe(true);
        });
        test('getAvailableLocales() should return array', () => {
            const locales = DateTimeFormatter.getAvailableLocales();
            expect(Array.isArray(locales)).toBe(true);
            // Проверяем, что массив содержит строки
            if (locales.length > 0) {
                expect(typeof locales[0]).toBe('string');
            }
        });
        test('should handle missing Intl gracefully', () => {
            // Сохраняем оригинальный Intl
            const originalIntl = global.Intl;
            try {
                // Мокаем отсутствие Intl
                // @ts-expect-error global.Intl = undefined
                global.Intl = undefined;
                expect(DateTimeFormatter.isRelativeTimeFormatSupported()).toBe(false);
                expect(DateTimeFormatter.isDateTimeFormatSupported()).toBe(false);
                expect(DateTimeFormatter.getAvailableLocales()).toEqual([]);
            }
            finally {
                // Восстанавливаем Intl
                global.Intl = originalIntl;
            }
        });
    });
    describe('Edge cases and error handling', () => {
        test('should handle invalid date', () => {
            const invalidDate = new Date('invalid');
            const result = DateTimeFormatter.date(invalidDate);
            // Браузеры по-разному обрабатывают invalid dates
            expect(typeof result).toBe('string');
        });
        test('should handle null/undefined date', () => {
            // @ts-expect-error date(null)
            expect(() => DateTimeFormatter.date(null)).toThrow();
            // @ts-expect-error date(undefined)
            expect(() => DateTimeFormatter.date(undefined)).toThrow();
        });
        test('should handle invalid locale', () => {
            const date = new Date();
            const result = DateTimeFormatter.date(date, 'invalid-locale');
            // Должен использовать fallback
            expect(typeof result).toBe('string');
        });
        test('formatDuration should handle very small values', () => {
            const result = DateTimeFormatter.formatRelative(0.001, 'ru-RU');
            expect(result).toBe('сейчас');
        });
        test('formatDuration should handle very large values', () => {
            const largeValue = 31536000 * 100; // 100 лет
            const result = DateTimeFormatter.formatRelative(largeValue, 'ru-RU');
            expect(result).toMatch(/лет/);
        });
        test('should handle missing RelativeTimeFormat in older browsers', () => {
            const originalRelativeTimeFormat = Intl.RelativeTimeFormat;
            try {
                // Временно удаляем RelativeTimeFormat
                delete Intl.RelativeTimeFormat;
                // Методы должны корректно обработать отсутствие поддержки
                expect(DateTimeFormatter.isRelativeTimeFormatSupported()).toBe(false);
            }
            finally {
                // Восстанавливаем
                Intl.RelativeTimeFormat = originalRelativeTimeFormat;
            }
        });
    });
    describe('Integration tests', () => {
        test('all methods should work together', () => {
            const date = new Date();
            // Тестируем цепочку вызовов
            const formattedDate = DateTimeFormatter.date(date);
            const formattedTime = DateTimeFormatter.time(date);
            const duration = DateTimeFormatter.formatRelative(3600);
            const weekdays = DateTimeFormatter.getWeekdays();
            expect(typeof formattedDate).toBe('string');
            expect(typeof formattedTime).toBe('string');
            expect(typeof duration).toBe('string');
            expect(Array.isArray(weekdays)).toBe(true);
        });
        test('should respect navigator.language as default', () => {
            mockNavigatorLanguage('de-DE');
            const date = new Date('2024-12-15T14:30:00Z');
            const result = DateTimeFormatter.date(date);
            // Немецкий формат даты: 15.12.2024
            expect(result).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
        });
        test('should handle timezone differences', () => {
            // Создаем дату в UTC
            const utcDate = new Date('2024-12-15T00:00:00Z');
            // Форматируем в разных локалях
            const resultUS = DateTimeFormatter.date(utcDate, 'en-US');
            const resultRU = DateTimeFormatter.date(utcDate, 'ru-RU');
            expect(resultUS).not.toBe(resultRU);
            expect(typeof resultUS).toBe('string');
            expect(typeof resultRU).toBe('string');
        });
    });
});
// Дополнительные тесты для специфических случаев
describe('DateTimeFormatter - Specific scenarios', () => {
    describe('Russian language specific formatting', () => {
        test('should use "и" for multiple units in Russian', () => {
            const result = DateTimeFormatter.formatRelative(3665, 'ru-RU');
            expect(result).toContain(' и ');
        });
        test('should not use "и" for single unit', () => {
            const result = DateTimeFormatter.formatRelative(3600, 'ru-RU');
            expect(result).not.toContain(' и ');
        });
        test('should use correct Russian pluralization', () => {
            const testCases = [
                { seconds: 1, expected: 'через 1 секунду' },
                { seconds: 2, expected: 'через 2 секунды' },
                { seconds: 5, expected: 'через 5 секунд' },
                { seconds: 21, expected: 'через 21 секунду' },
                { seconds: 22, expected: 'через 22 секунды' },
                { seconds: 25, expected: 'через 25 секунд' }
            ];
            testCases.forEach(({ seconds, expected }) => {
                const result = DateTimeFormatter.formatRelative(seconds, 'ru-RU', {
                    units: ['second']
                });
                expect(result).toBe(expected);
            });
        });
    });
    describe('English language formatting', () => {
        test('should use commas in English', () => {
            const result = DateTimeFormatter.formatRelative(3665, 'en-US');
            expect(result).toContain(', ');
        });
        test('should handle English pluralization', () => {
            const testCases = [
                { seconds: 1, expected: '1 second' },
                { seconds: 2, expected: '2 seconds' },
                { seconds: 60, expected: '1 minute' },
                { seconds: 120, expected: '2 minutes' }
            ];
            testCases.forEach(({ seconds, expected }) => {
                const result = DateTimeFormatter.formatRelative(seconds, 'en-US', {
                    units: seconds >= 60 ? ['minute', 'second'] : ['second']
                });
                expect(result).toContain(expected);
            });
        });
    });
    describe('Performance tests', () => {
        test('should handle multiple rapid calls', () => {
            const startTime = performance.now();
            const iterations = 1000;
            for (let i = 0; i < iterations; i++) {
                DateTimeFormatter.formatRelative(i * 60, 'ru-RU');
            }
            const endTime = performance.now();
            const duration = endTime - startTime;
            // Проверяем, что 1000 вызовов занимают менее 500ms
            expect(duration).toBeLessThan(500);
        });
        test('should not have memory leaks', () => {
            const initialMemory = process.memoryUsage().heapUsed;
            const results = [];
            for (let i = 0; i < 10000; i++) {
                results.push(DateTimeFormatter.formatRelative(i, 'ru-RU'));
            }
            const finalMemory = process.memoryUsage().heapUsed;
            const memoryIncrease = finalMemory - initialMemory;
            // Проверяем, что увеличение памяти разумное
            expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB
        });
    });
    describe('Browser compatibility simulation', () => {
        test('should work without Intl.DateTimeFormat options', () => {
            const originalDateTimeFormat = Intl.DateTimeFormat;
            try {
                // Создаем урезанную версию DateTimeFormat
                const mockDateTimeFormat = function (locale, options) {
                    return {
                        format: (date) => date.toLocaleDateString(locale)
                    };
                };
                mockDateTimeFormat.supportedLocalesOf = () => [];
                global.Intl.DateTimeFormat = mockDateTimeFormat;
                const result = DateTimeFormatter.date(new Date(), 'ru-RU');
                expect(typeof result).toBe('string');
            }
            finally {
                global.Intl.DateTimeFormat = originalDateTimeFormat;
            }
        });
    });
});
describe('DateTimeFormatter - Edge cases', () => {
    describe('formatDuration edge cases', () => {
        test('should handle exact thresholds', () => {
            // 1 минута = 60 секунд
            expect(DateTimeFormatter.formatRelative(60, 'ru-RU', { units: ['minute'] }))
                .toBe('через 1 минуту');
            // 1 час = 3600 секунд
            expect(DateTimeFormatter.formatRelative(3600, 'ru-RU', { units: ['hour'] }))
                .toBe('через 1 час');
            // 1 день = 86400 секунд
            expect(DateTimeFormatter.formatRelative(86400, 'ru-RU', { units: ['day'] }))
                .toBe('через 1 день');
        });
        test('should handle rounding', () => {
            // 59.9 секунд должно быть "сейчас" или "59 секунд"
            const result = DateTimeFormatter.formatRelative(59.9, 'ru-RU');
            expect(result === 'сейчас' || result.includes('59')).toBeTruthy();
        });
        test('should handle floating point seconds', () => {
            const result = DateTimeFormatter.formatRelative(1.5, 'ru-RU');
            expect(result).toBe('через 1 секунду'); // Округляется вниз
        });
    });
    describe('relativeTime edge cases', () => {
        test('should handle very large values', () => {
            let result = DateTimeFormatter.formatRelativeValue(1000, 'years', 'ru-RU');
            result = StringHelper.replaceToSpace(result);
            expect(result).toBe('через 1 000 лет');
        });
        test('should handle very small values', () => {
            const result = DateTimeFormatter.formatRelativeValue(0.001, 'seconds', 'ru-RU');
            expect(result).toMatch(/сейчас/);
        });
        test('should handle negative decimals', () => {
            const result = DateTimeFormatter.formatRelativeValue(-1.5, 'hours', 'ru-RU');
            expect(result).toMatch(/1/);
            expect(result).toMatch(/час/);
        });
    });
    describe('formatTimeUntil edge cases', () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2024-12-15T14:30:00Z'));
        });
        afterAll(() => {
            jest.useRealTimers();
        });
        test('should handle milliseconds difference', () => {
            const almostNow = new Date('2024-12-15T14:30:00.500Z');
            const result = DateTimeFormatter.formatRelativeOfDate(almostNow, 'ru-RU');
            expect(result).toBe('через 1 секунду');
        });
        test('should handle exactly 2 days', () => {
            const twoDaysLater = new Date('2024-12-17T14:30:00Z');
            const result = DateTimeFormatter.formatRelativeOfDate(twoDaysLater, 'ru-RU');
            expect(result).toBe('послезавтра');
        });
        test('should handle exactly 2 days ago', () => {
            const twoDaysAgo = new Date('2024-12-13T14:30:00Z');
            const result = DateTimeFormatter.formatRelativeOfDate(twoDaysAgo, 'ru-RU');
            expect(result).toBe('позавчера');
        });
    });
    describe('Locale-specific edge cases', () => {
        test('should handle zh-CN locale', () => {
            const date = new Date('2024-12-15T14:30:00Z');
            const result = DateTimeFormatter.date(date, 'zh-CN');
            expect(result).toMatch(/\d{4}/); // Год
            expect(result).toMatch(/\d{1,2}/); // Месяц
        });
        test('should handle ar-SA locale (right-to-left)', () => {
            const date = new Date('2024-12-15T14:30:00Z');
            const result = DateTimeFormatter.date(date, 'ar-SA');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });
        test('should handle hi-IN locale', () => {
            const result = DateTimeFormatter.formatRelative(3665, 'hi-IN');
            expect(typeof result).toBe('string');
        });
    });
    describe('Invalid input handling', () => {
        test('should handle NaN in formatDuration', () => {
            const result = DateTimeFormatter.formatRelative(NaN, 'ru-RU');
            expect(result).toBe('сейчас');
        });
        test('should handle Infinity in formatDuration', () => {
            const result = DateTimeFormatter.formatRelative(Infinity, 'ru-RU');
            expect(result).toBe('сейчас');
        });
        test('should handle undefined in relativeTime', () => {
            // @ts-expect-error relativeTime(undefined)
            expect(() => DateTimeFormatter.formatRelativeValue(undefined, 'hours')).toThrow();
        });
        test('should handle invalid unit in relativeTime', () => {
            expect(() => DateTimeFormatter.formatRelativeValue(1, 'invalid')).toThrow();
        });
    });
    describe('Time zone edge cases', () => {
        test('should handle dates in different timezones', () => {
            const date = new Date('2024-12-15T14:30:00Z');
            const resultNY = DateTimeFormatter.dateTime(date, 'en-US', {
                timeZone: 'America/New_York'
            });
            const resultTokyo = DateTimeFormatter.dateTime(date, 'ja-JP', {
                timeZone: 'Asia/Tokyo'
            });
            expect(resultNY).not.toBe(resultTokyo);
        });
    });
});
//# sourceMappingURL=DateTimeFormatter.spec.js.map