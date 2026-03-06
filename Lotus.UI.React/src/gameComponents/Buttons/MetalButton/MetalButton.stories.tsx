import type { Meta, StoryObj } from '@storybook/react';
import { MetalButton } from './MetalButton';
import { TButtonVariantValues } from '../types';

const meta = {
  title: 'Games/MetalButton',
  component: MetalButton,
  parameters: {
    layout: 'centered',
    controls:
    {
      sort: 'requiredFirst'
    }
  },

  tags: ['autodocs'],

  args: { },

  argTypes:
  {
      // Label
     children: { control: 'text', table: { category: 'Label' } },
     variant: { control: 'inline-radio', options: [...TButtonVariantValues, undefined], table: { category: 'Label' }},
  }
} satisfies Meta<typeof MetalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    children: 'Default'
  },
};