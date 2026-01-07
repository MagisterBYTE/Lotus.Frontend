import { BackgroundDesignSystem } from './background';
import { BorderDesignSystem } from './border';
import { ColorDesignSystem } from './colors';
import { FontDesignSystem } from './font';
import { FontSizes, GapSizes, LineSpacingSizes, MarginSizes, PaddingSizes, RadiusSizes } from './sizes';
import { TextDesignSystem } from './text';
/**
 *
 */
export class DesignSystemBuilder {
    // eslint-disable-next-line complexity
    static create(props, colorScheme) {
        const designSystem = {
            //
            // РАЗМЕРЫ
            //
            fontSizes: props?.fontSizes ?? FontSizes.Default,
            lineSpacingSizes: props?.lineSpacingSizes ?? LineSpacingSizes.Default,
            marginSizes: props?.marginSizes ?? MarginSizes.Default,
            paddingSizes: props?.paddingSizes ?? PaddingSizes.Default,
            gapSizes: props?.gapSizes ?? GapSizes.Default,
            radiusSizes: props?.radiusSizes ?? RadiusSizes.Default,
            //
            // ШРИФТ
            //
            font: props?.font ?? FontDesignSystem.Default,
            //
            // ГРАНИЦА
            //
            border: props?.border ?? (colorScheme == 'light' ? BorderDesignSystem.LightDefault : BorderDesignSystem.DarkDefault),
            //
            // ТЕКСТ
            //
            text: props?.text ?? (colorScheme == 'light' ? TextDesignSystem.LightDefault : TextDesignSystem.DarkDefault),
            //
            // ФОН
            //
            background: props?.background ?? (colorScheme == 'light' ? BackgroundDesignSystem.LightDefault : BackgroundDesignSystem.DarkDefault),
            //
            // ЦВЕТА
            //
            colors: props?.colors ?? ColorDesignSystem.Default
        };
        return designSystem;
    }
}
//# sourceMappingURL=DesignSystemBuilder.js.map