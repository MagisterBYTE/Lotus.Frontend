/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, IconsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockValue } from './BlockValue';
import { TSizeTypeValues } from '#types';
import { TColorTokens } from 'lotus-core/modules/color';

const meta = {
  title: 'Display/BlockValue',
  component: BlockValue,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Value
    size: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Value' } },
    label: { control: 'text', table: { category: 'Value' } },
    value: { control: 'text', table: { category: 'Value' } },
    accentColor: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Value' } },
    accentBackground: { control: 'boolean', table: { category: 'Value' } },
    asBadge: { control: 'boolean', table: { category: 'Value' } },
    monospaceValue: { control: 'boolean', table: { category: 'Value' } },
    isHoverable: { control: 'boolean', table: { category: 'Value' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Hide
    children: { table: { disable: true } },
    labelProps: { table: { disable: true } },
    valueProps: { table: { disable: true } }
  }
} satisfies Meta<typeof BlockValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlockValueDefault: Story = {
  name: 'BlockValue Default',
  args: {
    p: 'md',
    m: 'sm',
    label: 'Имя',
    value: 'Иванов Иван Иванович',
    accentColor: 'blue',
    asBadge: true,
    size: 'md',
    accentBackground: true
  }
};

export const BlockValueIcon: Story = {
  name: 'BlockValue Icon',
  args: {
    p: 'md',
    m: 'sm',
    label: 'Имя',
    value: 'Иванов Иван Иванович',
    accentColor: 'blue',
    asBadge: true,
    size: 'md',
    accentBackground: true,
    labelProps:
    {
      icon: IconsStory.CurveArray64
    }
  }
};
