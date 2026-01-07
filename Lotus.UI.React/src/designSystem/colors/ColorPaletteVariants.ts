import { Color, ColorVariants } from 'lotus-core/modules/color';

/**
 * Наборы типовых вариантов цвета
 */
export abstract class ColorPaletteVariants
{
  /**
   * Основной цвет - синяя палитра MUI
   */
  public static readonly Primary: ColorVariants = new ColorVariants(
    new Color('#e3f2fd'), // 0 - white
    new Color('#bbdefb'), // 1 - palest
    new Color('#90caf9'), // 2 - pale
    new Color('#64b5f6'), // 3 - lighter
    new Color('#42a5f5'), // 4 - light
    new Color('#2196f3'), // 5 - main
    new Color('#1e88e5'), // 6 - dark
    new Color('#1976d2'), // 7 - darker
    new Color('#1565c0'), // 8 - darkest
    new Color('#0d47a1') // 9 - black
  );

  /**
   * Дополнительный цвет - фиолетовая палитра MUI
   */
  public static readonly Secondary: ColorVariants = new ColorVariants(
    new Color('#f3e5f5'), // 0 - white
    new Color('#e1bee7'), // 1 - palest
    new Color('#ce93d8'), // 2 - pale
    new Color('#ba68c8'), // 3 - lighter
    new Color('#ab47bc'), // 4 - light
    new Color('#9c27b0'), // 5 - main
    new Color('#8e24aa'), // 6 - dark
    new Color('#7b1fa2'), // 7 - darker
    new Color('#6a1b9a'), // 8 - darkest
    new Color('#4a148c') // 9 - black
  );

  /**
   * Цвет для ошибок - красная палитра MUI
   */
  public static readonly Error: ColorVariants = new ColorVariants(
    new Color('#ffebee'), // 0 - white
    new Color('#ffcdd2'), // 1 - palest
    new Color('#ef9a9a'), // 2 - pale
    new Color('#e57373'), // 3 - lighter
    new Color('#ef5350'), // 4 - light
    new Color('#f44336'), // 5 - main
    new Color('#e53935'), // 6 - dark
    new Color('#d32f2f'), // 7 - darker
    new Color('#c62828'), // 8 - darkest
    new Color('#b71c1c') // 9 - black
  );

  /**
   * Цвет для предупреждений - оранжевая палитра MUI
   */
  public static readonly Warning: ColorVariants = new ColorVariants(
    new Color('#fff3e0'), // 0 - white
    new Color('#ffe0b2'), // 1 - palest
    new Color('#ffcc80'), // 2 - pale
    new Color('#ffb74d'), // 3 - lighter
    new Color('#ffa726'), // 4 - light
    new Color('#ff9800'), // 5 - main
    new Color('#fb8c00'), // 6 - dark
    new Color('#f57c00'), // 7 - darker
    new Color('#ef6c00'), // 8 - darkest
    new Color('#e65100') // 9 - black
  );

  /**
   * Цвет для информирование - голубая палитра MUI
   */
  public static readonly Info: ColorVariants = new ColorVariants(
    new Color('#e1f5fe'), // 0 - white
    new Color('#b3e5fc'), // 1 - palest
    new Color('#81d4fa'), // 2 - pale
    new Color('#4fc3f7'), // 3 - lighter
    new Color('#29b6f6'), // 4 - light
    new Color('#03a8f4'), // 5 - main
    new Color('#039be5'), // 6 - dark
    new Color('#0288d1'), // 7 - darker
    new Color('#0277bd'), // 8 - darkest
    new Color('#01579b') // 9 - black
  );

  /**
   * Цвет для успешности - зеленая палитра MUI
   */
  public static readonly Success: ColorVariants = new ColorVariants(
    new Color('#e8f5e8'), // 0 - white
    new Color('#c8e6c9'), // 1 - palest
    new Color('#a5d6a7'), // 2 - pale
    new Color('#81c784'), // 3 - lighter
    new Color('#66bb6a'), // 4 - light
    new Color('#4caf50'), // 5 - main
    new Color('#43a047'), // 6 - dark
    new Color('#388e3c'), // 7 - darker
    new Color('#2e7d32'), // 8 - darkest
    new Color('#1b5e20') // 9 - black
  );

