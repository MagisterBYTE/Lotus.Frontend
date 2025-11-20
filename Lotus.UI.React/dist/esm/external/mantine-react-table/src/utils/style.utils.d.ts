import { type MantineTheme } from '@mantine/core';
import { type MantineShade } from '../types';
export declare const parseCSSVarId: (id: string) => string;
export declare const getPrimaryShade: (theme: MantineTheme) => number;
export declare const getPrimaryColor: (theme: MantineTheme, shade?: MantineShade) => string;
export declare function dataVariable(name: string, value: boolean | number | string | undefined): {
    [x: string]: string;
} | null;
//# sourceMappingURL=style.utils.d.ts.map