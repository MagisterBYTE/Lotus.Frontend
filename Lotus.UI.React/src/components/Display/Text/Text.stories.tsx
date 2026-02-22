/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, OptionsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { TColorTokens } from 'lotus-core/modules/color';

const meta = {
  title: 'Display/Text',
  component: Text,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    children: { control: 'text', table: { category: 'Text Component' } },
    asBadge: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Text Component' } },
    isBlock: { control: 'boolean', table: { category: 'Text Component' } },
    disabled: { control: 'boolean', table: { category: 'Text Component' } },

    // Text
    ...ArgTypesStory.Text,

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border
  }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextDefault: Story = {
  name: 'Text Default',
  args: {
    p: 'xs',
    m: 'sm',
    children: 'Иконка Image'
  }
};

export const TextShadowMonospace: Story = {
  name: 'Text Shadow Monospace',
  args: {
    children: 'Иконка React',
    textEffect: 'shadow',
    fontAccent: 'monospace',
    textColor: 'brown',
    fontSize: 'lg',
    fontBold: true
  }
};

export const TextBorder: Story = {
  name: 'Text Border',
  args: {
    children: 'Иконка React',
    withBorder: true,
    bdStyle: 'solid',
    bdRadius: 'md',
    p: 'xxs',
    isBlock: false
  }
};

export const TextBadge: Story = {
  name: 'Text Badge',
  args: {
    children: 'Badge',
    asBadge: 'blue',
    p: 'xxs',
    withBorder: true,
    bdStyle: 'solid',
    bdRadius: 'md',
    bdColor: 'blue'
  }
};

export const TextSuper: Story = {
  args: {
    children: 'Иконка React',
    asBadge: 'green',
    disabled: false,
    fontBold: true,
    textEffect: 'shadow',
    p: 'xxs',
    withBorder: 1,
    bdStyle: 'double',
    bdWidth: 4,
    bdRadiusTopRight: 'md',
    bdRadiusBottomRight: 'md',
    fontAccent: 'accent',
    bdColor: 'red'
  },

  name: 'Text Super'
};
