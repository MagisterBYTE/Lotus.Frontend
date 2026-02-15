/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { ArgTypesStory, TextStory } from '#storydata';
import { ColorDesignSystem } from '#designSystem/colors';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    centerContent: { control: 'inline-radio', options: ['horizontally', 'vertically', 'center', undefined], table: { category: 'Params' } },

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
    children: { table: { disable: true } },
    style: { table: { disable: true } }
  }
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoxDefault: Story = {
  name: 'Box Default',
  args: {
    children: <div style={{ width: 'max-content', border: 'solid 1px black' }}>Это контент</div>
  }
};

export const BoxAndBoxCenterSmall: Story = {
  name: 'Box Center Small',
  args: {
    children: TextStory.SmallText(),
    centerContent: 'center',
    p: 'md',
    bdStyle: 'solid',
  }
};

export const BoxAndBoxCenterSmallShadow: Story = {
  name: 'Box Center Small Shadow',
  args: {
    children: TextStory.SmallText(),
    centerContent: 'center',
    p: 'md',
    bdStyle: 'solid',
    bgShadow: 10
  }
};

export const BoxAndBoxCenterMiddle: Story = {
  name: 'Box Center Middle',
  args: {
    //style: {backgroundColor: 'rgba(139, 119, 103, 0.8)'},
    children: TextStory.MiddleText(),
    centerContent: 'center',
    p: 'md',
    bdStyle: 'solid'
  }
};

export const BoxBrown: Story = {
  name: 'Box Brown',
  args: {
    children: TextStory.MiddleText(),
    centerContent: 'vertically',
    p: 'md',
    bdStyle: 'solid',
    w: '30vw',
    h: '50vh',
    bgColor: ColorDesignSystem.LightDefault.colors.brown[4],
    bgShadow: 10,
    style: {
      overflowY: 'auto'
    }
  }
};
