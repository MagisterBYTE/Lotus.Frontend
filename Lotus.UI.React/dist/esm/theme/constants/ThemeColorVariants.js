import { Color, ColorVariants } from 'lotus-core/modules/color';
/**
 * Наборы типовых вариантов цвета
 */
export class ThemeColorVariants {
    static Primary = new ColorVariants(new Color('#e3f2fd'), // 0
    new Color('#bbdefb'), // 1
    new Color('#90caf9'), // 2
    new Color('#64b5f6'), // 3
    new Color('#42a5f5'), // 4
    new Color('#2196f3'), // 5 - основной
    new Color('#1e88e5'), // 6
    new Color('#1976d2'), // 7
    new Color('#1565c0'), // 8
    new Color('#0d47a1') // 9
    );
    // Secondary - фиолетовая палитра MUI
    static Secondary = new ColorVariants(new Color('#f3e5f5'), // 0
    new Color('#e1bee7'), // 1
    new Color('#ce93d8'), // 2
    new Color('#ba68c8'), // 3
    new Color('#ab47bc'), // 4
    new Color('#9c27b0'), // 5 - основной
    new Color('#8e24aa'), // 6
    new Color('#7b1fa2'), // 7
    new Color('#6a1b9a'), // 8
    new Color('#4a148c') // 9
    );
    // Error - красная палитра MUI
    static Error = new ColorVariants(new Color('#ffebee'), // 0
    new Color('#ffcdd2'), // 1
    new Color('#ef9a9a'), // 2
    new Color('#e57373'), // 3
    new Color('#ef5350'), // 4
    new Color('#f44336'), // 5 - основной
    new Color('#e53935'), // 6
    new Color('#d32f2f'), // 7
    new Color('#c62828'), // 8
    new Color('#b71c1c') // 9
    );
    // Warning - оранжевая палитра MUI
    static Warning = new ColorVariants(new Color('#fff3e0'), // 0
    new Color('#ffe0b2'), // 1
    new Color('#ffcc80'), // 2
    new Color('#ffb74d'), // 3
    new Color('#ffa726'), // 4
    new Color('#ff9800'), // 5 - основной
    new Color('#fb8c00'), // 6
    new Color('#f57c00'), // 7
    new Color('#ef6c00'), // 8
    new Color('#e65100') // 9
    );
    // Info - голубая палитра MUI
    static Info = new ColorVariants(new Color('#e1f5fe'), // 0
    new Color('#b3e5fc'), // 1
    new Color('#81d4fa'), // 2
    new Color('#4fc3f7'), // 3
    new Color('#29b6f6'), // 4
    new Color('#03a8f49d'), // 5 - основной
    new Color('#039be5'), // 6
    new Color('#0288d1'), // 7
    new Color('#0277bd'), // 8
    new Color('#01579b') // 9
    );
    // Success - зеленая палитра MUI
    static Success = new ColorVariants(new Color('#e8f5e8'), // 0
    new Color('#c8e6c9'), // 1
    new Color('#a5d6a7'), // 2
    new Color('#81c784'), // 3
    new Color('#66bb6a'), // 4
    new Color('#4caf50'), // 5 - основной
    new Color('#43a047'), // 6
    new Color('#388e3c'), // 7
    new Color('#2e7d32'), // 8
    new Color('#1b5e20') // 9
    );
    static AntPrimary = new ColorVariants(new Color(230, 247, 255), // white
    new Color(186, 234, 255), // palest
    new Color(145, 213, 255), // pale
    new Color(105, 192, 255), // lighter
    new Color(24, 144, 255), // light
    new Color(64, 169, 255), // main
    new Color(9, 109, 217), // dark
    new Color(0, 80, 179), // darker
    new Color(0, 58, 140), // darkest
    new Color(0, 39, 102) // black
    );
    static MuiBlue = new ColorVariants(new Color('#e3f2fd'), // white
    new Color('#bbdefb'), // palest
    new Color('#90caf9'), // pale
    new Color('#64b5f6'), // lighter
    new Color('#42a5f5'), // light
    new Color('#2196f3'), // main
    new Color('#1e88e5'), // dark
    new Color('#1976d2'), // darker
    new Color('#1565c0'), // darkest
    new Color('#0d47a1') // black
    );
    static MuiBlueGrey = new ColorVariants(new Color('#eceff1'), // white
    new Color('#cfd8dc'), // palest
    new Color('#b0bec5'), // pale
    new Color('#90a4ae'), // lighter
    new Color('#78909c'), // light
    new Color('#607d8b'), // main
    new Color('#546e7a'), // dark
    new Color('#455a64'), // darker
    new Color('#37474f'), // darkest
    new Color('#263238') // black
    );
    static MuiIndigo = new ColorVariants(new Color('#e8eaf6'), // white
    new Color('#c5cae9'), // palest
    new Color('#9fa8da'), // pale
    new Color('#7986cb'), // lighter
    new Color('#5c6bc0'), // light
    new Color('#3f51b5'), // main
    new Color('#3949ab'), // dark
    new Color('#303f9f'), // darker
    new Color('#283593'), // darkest
    new Color('#1a237e') // black
    );
    static MuiGreen = new ColorVariants(new Color('#e8f5e9'), // white
    new Color('#c8e6c9'), // palest
    new Color('#a5d6a7'), // pale
    new Color('#81c784'), // lighter
    new Color('#66bb6a'), // light
    new Color('#4caf50'), // main
    new Color('#43a047'), // dark
    new Color('#388e3c'), // darker
    new Color('#2e7d32'), // darkest
    new Color('#1b5e20') // black
    );
    static MuiTeal = new ColorVariants(new Color('#e0f2f1'), // white
    new Color('#b2dfdb'), // palest
    new Color('#80cbc4'), // pale
    new Color('#4db6ac'), // lighter
    new Color('#26a69a'), // light
    new Color('#009688'), // main
    new Color('#00897b'), // dark
    new Color('#00796b'), // darker
    new Color('#00695c'), // darkest
    new Color('#004d40') // black
    );
    static MuiYellow = new ColorVariants(new Color('#fffde7'), // white
    new Color('#fff9c4'), // palest
    new Color('#fff59d'), // pale
    new Color('#fff176'), // lighter
    new Color('#ffee58'), // light
    new Color('#ffeb3b'), // main
    new Color('#fdd835'), // dark
    new Color('#fbc02d'), // darker
    new Color('#f9a825'), // darkest
    new Color('#f57f17') // black
    );
    static MuiAmber = new ColorVariants(new Color('#fff8e1'), // white
    new Color('#ffecb3'), // palest
    new Color('#ffe082'), // pale
    new Color('#ffd54f'), // lighter
    new Color('#ffca28'), // light
    new Color('#ffc107'), // main
    new Color('#ffb300'), // dark
    new Color('#ffa000'), // darker
    new Color('#ff8f00'), // darkest
    new Color('#ff6f00') // black
    );
    static MuiRed = new ColorVariants(new Color('#ffebee'), // white
    new Color('#ffcdd2'), // palest
    new Color('#ef9a9a'), // pale
    new Color('#e57373'), // lighter
    new Color('#ef5350'), // light
    new Color('#f44336'), // main
    new Color('#e53935'), // dark
    new Color('#d32f2f'), // darker
    new Color('#c62828'), // darkest
    new Color('#b71c1c') // black
    );
    static MuiBrown = new ColorVariants(new Color('#efebe9'), // white
    new Color('#d7ccc8'), // palest
    new Color('#bcaaa4'), // pale
    new Color('#a1887f'), // lighter
    new Color('#8d6e63'), // light
    new Color('#795548'), // main
    new Color('#6d4c41'), // dark
    new Color('#5d4037'), // darker
    new Color('#4e342e'), // darkest
    new Color('#3e2723') // black
    );
    static MuiGray = new ColorVariants(new Color('#fafafa'), // white
    new Color('#f5f5f5'), // palest
    new Color('#eeeeee'), // pale
    new Color('#e0e0e0'), // lighter
    new Color('#bdbdbd'), // light
    new Color('#9e9e9e'), // main
    new Color('#757575'), // dark
    new Color('#616161'), // darker
    new Color('#424242'), // darkest
    new Color('#212121') // black
    );
}
//# sourceMappingURL=ThemeColorVariants.js.map