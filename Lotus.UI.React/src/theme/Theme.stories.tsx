import { createThemeColor, ThemeInstance, TThemeColorPalette } from '#theme';
import { TCssBorderRadius, TElementSize, TElementSizes, TShadowElevation } from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { TColorSemantic, TColorSemantics, TColorVariantName } from 'lotus-core/modules/color';
import { CSSProperties } from 'react';

function createStyle(colorTheme: TThemeColorPalette | TColorSemantic, colorVariant: TColorVariantName): CSSProperties
{
  const style: CSSProperties =
  {
    backgroundColor: ThemeInstance.getBackgroundColor(createThemeColor(colorTheme, colorVariant)).toCSSRgbValue(),
    margin: 10,
    padding: 5,
    minWidth: 100,
    border: '1px solid',
    borderRadius: '4px'
  }

  return style;
}

const DivColorsColumn = (colorTheme: TThemeColorPalette | TColorSemantic, isHarmonious?: boolean) =>
{
  return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10, backgroundColor: 'lightcoral' }}>
    <div style={createStyle(colorTheme, 'black')}>{colorTheme} - black <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'black')}</div>
    <div style={createStyle(colorTheme, 'darkest')}>{colorTheme} - darkest <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'darkest')}</div>
    <div style={createStyle(colorTheme, 'darker')}>{colorTheme} - darker <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'darker')}</div>
    <div style={createStyle(colorTheme, 'dark')}>{colorTheme} - dark <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'dark')}</div>
    <div style={createStyle(colorTheme, 'main')}>{colorTheme} - main <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'main')}</div>
    <div style={createStyle(colorTheme, 'light')}>{colorTheme} - light <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'light')}</div>
    <div style={createStyle(colorTheme, 'lighter')}>{colorTheme} - lighter <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'lighter')}</div>
    <div style={createStyle(colorTheme, 'pale')}>{colorTheme} - pale <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'pale')}</div>
    <div style={createStyle(colorTheme, 'palest')}>{colorTheme} - palest <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'palest')}</div>
    <div style={createStyle(colorTheme, 'white')}>{colorTheme} - white <br></br> {ThemeInstance.getColorInfoHSL(colorTheme, 'white')}</div>
  </div>
}

interface IDivColorsProps
{
  isDisabled?: boolean;
  borderRadius?: TCssBorderRadius;
  isHarmonious: boolean;
  backColor?: TThemeColorPalette | TColorSemantic;
  textColor?: TThemeColorPalette | TColorSemantic;
  size?: TElementSize;
  shadowElevation?: TShadowElevation;
}

const DivColors = (props: IDivColorsProps) =>
{
  return <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
      TColorSemantics.map(x =>
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
    size: { control: 'inline-radio', options: [...TElementSizes, undefined] },
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
