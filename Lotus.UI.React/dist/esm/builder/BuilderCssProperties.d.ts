import { TCssProperties } from '#types';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
export declare abstract class BuilderCssProperties {
    static fillContainer(style: TCssProperties, props: IGeneralContainerProperties, override: boolean): TCssProperties;
    static buildContainer(props: IGeneralContainerProperties): TCssProperties;
    static fillBackground(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties;
    static buildBackground(props: IGeneralBackgroundProperties): TCssProperties;
}
//# sourceMappingURL=BuilderCssProperties.d.ts.map