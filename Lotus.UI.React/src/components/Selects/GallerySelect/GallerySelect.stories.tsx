import { ArgTypesStory, IPerson, PersonRender, Persons } from '#storydata';
import type { Meta, StoryObj } from '@storybook/react';
import { GallerySelect } from './GallerySelect';

const meta = {
  title: 'Selects/GallerySelect',
  component: GallerySelect<IPerson>,
  tags: ['autodocs'],
  args: {},

  argTypes: 
  {
    // GallerySelect
    columns: { control: 'number', table: { category: 'Gallery' } },
    placeholder: { control: 'text', table: { category: 'Gallery' } },
    hasFilter: { control: 'boolean', table: { category: 'Gallery' } },
    selectRenderComponent: { control: 'boolean', table: { category: 'Gallery' } },

    // Label
    label: { control: 'text', table: { category: 'Label' } },
    description: { control: 'text', table: { category: 'Label' } },
    error: { control: 'text', table: { category: 'Label' } },
    required: { control: 'boolean', table: { category: 'Label' } },

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
    inputProps: { table: { disable: true } },
    containerProps: { table: { disable: true } },
    paginationProps: { table: { disable: true } },
    gridProps: { table: { disable: true } },
    children: { table: { disable: true } },
    items: { table: { disable: true } },
    selectedItem: { table: { disable: true } },
    onChangedItem: { table: { disable: true } },
    getDisabledItem: { table: { disable: true } },
    getLabelItem: { table: { disable: true } },
    getValueItem: { table: { disable: true } },
    imageDatabase: { table: { disable: true } },
    onFilterItem: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    renderValue: { table: { disable: true } }, 
  }
} satisfies Meta<typeof GallerySelect<IPerson>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GallerySelectDefault: Story = {
  name: 'GallerySelect Default',
  args: {
    items: Persons,
    renderItem: PersonRender.renderPersonCard,
    renderValue: PersonRender.renderPersonValue,
    hasFilter: true,
    onFilterItem: (item: IPerson, filter: string) => { return item.name.includes(filter);}
  }
};
