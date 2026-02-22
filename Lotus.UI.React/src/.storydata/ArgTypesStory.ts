import
{
  IGeneralBackgroundProperties,
  IGeneralBorderProperties,
  IGeneralContainerProperties,
  IGeneralIconProperties,
  IGeneralMarginProperties,
  IGeneralPaddingProperties,
  IGeneralTextProperties
} from '#base';
import { TCssBorderStyles, TIconPlacements,TShadowElevations, TTextEffects, TSizeTypeValues, TTextEffectValues, TIconPlacementValues, TBackgroundAccentValues, TFontAccentValues } from '#types';
import { ArgTypes } from 'storybook/internal/types';
import { TColorTokens } from 'lotus-core/modules/color';
import { IBaseContainerControlProps } from '#components/Common';

export abstract class ArgTypesStory
{
  public static readonly Padding: Partial<ArgTypes<IGeneralPaddingProperties>> = {
    p: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    pl: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    pt: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    pr: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    pb: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } }
  };

  public static readonly Margin: Partial<ArgTypes<IGeneralMarginProperties>> = {
    m: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    ml: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    mt: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    mr: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } },
    mb: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Padding & Margin' } }
  };

  public static readonly Border: Partial<ArgTypes<IGeneralBorderProperties>> = {
    withBorder: { control: 'inline-radio', options: [undefined, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], table: { category: 'Border' } },
    bdColor: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Border' } },
    bdStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border' } },
    bdWidth: { control: 'number', table: { category: 'Border' } },
    bdRadius: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Border' } },
    bdRadiusTopLeft: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Border' } },
    bdRadiusTopRight: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Border' } },
    bdRadiusBottomLeft: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Border' } },
    bdRadiusBottomRight: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Border' } },
    bdShadow: { control: 'select', options: [undefined, ...TShadowElevations], table: { category: 'Border' } }
  };

  public static readonly Size: Partial<ArgTypes<IGeneralContainerProperties>> = {
    w: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '50%', '30%', '30vw', '50vw', '90vw', undefined], table: { category: 'Size' } },
    h: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '50%', '30%', '30vw', '50vw', '90vw', undefined], table: { category: 'Size' } },
    grow: { control: 'number', table: { category: 'Size' } },
    shrink: { control: 'number', table: { category: 'Size' } }
  };

  public static readonly Background: Partial<ArgTypes<IGeneralBackgroundProperties>> = {
    bgColor: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Background' } },
    bgAccent: { control: 'inline-radio', options: [...TBackgroundAccentValues, undefined], table: { category: 'Background' } },
    bgShadow: { control: 'select', options: [undefined, ...TShadowElevations], table: { category: 'Background' } }
  };

  public static readonly Text: Partial<ArgTypes<IGeneralTextProperties>> = {
    fontSize: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Text' } },
    fontBold: { control: 'boolean', table: { category: 'Text' } },
    fontAccent: { control: 'inline-radio', options: [...TFontAccentValues, undefined], table: { category: 'Text' } },
    textEffect: { control: 'inline-radio', options: [...TTextEffectValues, undefined], table: { category: 'Text' } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text' } },
    textLineSpacing: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Text' } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text' } },
    textColor: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Text' } }
  };

  public static readonly Icon: Partial<ArgTypes<IGeneralIconProperties>> = {
    icon: { table: { disable: true } },
    iconSize: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Icon' } },
    iconColor: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Icon' } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacementValues, undefined], table: { category: 'Icon' } },
    iconStyle: { table: { disable: true } },
    imageDatabase: { table: { disable: true } },
  };

  public static readonly BaseField: Partial<ArgTypes<IBaseContainerControlProps>> = {
    labelProps: { table: { disable: true } },
    descriptionProps: { table: { disable: true } },
    errorProps: { table: { disable: true } }
  };

  public static readonly BaseFieldSize: Partial<ArgTypes<IBaseContainerControlProps>> = {
    inlinePlace: { control: 'boolean', table: { category: 'Size' } },
    size: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Size' } },
    w: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '30vw', undefined], table: { category: 'Size' } },
    h: { control: 'inline-radio', options: ['min-content', 'max-content', '100%', '30vh', undefined], table: { category: 'Size' } },
    grow: { control: 'number', table: { category: 'Size' } },
    shrink: { control: 'number', table: { category: 'Size' } }
  };
}