  /**
   * Синея палитра Mui
   */
  public static readonly MuiBlue: ColorVariants = new ColorVariants(
    new Color('#e3f2fd'), // 0 - white
    new Color('#bbdefb'), // 1 - palest
    new Color('#90caf9'), // 2 - pale
    new Color('#64b5f6'), // 3 - lighter
    new Color('#42a5f5'), // 4 - light
    new Color('#2196f3'), // 5 - main
    new Color('#1e88e5'), // 6 - dark
    new Color('#1976d2'), // 7 - darker
    new Color('#1565c0'), // 8 - darkest
    new Color('#0d47a1') // 9 - black
  );

  /**
   * Синея-серая палитра Mui
   */
  public static readonly MuiBlueGrey: ColorVariants = new ColorVariants(
    new Color('#eceff1'), // 0 - white
    new Color('#cfd8dc'), // 1 - palest
    new Color('#b0bec5'), // 2 - pale
    new Color('#90a4ae'), // 3 - lighter
    new Color('#78909c'), // 4 - light
    new Color('#607d8b'), // 5 - main
    new Color('#546e7a'), // 6 - dark
    new Color('#455a64'), // 7 - darker
    new Color('#37474f'), // 8 - darkest
    new Color('#263238') // 9 - black
  );

  /**
   * Indigo палитра Mui
   */
  public static readonly MuiIndigo: ColorVariants = new ColorVariants(
    new Color('#e8eaf6'), // 0 - white
    new Color('#c5cae9'), // 1 - palest
    new Color('#9fa8da'), // 2 - pale
    new Color('#7986cb'), // 3 - lighter
    new Color('#5c6bc0'), // 4 - light
    new Color('#3f51b5'), // 5 - main
    new Color('#3949ab'), // 6 - dark
    new Color('#303f9f'), // 7 - darker
    new Color('#283593'), // 8 - darkest
    new Color('#1a237e') // 9 - black
  );

  /**
   * Зеленая палитра Mui
   */
  public static readonly MuiGreen: ColorVariants = new ColorVariants(
    new Color('#e8f5e9'), // 0 - white
    new Color('#c8e6c9'), // 1 - palest
    new Color('#a5d6a7'), // 2 - pale
    new Color('#81c784'), // 3 - lighter
    new Color('#66bb6a'), // 4 - light
    new Color('#4caf50'), // 5 - main
    new Color('#43a047'), // 6 - dark
    new Color('#388e3c'), // 7 - darker
    new Color('#2e7d32'), // 8 - darkest
    new Color('#1b5e20') // 9 - black
  );

  /**
   * Бирюзовая палитра Mui
   */
  public static readonly MuiTeal: ColorVariants = new ColorVariants(
    new Color('#e0f2f1'), // 0 - white
    new Color('#b2dfdb'), // 1 - palest
    new Color('#80cbc4'), // 2 - pale
    new Color('#4db6ac'), // 3 - lighter
    new Color('#26a69a'), // 4 - light
    new Color('#009688'), // 5 - main
    new Color('#00897b'), // 6 - dark
    new Color('#00796b'), // 7 - darker
    new Color('#00695c'), // 8 - darkest
    new Color('#004d40') // 9 - black
  );

  /**
   * Желтая палитра Mui
   */
  public static readonly MuiYellow: ColorVariants = new ColorVariants(
    new Color('#fffde7'), // 0 - white
    new Color('#fff9c4'), // 1 - palest
    new Color('#fff59d'), // 2 - pale
    new Color('#fff176'), // 3 - lighter
    new Color('#ffee58'), // 4 - light
    new Color('#ffeb3b'), // 5 - main
    new Color('#fdd835'), // 6 - dark
    new Color('#fbc02d'), // 7 - darker
    new Color('#f9a825'), // 8 - darkest
    new Color('#f57f17') // 9 - black
  );

