import type { Meta, StoryObj } from '@storybook/react';
import { ImageEditor } from './ImageEditor';
import { TCssContentAligns, TOrientationValues, TSizeTypeValues } from '#types';
import { ArgTypesStory } from '#storydata';

const meta = {
  title: 'Editors/ImageEditor',
  component: ImageEditor,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: {},

  argTypes: {
    // Params
    size: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Params' } },
    orientation: { control: 'inline-radio', options: [...TOrientationValues, undefined], table: { category: 'Params' } },

    // Stack
    spacing: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Stack' } },
    hAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Stack' } },
    vAlign: { control: 'inline-radio', options: [...TCssContentAligns, undefined], table: { category: 'Stack' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    onSavePreview: { table: { disable: true } },
    sourceImage: { table: { disable: true } },
    crossOrigin: { table: { disable: true } }
  }
} satisfies Meta<typeof ImageEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    orientation: 'vertical',
    onSavePreview: () => {}
  }
};

export const HorizontalBorder: Story = {
  name: 'Horizontal Border',
  args: {
    orientation: 'horizontal',
    withBorder: 15,
    bdRadius: 'lg',
    onSavePreview: () => {}
  },
};
