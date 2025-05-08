import { PathHelper } from './PathHelper';

describe('PathHelper', () => 
{
  describe('splitNameAndExtension', () => 
  {
    it('should return file name and extension', () => 
    {
      expect(PathHelper.splitNameAndExtension('')).toEqual(['', '']);
      expect(PathHelper.splitNameAndExtension('name.ext')).toEqual(['name', '.ext']);
      expect(PathHelper.splitNameAndExtension('name_-123')).toEqual(['name_-123', '']);
      expect(PathHelper.splitNameAndExtension('name.')).toEqual(['name', '.']);
      expect(PathHelper.splitNameAndExtension('.ext')).toEqual(['', '.ext']);
      expect(PathHelper.splitNameAndExtension('..ext')).toEqual(['.', '.ext']);
      expect(PathHelper.splitNameAndExtension('pre.name.suf.ext')).toEqual(['pre.name.suf', '.ext']);
    });
      
    it('should split filename with extension', () => 
    {
      expect(PathHelper.splitNameAndExtension('document.pdf')).toEqual(['document', '.pdf']);
    });

    it('should handle multiple dots in filename', () => 
    {
      expect(PathHelper.splitNameAndExtension('archive.tar.gz')).toEqual(['archive.tar', '.gz']);
    });

    it('should return empty extension for files without extension', () => 
    {
      expect(PathHelper.splitNameAndExtension('fileWithoutExtension')).toEqual(['fileWithoutExtension', '']);
    });

    it('should handle dot at the beginning', () => 
    {
      expect(PathHelper.splitNameAndExtension('.hiddenfile')).toEqual(['', '.hiddenfile']);
    });
  });

  describe('hasExtension', () => 
  {
    it('should return true for files with extension', () => 
    {
      expect(PathHelper.hasExtension('image.jpg')).toBe(true);
      expect(PathHelper.hasExtension('archive.tar.gz')).toBe(true);
    });

    it('should return false for files without extension', () => 
    {
      expect(PathHelper.hasExtension('fileWithoutExtension')).toBe(false);
      expect(PathHelper.hasExtension('.hiddenfile')).toBe(false);
    });
  });

  describe('getExtension', () => 
  {
    it('should return extension with dot', () => 
    {
      expect(PathHelper.getExtension('presentation.pptx')).toBe('.pptx');
      expect(PathHelper.getExtension('config.json')).toBe('.json');
    });

    it('should return empty string for files without extension', () => 
    {
      expect(PathHelper.getExtension('README')).toBe('');
      expect(PathHelper.getExtension('Dockerfile')).toBe('');
    });

    it('should handle complex extensions', () => 
    {
      expect(PathHelper.getExtension('archive.tar.gz')).toBe('.gz');
    });
  });

  describe('joinPathAndFile', () => 
  {
    it('should join path and file correctly', () => 
    {
      expect(PathHelper.joinPathAndFile('dir/subdir', 'file.txt')).toBe('dir/subdir/file.txt');
    });

    it('should handle trailing slashes in path', () => 
    {
      expect(PathHelper.joinPathAndFile('dir/', 'file.txt')).toBe('dir/file.txt');
      expect(PathHelper.joinPathAndFile('dir\\', 'file.txt')).toBe('dir/file.txt');
    });

    it('should handle leading slashes in filename', () => 
    {
      expect(PathHelper.joinPathAndFile('dir', '/file.txt')).toBe('dir/file.txt');
      expect(PathHelper.joinPathAndFile('dir', '\\file.txt')).toBe('dir/file.txt');
    });

    it('should handle multiple slashes', () => 
    {
      expect(PathHelper.joinPathAndFile('dir//', '//file.txt')).toBe('dir/file.txt');
    });

    it('should handle empty path', () => 
    {
      expect(PathHelper.joinPathAndFile('', 'file.txt')).toBe('/file.txt');
    });
  });
});
