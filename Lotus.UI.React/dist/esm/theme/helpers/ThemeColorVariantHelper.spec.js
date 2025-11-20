import { ThemeColorVariantHelper } from './ThemeColorVariantHelper';
describe('ThemeColorVariantHelper', function () {
    it('instanceOf', function (done) {
        expect(ThemeColorVariantHelper.instanceOf('primaryDarkest')).toBe(true);
        expect(ThemeColorVariantHelper.instanceOf('blueGreyDarkest')).toBe(true);
        expect(ThemeColorVariantHelper.instanceOf('blueGreyDarkest222')).toBe(false);
        done();
    });
    it('deconstructionThemeColorVariant', function (done) {
        expect(ThemeColorVariantHelper.deconstruction('primaryDarkest')).toStrictEqual({ themeColor: 'primary', colorVariant: 'darkest' });
        expect(ThemeColorVariantHelper.deconstruction('blueGreyDarkest')).toStrictEqual({ themeColor: 'blueGrey', colorVariant: 'darkest' });
        expect(ThemeColorVariantHelper.deconstruction('blueGreyDarkest222')).toBeUndefined();
        done();
    });
});
//# sourceMappingURL=ThemeColorVariantHelper.spec.js.map