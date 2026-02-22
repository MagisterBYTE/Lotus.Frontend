import { ArgTypesStory } from '#storydata';
import { TCssContentAligns, TSizeTypeValues } from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box/Box';
import { VerticalStack } from './VerticalStack';

const meta = {
  title: 'Layout/VerticalStack',
  component: VerticalStack,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    spacing: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Params' } },
    hAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    vAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    wrap: { control: 'inline-radio', options: [true, false, undefined], table: { category: 'Params' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    // Hide
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof VerticalStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    children: (
      <>
        <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент 1 </div>
        <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент 2 </div>
        <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент 3 </div>
      </>
    ),

    spacing: 'sm'
  }
};

export const Spacing: Story = {
  name: 'Spacing',
  args: {
    //style: {backgroundColor: 'rgba(139, 119, 103, 0.8)'},
    children: (
      <>
        <Box bdRadius bgShadow={7} p={'md'} w={'min-content'}>
          1 контент
        </Box>
        <Box bdRadius bdShadow={4} p={'md'} w={'min-content'}>
          2 контент
        </Box>
        <Box bdRadius bgShadow={15} p={'md'} w={'min-content'}>
          3 контент
        </Box>
      </>
    ),

    p: 'md',
    bdStyle: 'solid',
    w: 'max-content',
    h: 'max-content',
    bgColor: 'blueGrayDark',
    bgShadow: 10,
    spacing: 'sm'
  }
};
