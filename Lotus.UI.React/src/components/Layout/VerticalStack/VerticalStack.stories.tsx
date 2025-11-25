import { ArgTypesStory } from '#storydata';
import { TCssContentAligns, TElementSpacings } from '#types';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../Box/Box';
import { VerticalStack } from './VerticalStack';

const meta = {
  title: 'Layout/VerticalStack',
  component: VerticalStack,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    spacing: { control: 'inline-radio', options: [...TElementSpacings, undefined], table: { category: 'Params' } },
    hAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },
    vAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Params' } },

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
    children: <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент</div>
  }
};

export const Spacing: Story = {
  name: 'Spacing',
  args: {
    //style: {backgroundColor: 'rgba(139, 119, 103, 0.8)'},
    children: (
      <>
        <Box borderRadius shadow={7} p={'md'} w={'min-content'}>
          1 контент
        </Box>
        <Box borderRadius borderShadow={4} p={'md'} w={'min-content'}>
          2 контент
        </Box>
        <Box borderRadius shadow={15} p={'md'} w={'min-content'}>
          3 контент
        </Box>
      </>
    ),

    p: 'md',
    borderStyle: 'solid',
    w: 'max-content',
    h: '100%',
    backColor: 'blueGreyDark',
    shadow: 10,
    spacing: 'sm'
  }
};
