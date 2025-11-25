import { Meta, StoryObj } from '@storybook/react';
import { TableView } from './TableView';
import { PersonInfoBase, PersonApi } from '#storydata';


const meta = {
  title: 'DataView/TableView',
  component: TableView,
  parameters: {
    layout: 'padded'
  },

  tags: ['autodocs'],

  argTypes: {
  }
} satisfies Meta<typeof TableView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    objectInfo: PersonInfoBase.Instance,
    enableColumnResizing: true,
    enableEditing:true,
    enableColumnFilterModes: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    onGetItems: PersonApi.getPersonsAsync
  }
};

