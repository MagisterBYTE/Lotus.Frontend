/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, IconsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { FcAddRow } from 'react-icons/fc';
import { TColorTokens } from 'lotus-core/modules/color';

const meta = {
  title: 'Display/Label',
  component: Label,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Label
    children: { control: 'text', table: { category: 'Label' } },
    asBadge: { control: 'select', options: [undefined, ...TColorTokens], table: { category: 'Label' } },
    isBlock: { control: 'boolean', table: { category: 'Label' } },

    // Label
    ...ArgTypesStory.Text,
    ...ArgTypesStory.Icon,

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelDefault: Story = {
  name: 'Label Default',
  args: {
    p: 'xs',
    m: 'sm',
    children: 'Надпись'
  }
};

export const LabelShadow: Story = {
  args: {
    p: 'xs',
    m: 'sm',
    children: 'Надпись',
    fontSize: 'md',
    fontBold: true,
    fontAccent: 'accent',
    textEffect: 'shadow'
  },

  name: 'Label Shadow'
};

export const LabelBorder: Story = {
  name: 'Label Border',
  args: {
    m: 'xs',
    children: 'Надпись',
    withBorder: true,
    p: 'xxs',
    bdStyle: 'solid',
    bdRadius: 'sm',
    bdRadiusTopLeft: 'sm',
    bdRadiusTopRight: 'sm',
    bdShadow: 8
  }
};

export const LabelIconImage: Story = {
  name: 'Label Icon Image',
  args: {
    children: 'Иконка Image',
    icon: IconsStory.HydraulicAnalysis64,
    iconPlacement: 'left',
    w: 'max-content',
    iconSize: 'md',
    iconColor: 'amber',
    withBorder: true,
    p: 'xxs',
    fontSize: 'md',
    fontBold: true,
    bdStyle: 'double',
    bdRadius: 'xs',
    bdWidth: 4,
    bdShadow: 4
  }
};

export const LabelIconReact: Story = {
  name: 'Label Icon React',
  args: {
    children: 'Label Icon React',
    icon: <FcAddRow />,
    fontSize: 'md',
    iconSize: 'xl',
    iconPlacement: 'left',
    w: 'max-content'
  }
};

export const LabelBadge: Story = {
  name: 'Label Badge',
  args: {
    children: 'Badge',
    icon: <FcAddRow />,
    fontSize: 'md',
    iconSize: 'xl',
    iconPlacement: 'left',
    w: 'max-content',
    asBadge: 'amber',
    withBorder: true,
    bdColor: 'indigo',
    p: 'xxs',
    bdRadius: 'md'
  }
};
