import { describe, expect } from '@jest/globals';
import { instanceOfConstantable } from './Constantable';
describe('test IConstantable', () => {
    it('check interface', () => {
        const data0 = { isConst: true };
        const data1 = { isConst: false };
        const data2 = { isConst: '' };
        const data3 = { isconst: true };
        expect(instanceOfConstantable(null)).toBe(false);
        expect(instanceOfConstantable(undefined)).toBe(false);
        expect(instanceOfConstantable(data0)).toBe(true);
        expect(instanceOfConstantable(data0)).toBe(true);
        expect(instanceOfConstantable(data1)).toBe(false);
        expect(instanceOfConstantable(data2)).toBe(false);
        expect(instanceOfConstantable(data3)).toBe(false);
    });
});
//# sourceMappingURL=Constantable.spec.js.map