import { Color } from './Color';
import { ColorVariants } from './ColorVariants';
/**
 * Цветовая палитра для светлой темы
 */
export class LightColorPalette {
    /**
     * Основной цвет - синяя палитра MUI
     */
    static Primary = new ColorVariants(new Color('#f5fbff'), // 0 - white (самый светлый фон)
    new Color('#e3f2fd'), // 1 - palest (очень светлый фон)
    new Color('#bbdefb'), // 2 - pale (светлый фон)
    new Color('#90caf9'), // 3 - lighter (акцентный фон)
    new Color('#64b5f6'), // 4 - light (слабый акцент)
    new Color('#1976d2'), // 5 - main (основной цвет для кнопок, акцентов)
    new Color('#1565c0'), // 6 - dark (наведение, активное состояние)
    new Color('#0d47a1'), // 7 - darker (нажатое состояние)
    new Color('#08367e'), // 8 - darkest (текст на светлом фоне)
    new Color('#04295a') // 9 - black (самый темный акцент)
    );
    /**
     * Дополнительный цвет - фиолетовая палитра MUI
     */
    static Secondary = new ColorVariants(new Color('#faf5ff'), // 0 - white (вторичный фон)
    new Color('#f3e5f5'), // 1 - palest (очень светлый вторичный фон)
    new Color('#e1bee7'), // 2 - pale (светлый вторичный фон)
    new Color('#ce93d8'), // 3 - lighter (слабый вторичный акцент)
    new Color('#ba68c8'), // 4 - light (вторичная подсветка)
    new Color('#7b1fa2'), // 5 - main (основной вторичный цвет)
    new Color('#6a1b9a'), // 6 - dark (вторичный акцент)
    new Color('#4a148c'), // 7 - darker (темный вторичный акцент)
    new Color('#3a1070'), // 8 - darkest (вторичный текст)
    new Color('#2a0c54') // 9 - black (очень темный вторичный)
    );
    /**
     * Цвет для ошибок - красная палитра MUI
     */
    static Error = new ColorVariants(new Color('#fff5f5'), // 0 - white (фон ошибок)
    new Color('#ffebee'), // 1 - palest (очень светлый фон ошибок)
    new Color('#ffcdd2'), // 2 - pale (светлый фон ошибок)
    new Color('#ef9a9a'), // 3 - lighter (слабый акцент ошибки)
    new Color('#e57373'), // 4 - light (подсветка ошибок)
    new Color('#d32f2f'), // 5 - main (основной цвет ошибки)
    new Color('#c62828'), // 6 - dark (серьезные ошибки)
    new Color('#b71c1c'), // 7 - darker (критические ошибки)
    new Color('#9b1616'), // 8 - darkest (текст ошибок)
    new Color('#7a1111') // 9 - black (очень темные ошибки)
    );
    /**
     * Цвет для предупреждений - оранжевая палитра MUI
     */
    static Warning = new ColorVariants(new Color('#fffaf0'), // 0 - white (фон предупреждений)
    new Color('#fff3e0'), // 1 - palest (очень светлый фон предупреждений)
    new Color('#ffe0b2'), // 2 - pale (светлый фон предупреждений)
    new Color('#ffcc80'), // 3 - lighter (слабый акцент предупреждения)
    new Color('#ffb74d'), // 4 - light (подсветка предупреждений)
    new Color('#f57c00'), // 5 - main (основной цвет предупреждения)
    new Color('#ef6c00'), // 6 - dark (важные предупреждения)
    new Color('#e65100'), // 7 - darker (срочные предупреждения)
    new Color('#cc4a00'), // 8 - darkest (текст предупреждений)
    new Color('#a83c00') // 9 - black (очень темные предупреждения)
    );
    /**
     * Цвет для информирование - голубая палитра MUI
     */
    static Info = new ColorVariants(new Color('#f0f9ff'), // 0 - white (фон информации)
    new Color('#e1f5fe'), // 1 - palest (очень светлый фон информации)
    new Color('#b3e5fc'), // 2 - pale (светлый фон информации)
    new Color('#81d4fa'), // 3 - lighter (слабый акцент информации)
    new Color('#4fc3f7'), // 4 - light (подсветка информации)
    new Color('#0288d1'), // 5 - main (основной цвет информации)
    new Color('#0277bd'), // 6 - dark (важная информация)
    new Color('#01579b'), // 7 - darker (критическая информация)
    new Color('#014682'), // 8 - darkest (текст информации)
    new Color('#00365a') // 9 - black (очень темная информация)
    );
    /**
     * Цвет для успешности - зеленая палитра MUI
     */
    static Success = new ColorVariants(new Color('#f0fff4'), // 0 - white (фон успеха)
    new Color('#e8f5e8'), // 1 - palest (очень светлый фон успеха)
    new Color('#c8e6c9'), // 2 - pale (светлый фон успеха)
    new Color('#a5d6a7'), // 3 - lighter (слабый акцент успеха)
    new Color('#81c784'), // 4 - light (подсветка успеха)
    new Color('#2e7d32'), // 5 - main (основной цвет успеха)
    new Color('#2e7d32'), // 6 - dark (уверенный успех)
    new Color('#1b5e20'), // 7 - darker (значительный успех)
    new Color('#145218'), // 8 - darkest (текст успеха)
    new Color('#0e3a10') // 9 - black (очень темный успех)
    );
    /**
     * Синея палитра Mui
     */
    static MuiBlue = new ColorVariants(new Color('#e3f2fd'), // 0 - white
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
    static MuiBlueGray = new ColorVariants(new Color('#eceff1'), // 0 - white
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
    static MuiIndigo = new ColorVariants(new Color('#e8eaf6'), // 0 - white
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
    static MuiGreen = new ColorVariants(new Color('#e8f5e9'), // 0 - white
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
    static MuiTeal = new ColorVariants(new Color('#e0f2f1'), // 0 - white
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
    static MuiYellow = new ColorVariants(new Color('#fffde7'), // 0 - white
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
    static MuiAmber = new ColorVariants(new Color('#fff8e1'), // 0 - white
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
    static MuiRed = new ColorVariants(new Color('#ffebee'), // 0 - white
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
    static MuiBrown = new ColorVariants(new Color('#efebe9'), // 0 - white
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
    static MuiGray = new ColorVariants(new Color('#fafafa'), // 0 - white
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
    static MantineGray = new ColorVariants(new Color('#f8f9fa'), // 0 - white
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
    static MantineDark = new ColorVariants(new Color('#C9C9C9'), // 0 - white
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
/**
 * Цветовая палитра для темной темы
 */
export class DarkColorPalette {
    /**
     * Основной цвет - синяя палитра MUI (адаптированная для темного фона)
     */
    static Primary = new ColorVariants(new Color('#0a1c3a'), // 0 - black (самый темный фон)
    new Color('#0d2447'), // 1 - darkest (очень темный фон)
    new Color('#102d54'), // 2 - darker (темный фон)
    new Color('#143661'), // 3 - dark (акцентный фон)
    new Color('#1a4685'), // 4 - light (слабый акцент)
    new Color('#64b5f6'), // 5 - main (основной цвет для кнопок, акцентов)
    new Color('#90caf9'), // 6 - lighter (наведение, активное состояние)
    new Color('#bbdefb'), // 7 - pale (нажатое состояние)
    new Color('#e3f2fd'), // 8 - palest (текст на темном фоне)
    new Color('#ffffff') // 9 - white (самый светлый текст)
    );
    /**
     * Дополнительный цвет - фиолетовая палитра MUI (адаптированная для темного фона)
     */
    static Secondary = new ColorVariants(new Color('#1a0a2a'), // 0 - black (вторичный фон)
    new Color('#240f3a'), // 1 - darkest (очень темный вторичный фон)
    new Color('#2e144a'), // 2 - darker (темный вторичный фон)
    new Color('#38195a'), // 3 - dark (акцентный вторичный фон)
    new Color('#58238b'), // 4 - light (слабый вторичный акцент)
    new Color('#ce93d8'), // 5 - main (основной вторичный цвет)
    new Color('#e1bee7'), // 6 - lighter (вторичный акцент)
    new Color('#f3e5f5'), // 7 - pale (темный вторичный акцент)
    new Color('#faf5ff'), // 8 - palest (вторичный текст)
    new Color('#ffffff') // 9 - white (очень светлый вторичный)
    );
    /**
     * Цвет для ошибок - красная палитра MUI (адаптированная для темного фона)
     */
    static Error = new ColorVariants(new Color('#2a0a0a'), // 0 - black (фон ошибок)
    new Color('#3a0f0f'), // 1 - darkest (очень темный фон ошибок)
    new Color('#4a1414'), // 2 - darker (темный фон ошибок)
    new Color('#5a1919'), // 3 - dark (акцентный фон ошибок)
    new Color('#8b2323'), // 4 - light (слабый акцент ошибки)
    new Color('#ef9a9a'), // 5 - main (основной цвет ошибки)
    new Color('#ffcdd2'), // 6 - lighter (серьезные ошибки)
    new Color('#ffebee'), // 7 - pale (критические ошибки)
    new Color('#fff5f5'), // 8 - palest (текст ошибок)
    new Color('#ffffff') // 9 - white (очень светлые ошибки)
    );
    /**
     * Цвет для предупреждений - оранжевая палитра MUI (адаптированная для темного фона)
     */
    static Warning = new ColorVariants(new Color('#2a1c0a'), // 0 - black (фон предупреждений)
    new Color('#3a260f'), // 1 - darkest (очень темный фон предупреждений)
    new Color('#4a3014'), // 2 - darker (темный фон предупреждений)
    new Color('#5a3a19'), // 3 - dark (акцентный фон предупреждений)
    new Color('#8b5a23'), // 4 - light (слабый акцент предупреждения)
    new Color('#ffcc80'), // 5 - main (основной цвет предупреждения)
    new Color('#ffe0b2'), // 6 - lighter (важные предупреждения)
    new Color('#fff3e0'), // 7 - pale (срочные предупреждения)
    new Color('#fffaf0'), // 8 - palest (текст предупреждений)
    new Color('#ffffff') // 9 - white (очень светлые предупреждения)
    );
    /**
     * Цвет для информирование - голубая палитра MUI (адаптированная для темного фона)
     */
    static Info = new ColorVariants(new Color('#0a1a2a'), // 0 - black (фон информации)
    new Color('#0f243a'), // 1 - darkest (очень темный фон информации)
    new Color('#142e4a'), // 2 - darker (темный фон информации)
    new Color('#19385a'), // 3 - dark (акцентный фон информации)
    new Color('#23558b'), // 4 - light (слабый акцент информации)
    new Color('#81d4fa'), // 5 - main (основной цвет информации)
    new Color('#b3e5fc'), // 6 - lighter (важная информация)
    new Color('#e1f5fe'), // 7 - pale (критическая информация)
    new Color('#f0f9ff'), // 8 - palest (текст информации)
    new Color('#ffffff') // 9 - white (очень светлая информация)
    );
    /**
     * Цвет для успешности - зеленая палитра MUI (адаптированная для темного фона)
     */
    static Success = new ColorVariants(new Color('#0a1a0a'), // 0 - black (фон успеха)
    new Color('#0f240f'), // 1 - darkest (очень темный фон успеха)
    new Color('#142e14'), // 2 - darker (темный фон успеха)
    new Color('#193819'), // 3 - dark (акцентный фон успеха)
    new Color('#235823'), // 4 - light (слабый акцент успеха)
    new Color('#a5d6a7'), // 5 - main (основной цвет успеха)
    new Color('#c8e6c9'), // 6 - lighter (уверенный успех)
    new Color('#e8f5e8'), // 7 - pale (значительный успех)
    new Color('#f0fff4'), // 8 - palest (текст успеха)
    new Color('#ffffff') // 9 - white (очень светлый успех)
    );
    /**
     * Синяя палитра MUI (темная тема)
     */
    static MuiBlue = new ColorVariants(new Color('#051e3a'), // 0 - black (самый темный)
    new Color('#0d2c51'), // 1 - darkest
    new Color('#143a68'), // 2 - darker
    new Color('#1c487f'), // 3 - dark
    new Color('#2962b3'), // 4 - light
    new Color('#42a5f5'), // 5 - main (основной для темного фона)
    new Color('#64b5f6'), // 6 - lighter
    new Color('#90caf9'), // 7 - pale
    new Color('#bbdefb'), // 8 - palest
    new Color('#e3f2fd') // 9 - white (самый светлый)
    );
    /**
     * Синея-серая палитра MUI (темная тема)
     */
    static MuiBlueGray = new ColorVariants(new Color('#1a252a'), // 0 - black
    new Color('#263238'), // 1 - darkest
    new Color('#37474f'), // 2 - darker
    new Color('#455a64'), // 3 - dark
    new Color('#546e7a'), // 4 - light
    new Color('#78909c'), // 5 - main
    new Color('#90a4ae'), // 6 - lighter
    new Color('#b0bec5'), // 7 - pale
    new Color('#cfd8dc'), // 8 - palest
    new Color('#eceff1') // 9 - white
    );
    /**
     * Indigo палитра MUI (темная тема)
     */
    static MuiIndigo = new ColorVariants(new Color('#0d0f2a'), // 0 - black
    new Color('#1a1c47'), // 1 - darkest
    new Color('#272964'), // 2 - darker
    new Color('#343681'), // 3 - dark
    new Color('#4a4fb3'), // 4 - light
    new Color('#5c6bc0'), // 5 - main
    new Color('#7986cb'), // 6 - lighter
    new Color('#9fa8da'), // 7 - pale
    new Color('#c5cae9'), // 8 - palest
    new Color('#e8eaf6') // 9 - white
    );
    /**
     * Зеленая палитра MUI (темная тема)
     */
    static MuiGreen = new ColorVariants(new Color('#0a1a0c'), // 0 - black
    new Color('#132716'), // 1 - darkest
    new Color('#1c3420'), // 2 - darker
    new Color('#25412a'), // 3 - dark
    new Color('#375c3d'), // 4 - light
    new Color('#66bb6a'), // 5 - main
    new Color('#81c784'), // 6 - lighter
    new Color('#a5d6a7'), // 7 - pale
    new Color('#c8e6c9'), // 8 - palest
    new Color('#e8f5e9') // 9 - white
    );
    /**
     * Бирюзовая палитра MUI (темная тема)
     */
    static MuiTeal = new ColorVariants(new Color('#0a1a18'), // 0 - black
    new Color('#0f2b28'), // 1 - darkest
    new Color('#143c38'), // 2 - darker
    new Color('#194d48'), // 3 - dark
    new Color('#23746b'), // 4 - light
    new Color('#26a69a'), // 5 - main
    new Color('#4db6ac'), // 6 - lighter
    new Color('#80cbc4'), // 7 - pale
    new Color('#b2dfdb'), // 8 - palest
    new Color('#e0f2f1') // 9 - white
    );
    /**
     * Желтая палитра MUI (темная тема)
     */
    static MuiYellow = new ColorVariants(new Color('#2a220a'), // 0 - black
    new Color('#4a3d0f'), // 1 - darkest
    new Color('#6a5814'), // 2 - darker
    new Color('#8a7319'), // 3 - dark
    new Color('#d4b42b'), // 4 - light
    new Color('#ffeb3b'), // 5 - main
    new Color('#ffee58'), // 6 - lighter
    new Color('#fff176'), // 7 - pale
    new Color('#fff59d'), // 8 - palest
    new Color('#fffde7') // 9 - white
    );
    /**
     * Янтарная палитра MUI (темная тема)
     */
    static MuiAmber = new ColorVariants(new Color('#2a1e0a'), // 0 - black
    new Color('#4a350f'), // 1 - darkest
    new Color('#6a4c14'), // 2 - darker
    new Color('#8a6319'), // 3 - dark
    new Color('#d49e2b'), // 4 - light
    new Color('#ffc107'), // 5 - main
    new Color('#ffca28'), // 6 - lighter
    new Color('#ffd54f'), // 7 - pale
    new Color('#ffe082'), // 8 - palest
    new Color('#fff8e1') // 9 - white
    );
    /**
     * Красная палитра MUI (темная тема)
     */
    static MuiRed = new ColorVariants(new Color('#2a0a0a'), // 0 - black
    new Color('#4a1414'), // 1 - darkest
    new Color('#6a1e1e'), // 2 - darker
    new Color('#8b2323'), // 3 - dark
    new Color('#b52a2a'), // 4 - light
    new Color('#ef5350'), // 5 - main
    new Color('#e57373'), // 6 - lighter
    new Color('#ef9a9a'), // 7 - pale
    new Color('#ffcdd2'), // 8 - palest
    new Color('#ffebee') // 9 - white
    );
    /**
     * Коричневая палитра MUI (темная тема)
     */
    static MuiBrown = new ColorVariants(new Color('#1a0f0a'), // 0 - black
    new Color('#2e1d14'), // 1 - darkest
    new Color('#422b1e'), // 2 - darker
    new Color('#563928'), // 3 - dark
    new Color('#7e543c'), // 4 - light
    new Color('#a1887f'), // 5 - main
    new Color('#bcaaa4'), // 6 - lighter
    new Color('#d7ccc8'), // 7 - pale
    new Color('#efebe9'), // 8 - palest
    new Color('#f5f1ee') // 9 - white
    );
    /**
     * Серая палитра MUI (темная тема)
     */
    static MuiGray = new ColorVariants(new Color('#050505'), // 0 - black
    new Color('#1a1a1a'), // 1 - darkest
    new Color('#2f2f2f'), // 2 - darker
    new Color('#444444'), // 3 - dark
    new Color('#595959'), // 4 - light
    new Color('#9e9e9e'), // 5 - main
    new Color('#bdbdbd'), // 6 - lighter
    new Color('#e0e0e0'), // 7 - pale
    new Color('#f5f5f5'), // 8 - palest
    new Color('#ffffff') // 9 - white
    );
    /**
     * Серая палитра Mantine (темная тема)
     */
    static MantineGray = new ColorVariants(new Color('#212529'), // 0 - black
    new Color('#343a40'), // 1 - darkest
    new Color('#495057'), // 2 - darker
    new Color('#868e96'), // 3 - dark
    new Color('#adb5bd'), // 4 - light
    new Color('#ced4da'), // 5 - main
    new Color('#dee2e6'), // 6 - lighter
    new Color('#e9ecef'), // 7 - pale
    new Color('#f1f3f5'), // 8 - palest
    new Color('#f8f9fa') // 9 - white
    );
    /**
     * Темная палитра Mantine (темная тема)
     */
    static MantineDark = new ColorVariants(new Color('#141414'), // 0 - black
    new Color('#1f1f1f'), // 1 - darkest
    new Color('#242424'), // 2 - darker
    new Color('#2e2e2e'), // 3 - dark
    new Color('#3b3b3b'), // 4 - light
    new Color('#424242'), // 5 - main
    new Color('#696969'), // 6 - lighter
    new Color('#828282'), // 7 - pale
    new Color('#b8b8b8'), // 8 - palest
    new Color('#C9C9C9') // 9 - white
    );
}
//# sourceMappingURL=ColorVariantsConstants.js.map