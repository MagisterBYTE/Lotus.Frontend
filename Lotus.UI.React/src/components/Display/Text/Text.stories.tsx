/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Display/Text',
  component: Text,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    children: { control: 'text', table: { category: 'Text' } },

    // Text
    ...ArgTypesStory.Text,

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,
  }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextDefault: Story = {
  name: 'Text Default',
  args: {
    p: 'xs',
    m: 'sm',
    children: 'Иконка Image',
  }
};

export const TextLabel: Story = {
  name: 'Text Label',
  args: {
    children: 'Иконка React',
  }
};

export const TextStyle: Story = {
  name: 'Text Style',
  args: {
    children: 'Иконка React'
  }
};
