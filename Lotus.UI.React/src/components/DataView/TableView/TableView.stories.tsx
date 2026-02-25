import { Meta, StoryObj } from '@storybook/react';
import { TableView } from './TableView';
import { TableViewPropsPreset } from './TableViewPropsPreset';
import { PersonInfoBase, PersonApi, IPerson, PersonValidator, ImageDatabase, PersonRender } from '#storydata';
import { TSizeTypeValues } from '#types';

const meta: Meta<typeof TableView> = {
  title: 'DataView/TableView',
  component: TableView,
  parameters: {
    layout: 'padded'
  },

  tags: ['autodocs'],

  argTypes: {

    size: { control: 'inline-radio', options: [...TSizeTypeValues, undefined], table: { category: 'Size' } },

    objectInfo: { table: { disable: true } },
    validator: { table: { disable: true } },
    onAddItem: { table: { disable: true } },
    onDeleteItem: { table: { disable: true } },
    onGetItems: { table: { disable: true } },
    onUpdateItem: { table: { disable: true } },
    onDuplicateItem: { table: { disable: true } },
    onTransformFilterRequest: { table: { disable: true } },
    displayColumnDefOptions: { table: { disable: true } },
    initialState: { table: { disable: true } },
    mantinePaperProps: { table: { disable: true } },
  }
} satisfies Meta<typeof TableView>;

export default meta;

// 2. Типизируем Story для конкретного случая (например, IPerson)
type Story = StoryObj<typeof TableView<IPerson>>;

export const DefaultCrud: Story = {
  args: {
    objectInfo: PersonInfoBase.Instance,
    validator: PersonValidator.Instance,
    imageDatabase: ImageDatabase,
    onGetItems: PersonApi.getPersonsAsync,
    onAddItem: PersonApi.addPersonsAsync,
    onCreateItem: PersonApi.createPersonsAsync,
    onUpdateItem: PersonApi.updatePersonAsync,
    onDeleteItem: PersonApi.deletePersonAsync,
    ...TableViewPropsPreset.getCrud(),
    editDisplayMode: 'row',
    renderCard: PersonRender.renderPersonCard
  }
};

