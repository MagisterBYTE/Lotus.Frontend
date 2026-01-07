import { Box, VerticalStack } from '#components/Layout';
import { Divider } from '#components/Display';
import { SegmentedField, SelectField, SliderField, SwitchField, TextField } from '#components/Controls';
import
{
  TCssBackgroundColor,
  TCssBorderRadius,
  TCssBorderStyle,
  TCssBorderStyles,
  TShadowElevation,
  TShadowElevations,
  TSizeType,
  TSizeTypes
} from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { OptionsStory } from '#storydata';
import { TColorToken, TColorTokens } from 'lotus-core/modules/color';

interface ISamplePanelProps
{
  inlinePlace?: boolean;
  labelWidth?: number;
  isDisabled?: boolean;
  bdStyle?: TCssBorderStyle;
  bdRadius?: TCssBorderRadius;
  isHarmonious: boolean;
  backColor?: TCssBackgroundColor|TColorToken;
  size?: TSizeType;
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
    size: { control: 'inline-radio', options: [...TSizeTypes, undefined] },
    bdStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined] },
    bdRadius: { control: 'inline-radio', options: [...TSizeTypes, undefined] },
    backColor: { control: 'select', options: [undefined, ...TColorTokens] },
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
          bdRadius={args.bdRadius}
          bdStyle={args.bdStyle}
          bgShadow={args.shadowElevation}
          bgColor={args.backColor}
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