  /**
   * Янтарная палитра Mui
   */
  public static readonly MuiAmber: ColorVariants = new ColorVariants(
    new Color('#fff8e1'), // 0 - white
    new Color('#ffecb3'), // 1 - palest
    new Color('#ffe082'), // 2 - pale
    new Color('#ffd54f'), // 3 - lighter
    new Color('#ffca28'), // 4 - light
    new Color('#ffc107'), // 5 - main
    new Color('#ffb300'), // 6 - dark
    new Color('#ffa000'), // 7 - darker
    new Color('#ff8f00'), // 8 - darkest
    new Color('#ff6f00') // 9 - black
  );

  /**
   * Красная палитра Mui
   */
  public static readonly MuiRed: ColorVariants = new ColorVariants(
    new Color('#ffebee'), // 0 - white
    new Color('#ffcdd2'), // 1 - palest
    new Color('#ef9a9a'), // 2 - pale
    new Color('#e57373'), // 3 - lighter
    new Color('#ef5350'), // 4 - light
    new Color('#f44336'), // 5 - main
    new Color('#e53935'), // 6 - dark
    new Color('#d32f2f'), // 7 - darker
    new Color('#c62828'), // 8 - darkest
    new Color('#b71c1c') // 9 - black
  );

  /**
   * Коричневая палитра Mui
   */
  public static readonly MuiBrown: ColorVariants = new ColorVariants(
    new Color('#efebe9'), // 0 - white
    new Color('#d7ccc8'), // 1 - palest
    new Color('#bcaaa4'), // 2 - pale
    new Color('#a1887f'), // 3 - lighter
    new Color('#8d6e63'), // 4 - light
    new Color('#795548'), // 5 - main
    new Color('#6d4c41'), // 6 - dark
    new Color('#5d4037'), // 7 - darker
    new Color('#4e342e'), // 8 - darkest
    new Color('#3e2723') // 9 - black
  );

  /**
   * Серая палитра Mui
   */
  public static readonly MuiGray: ColorVariants = new ColorVariants(
    new Color('#fafafa'), // 0 - white
    new Color('#f5f5f5'), // 1 - palest
    new Color('#eeeeee'), // 2 - pale
    new Color('#e0e0e0'), // 3 - lighter
    new Color('#bdbdbd'), // 4 - light
    new Color('#9e9e9e'), // 5 - main
    new Color('#757575'), // 6 - dark
    new Color('#616161'), // 7 - darker
    new Color('#424242'), // 8 - darkest
    new Color('#212121') // 9 - black
  );

  /**
   * Серая палитра Mantine
   */
  public static readonly MantineGray: ColorVariants = new ColorVariants(
    new Color('#f8f9fa'), // 0 - white
    new Color('#f1f3f5'), // 1 - palest
    new Color('#e9ecef'), // 2 - pale
    new Color('#dee2e6'), // 3 - lighter
    new Color('#ced4da'), // 4 - light
    new Color('#adb5bd'), // 5 - main
    new Color('#868e96'), // 6 - dark
    new Color('#495057'), // 7 - darker
    new Color('#343a40'), // 8 - darkest
    new Color('#212529') // 9 - black
  );

  /**
   * Темная палитра Mantine
   */
  public static readonly MantineDark: ColorVariants = new ColorVariants(
    new Color('#C9C9C9'), // 0 - white
    new Color('#b8b8b8'), // 1 - palest
    new Color('#828282'), // 2 - pale
    new Color('#696969'), // 3 - lighter
    new Color('#424242'), // 4 - light
    new Color('#3b3b3b'), // 5 - main
    new Color('#2e2e2e'), // 6 - dark
    new Color('#242424'), // 7 - darker
    new Color('#1f1f1f'), // 8 - darkest
    new Color('#141414') // 9 - black
  );
}
