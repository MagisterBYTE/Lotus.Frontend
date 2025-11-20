/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import React from 'react';
import { IconShieldBolt } from '@tabler/icons-react';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Controls/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Label
    required: { control: 'boolean', table: { category: 'Label' } },
    label: { control: 'text', table: { category: 'Label' } },
    description: { control: 'text', table: { category: 'Label' } },
    error: { control: 'text', table: { category: 'Label' } },

    // Size
    ...ArgTypesStory.BaseFieldSize,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    // Hide
    ...ArgTypesStory.BaseField,
    textInputProps: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFieldDefault: Story = {
  name: 'TextField Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка'
  }
};

export const TextFieldInline: Story = {
  name: 'TextField Inline',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    labelProps: {
      w: '20%'
    },
    textInputProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const TextFieldBorder: Story = {
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    size: 'md',
    withBorder: true,
    p: 'md',
    borderRadius: 'xs',
    borderShadow: 7
  },

  name: 'TextField Border'
};
