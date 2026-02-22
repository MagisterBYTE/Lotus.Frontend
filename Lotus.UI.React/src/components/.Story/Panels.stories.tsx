import { Box, VerticalStack } from '#components/Layout';
import { Divider } from '#components/Display';
import { TextInput } from '#components/Inputs';
import { Segmented, Select } from '#components/Selects';
import { Slider, Switch } from '#components/Controls';
import
{
  TCssBackgroundColor,
  TCssBorderRadius,
  TCssBorderStyle,
  TCssBorderStyles,
  TShadowElevation,
  TShadowElevations,
  TSizeType,
  TSizeTypes,
  TSizeTypeValues
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
    size: { control: 'inline-radio', options: [...TSizeTypeValues, undefined] },
    bdStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined] },
    bdRadius: { control: 'inline-radio', options: [...TSizeTypeValues, undefined] },
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
          <TextInput
            inlinePlace={args.inlinePlace}
            label={'Фамилия'}
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            disabled={args.isDisabled}
            size={args.size}
            w="100%"
          />

          <TextInput
            inlinePlace={args.inlinePlace}
            label={'Имя'}
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            disabled={args.isDisabled}
            size={args.size}
            w="100%"
          />

          <Select
            inlinePlace={args.inlinePlace}
            label="Раса"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            items={OptionsStory.TextAndIconReact}
            size={args.size}
            selectProps={{ disabled: args.isDisabled }}
            w="100%"
          />

          <Segmented
            inlinePlace={args.inlinePlace}
            label="Раса"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            items={OptionsStory.TextAndIconReact}
            size={args.size}
            segmentedProps={{ disabled: args.isDisabled }}
            w="100%"
          />

          <Divider ml={'md'} lineStyle='dotted' mr={'md'} nml nmr/>

          <Slider
            mt={'xs'}
            mb={'xs'}
            inlinePlace={args.inlinePlace}
            label="Масштаб"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            size={args.size}
            disabled={args.isDisabled}
            w="100%"
          />

          <Switch
            inlinePlace={args.inlinePlace}
            label="Ускорение"
            labelProps={{ w: `${args.labelWidth ?? 40}%` }}
            size={args.size}
            switchProps={{ labelPosition: 'left' }}
            disabled={args.isDisabled}
            w="100%"
          />
        </VerticalStack>
      </Box>
    );
  }
};
