import { Box, VerticalStack } from '#components/Layout';
import { Divider } from '#components/Display';
import { SegmentedField, SelectField, SliderField, SwitchField, TextField } from '#components/Controls';
import { TThemeColor, TThemeColors } from '#theme';
import
{
  TCssBorderRadius,
  TCssBorderStyle,
  TCssBorderStyles,
  TElementRadiuses,
  TElementSize,
  TElementSizes,
  TShadowElevation,
  TShadowElevations
} from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { OptionsStory } from '#storydata';
interface ISamplePanelProps
{
  inlinePlace?: boolean;
  labelWidth?: number;
  isDisabled?: boolean;
  borderStyle?: TCssBorderStyle;
  borderRadius?: TCssBorderRadius;
  isHarmonious: boolean;
  backColor?: TThemeColor;
  size?: TElementSize;
  shadowElevation?: TShadowElevation;
}

const SamplePanel = (props: ISamplePanelProps) =>
{
  return <></>;
};

const meta = {
  title: 'Sample/Panels',
  component: SamplePanel,
  tags: ['autodocs'],

  args: {},

  argTypes: {
    inlinePlace: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    labelWidth: { control: { type: 'number', min: 10, max: 70 } },
    size: { control: 'inline-radio', options: [...TElementSizes, undefined] },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined] },
    borderRadius: { control: 'inline-radio', options: [...TElementRadiuses, undefined] },
    backColor: { control: 'select', options: [undefined, ...TThemeColors] },
    shadowElevation: { control: 'select', options: [undefined, ...TShadowElevations] }
  }
} satisfies Meta<typeof SamplePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PanelPerson: Story = {
  args: {
    isHarmonious: true
  },
  render: (args) =>
  {
    return (
      <Box centerContent='center' w={'100%'} h={'100%'} p={'lg'} withBorder>
        <VerticalStack
          borderRadius={args.borderRadius}
          borderStyle={args.borderStyle}
          shadow={args.shadowElevation}
          backColor={args.backColor}
          w={'clamp(300px, 90%, 800px)'}
          p={'md'}
          spacing={'sm'}
        >
          <TextField
            inlinePlace={args.inlinePlace}
            label={'Фамилия'}
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            textInputProps={{ disabled: args.isDisabled }}
            size={args.size}
            w="100%"
          />

          <TextField
            inlinePlace={args.inlinePlace}
            label={'Имя'}
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            textInputProps={{ disabled: args.isDisabled }}
            size={args.size}
            w="100%"
          />

          <SelectField
            inlinePlace={args.inlinePlace}
            label="Раса"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            options={OptionsStory.TextAndIconReact}
            size={args.size}
            selectProps={{ disabled: args.isDisabled }}
            w="100%"
          />

          <SegmentedField
            inlinePlace={args.inlinePlace}
            label="Раса"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            options={OptionsStory.TextAndIconReact}
            size={args.size}
            segmentedProps={{ disabled: args.isDisabled }}
            w="100%"
          />

          <Divider ml={'md'} lineStyle='dotted' mr={'md'} nml nmr/>

          <SliderField
            mt={'xs'}
            mb={'xs'}
            inlinePlace={args.inlinePlace}
            label="Масштаб"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            size={args.size}
            sliderProps={{ disabled: args.isDisabled }}
            w="100%"
          />

          <SwitchField
            inlinePlace={args.inlinePlace}
            label="Ускорение"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            size={args.size}
            switchProps={{ disabled: args.isDisabled }}
            w="100%"
          />
        </VerticalStack>
      </Box>
    );
  }
};
