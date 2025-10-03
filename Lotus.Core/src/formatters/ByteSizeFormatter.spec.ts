import { LocalizationCore } from '#localization';
import { ByteSizeFormatter } from './ByteSizeFormatter';

describe('test ByteSizeFormatter.ByteSize', () => 
{
  it('should return file size', () => 
  {
    expect(ByteSizeFormatter.byteSize(0, 'en-US')).toBe(`0 ${LocalizationCore.data.byteSize.Kb}`);
    expect(ByteSizeFormatter.byteSize(829, 'en-US')).toBe(`0.81 ${LocalizationCore.data.byteSize.Kb}`);
    expect(ByteSizeFormatter.byteSize(5632, 'en-US')).toBe(`5.5 ${LocalizationCore.data.byteSize.Kb}`);
    expect(ByteSizeFormatter.byteSize(65424, 'en-US')).toBe(`63.89 ${LocalizationCore.data.byteSize.Kb}`);
    expect(ByteSizeFormatter.byteSize(12345640, 'en-US')).toBe(`11.77 ${LocalizationCore.data.byteSize.Mb}`);
    expect(ByteSizeFormatter.byteSize(78177935360, 'en-US')).toBe(`72.81 ${LocalizationCore.data.byteSize.Gb}`);
  });
});
