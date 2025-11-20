/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgTypesStory, IconsStory } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { FcAddRow } from 'react-icons/fc';

const meta = {
  title: 'Display/Label',
  component: Label,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    children: { control: 'text', table: { category: 'Label' } },

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
    fontAccent: true,
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
    borderStyle: 'solid',
    borderRadius: 'sm',
    borderRadiusTopLeft: 'sm',
    borderRadiusTopRight: 'sm',
    borderShadow: 8
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
    borderStyle: 'double',
    borderRadius: 'xs',
    borderWidth: 4,
    borderShadow: 4
  }
};

export const LabelIconReact: Story = {
  name: 'Label Icon React',
  args: {
    children: 'sdsdsdssd',
    icon: <FcAddRow />,
    fontSize: 'md',
    iconSize: 'xl',
    iconPlacement: 'left',
    w: 'max-content'
  }
};
