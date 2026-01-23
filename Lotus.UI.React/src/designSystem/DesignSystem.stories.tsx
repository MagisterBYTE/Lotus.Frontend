import { TCssBorderRadius, TShadowElevation, TSizeType, TSizeTypes } from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorCssHelper, ColorTokenHelper, TColorPalette, TColorPalettes, TColorSemantic, TColorSemantics, TColorToken, TColorVariantName } from 'lotus-core/modules/color';
import { CSSProperties } from 'react';

function createStyle(colorTheme: TColorPalette | TColorSemantic, colorVariant: TColorVariantName): CSSProperties
{
  const colorToken = ColorTokenHelper.create(colorTheme, colorVariant);
  const style: CSSProperties =
  {
    backgroundColor: ColorCssHelper.getColorCss(colorToken),
    color:ColorCssHelper.getColorContrastCss(colorToken),
    margin: 5,
    padding: 5,
    minWidth: 100,
    border: '1px solid',
    borderRadius: '4px',
    fontSize: '10px',
    borderColor:ColorCssHelper.getColorContrastCss(colorToken),
  }

  return style;
}

const DivColorsColumn = (colorTheme: TColorPalette | TColorSemantic, isHarmonious?: boolean) =>
{
  return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 5, backgroundColor: 'lightcoral' }}>
    <div style={createStyle(colorTheme, 'black')}>{colorTheme} - black <br></br> </div>
    <div style={createStyle(colorTheme, 'darkest')}>{colorTheme} - darkest <br></br> </div>
    <div style={createStyle(colorTheme, 'darker')}>{colorTheme} - darker <br></br> </div>
    <div style={createStyle(colorTheme, 'dark')}>{colorTheme} - dark <br></br> </div>
    <div style={createStyle(colorTheme, 'main')}>{colorTheme} - main <br></br> </div>
    <div style={createStyle(colorTheme, 'light')}>{colorTheme} - light <br></br> </div>
    <div style={createStyle(colorTheme, 'lighter')}>{colorTheme} - lighter <br></br> </div>
    <div style={createStyle(colorTheme, 'pale')}>{colorTheme} - pale <br></br> </div>
    <div style={createStyle(colorTheme, 'palest')}>{colorTheme} - palest <br></br> </div>
    <div style={createStyle(colorTheme, 'white')}>{colorTheme} - white <br></br></div>
  </div>
}

interface IDivColorsProps
{
  isDisabled?: boolean;
  borderRadius?: TCssBorderRadius;
  isHarmonious: boolean;
  backColor?: TColorToken;
  textColor?: TColorToken;
  size?: TSizeType;
  shadowElevation?: TShadowElevation;
}

const DivColors = (props: IDivColorsProps) =>
{
  const data = [...TColorSemantics, ...TColorPalettes]
  return <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
      data.map(x =>
      {
        return DivColorsColumn(x, props.isHarmonious)
      }
      )
    }
  </div>
}

const meta = {
  title: 'Theme/Colors',
  component: DivColors,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: {},

  argTypes:
  {
    isDisabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: [...TSizeTypes, undefined] },
    shadowElevation: { control: 'number' }
  }

} satisfies Meta<typeof DivColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorsContrast: Story = {
  args: {
    isHarmonious: false
  }
};

export const ColorsHarmonious: Story = {
  args: {
    isHarmonious: true
  }
};
