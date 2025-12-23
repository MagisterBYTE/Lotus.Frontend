/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, IconsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockValue } from './BlockValue';
import { FcAddRow } from 'react-icons/fc';

const meta = {
  title: 'Display/BlockValue',
  component: BlockValue,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    children: { control: 'text', table: { category: 'Label' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border
  }
} satisfies Meta<typeof BlockValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlockValueDefault: Story = {
  name: 'BlockValue Default',
  args: {
    p: 'xs',
    m: 'sm',
    label: 'Имя',
    value: 'Иванов Иван Иванович'
  }
};
