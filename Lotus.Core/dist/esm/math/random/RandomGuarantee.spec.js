import { RandomGuarantee } from './RandomGuarantee';
import { RandomShift } from './RandomShift';
describe('RandomGuarantee Tests', () => {
    let rng;
    let gen;
    beforeEach(() => {
        rng = new RandomShift(42); // Фиксированный seed
        gen = new RandomGuarantee(rng, 100);
    });
    test('Точность распределения (25/50/25)', () => {
        gen.addProbabilityList(25, 50, 25);
        const counts = {};
        for (let i = 0; i < 100; i++) {
            const val = gen.nextProbability();
            counts[val] = (counts[val] || 0) + 1;
        }
        expect(counts[0]).toBe(25);
        expect(counts[1]).toBe(50);
        expect(counts[2]).toBe(25);
    });
    test('Работа свойства totalProbabilitySetted', () => {
        gen.addProbability(10, 15);
        gen.addProbability(20, 25);
        expect(gen.totalProbabilitySetted).toBe(40);
    });
    test('Работа свойства probabilityDetail', () => {
        gen.clearProbability();
        gen.addProbability(5, 3); // 3% шанса для индекса 5
        const detail = gen.probabilityDetail;
        expect(detail.length).toBe(3);
        expect(detail.every(v => v === 5)).toBe(true);
    });
    test('Безопасная проверка checkProbability', () => {
        gen.clearProbability();
        gen.addProbability(99, 10); // 10% шанс на успех (ID 99)
        let successCount = 0;
        for (let i = 0; i < 100; i++) {
            if (gen.checkProbability(99)) {
                successCount++;
            }
            else {
                gen.nextProbability(); // Сдвигаем при промахе
            }
        }
        expect(successCount).toBe(10);
    });
    test('Автоматический перезапуск nextProbabilityAndReset', () => {
        gen.addProbability(1, 100); // Всегда 1
        // Доходим до конца
        for (let i = 0; i < 99; i++)
            gen.nextProbabilityAndReset();
        // 100-й вызов
        gen.nextProbabilityAndReset();
        // 101-й вызов должен сбросить индекс в 0 после Reset
        gen.nextProbabilityAndReset();
        expect(gen.currentIndex).toBe(0);
    });
    test('PeekNext не изменяет индекс', () => {
        gen.addProbabilityList(50, 50);
        const currentIndexBefore = gen.currentIndex;
        const nextVal = gen.peekNext();
        expect(gen.currentIndex).toBe(currentIndexBefore);
        expect(gen.nextProbability()).toBe(nextVal);
    });
});
//# sourceMappingURL=RandomGuarantee.spec.js.map