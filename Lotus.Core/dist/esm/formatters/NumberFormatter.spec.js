import { NumberFormatter } from './NumberFormatter';
describe('NumberFormatter', () => {
    describe('number', () => {
        it('форматирует число с учетом локали по умолчанию', () => {
            expect(NumberFormatter.number(1234567.89, 'en-US')).toMatch(/1[,.]234[,.]567[,.]89/);
        });
        it('форматирует число с учетом указанной локали', () => {
            expect(NumberFormatter.number(1234567.89, 'ru-RU')).toBe('1\u00A0234\u00A0567,89');
            expect(NumberFormatter.number(1234567.89, 'en-US')).toBe('1,234,567.89');
        });
        it('форматирует число с дополнительными опциями', () => {
            expect(NumberFormatter.number(1234567.89, 'en-US', { minimumFractionDigits: 3 })).toBe('1,234,567.890');
        });
    });
    describe('currency', () => {
        it('форматирует число как валюту с учетом локали по умолчанию', () => {
            expect(NumberFormatter.currency(1234567.89, 'USD', 'en-US')).toMatch(/\$1[,.]234[,.]567[,.]89/);
        });
        it('форматирует число как валюту с учетом указанной локали', () => {
            expect(NumberFormatter.currency(1234567.89, 'RUB', 'ru-RU')).toBe('1\u00A0234\u00A0567,89\u00A0₽');
            expect(NumberFormatter.currency(1234567.89, 'EUR', 'de-DE')).toBe('1.234.567,89\u00A0€');
        });
    });
    describe('percentage', () => {
        it('форматирует число как процент с учетом локали по умолчанию', () => {
            expect(NumberFormatter.percentage(0.1234, 'en-US', { minimumFractionDigits: 2 })).toMatch(/12[,.]34%/);
        });
        it('форматирует число как процент с учетом указанной локали', () => {
            expect(NumberFormatter.percentage(0.1234, 'ru-RU', { minimumFractionDigits: 2 })).toBe('12,34\u00A0%');
            expect(NumberFormatter.percentage(0.1234, 'en-US', { minimumFractionDigits: 2 })).toBe('12.34%');
        });
        it('форматирует число как процент с дополнительными опциями', () => {
            expect(NumberFormatter.percentage(0.1234, 'en-US', { minimumFractionDigits: 1 })).toBe('12.3%');
        });
    });
    describe('numberFixed', () => {
        it('форматирует число в соответствии с форматом "0,0[.][00]"', () => {
            expect(NumberFormatter.numberFixed(1234567, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567');
            expect(NumberFormatter.numberFixed(1234567.89, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567.89');
            expect(NumberFormatter.numberFixed(1234567.0, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567');
            expect(NumberFormatter.numberFixed(1234567.89123, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567.89');
        });
        it('форматирует число с учетом указанной локали', () => {
            expect(NumberFormatter.numberFixed(1234567.89, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567.89');
            expect(NumberFormatter.numberFixed(1234567.89, 2, 'de-DE')).toBe('1.234.567.89');
        });
        it('форматирует число с нулевой дробной частью', () => {
            expect(NumberFormatter.numberFixed(1234567.0, 2, 'en-US')).toBe('1,234,567');
            expect(NumberFormatter.numberFixed(1234567.0, 2, 'ru-RU')).toBe('1\u00A0234\u00A0567');
        });
    });
});
//# sourceMappingURL=NumberFormatter.spec.js.map