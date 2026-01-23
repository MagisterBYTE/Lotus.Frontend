import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaField } from './TextAreaField';
import { IconShieldBolt } from '@tabler/icons-react';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Controls/TextAreaField',
  component: TextAreaField,
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
    textAreaProps: { table: { disable: true } },
    children: { table: { disable: true } }
  }
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaFieldEmpty: Story = {
  name: 'TextAreaField Empty',
  args: {
  }
};

export const TextAreaFieldDefault: Story = {
  name: 'TextAreaField Default',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка'
  }
};

export const TextAreaFieldInline: Story = {
  name: 'TextAreaField Inline',
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    labelProps: {
      w: '20%'
    },
    textAreaProps: {
      rightSection: <IconShieldBolt color="red" size={'2.25rem'} />
    }
  }
};

export const TextAreaFieldBorder: Story = {
  args: {
    label: 'Пример',
    required: true,
    description: 'Описание',
    error: 'Ошибка',
    inlinePlace: true,
    size: 'md',
    withBorder: true,
    p: 'md',
    bdRadius: 'xs',
    bdShadow: 7
  },

  name: 'TextAreaField Border'
};
