import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';
import { ArgTypesStory, IconsStory, TextStory } from '#storydata';
import { TSizeTypes } from '#types';

const meta = {
  title: 'Layout/Panel',
  component: Panel,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    centerContent: { control: 'inline-radio', options: ['horizontally', 'vertically', 'center', undefined], table: { category: 'Params' } },
    size: { control: 'inline-radio', options: [...TSizeTypes, undefined], table: { category: 'Params' } },
    header: { control: 'text', table: { category: 'Params' } },
    headerOffsetPercent: { control: { type: 'number', min: 0, max: 100 }, table: { category: 'Params' } },

    // Size
    ...ArgTypesStory.Size,

    // Padding & Margin
    ...ArgTypesStory.Padding,
    ...ArgTypesStory.Margin,

    // Border
    ...ArgTypesStory.Border,

    // Background
    ...ArgTypesStory.Background,

    // Hide
    headerProps: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } }
  }
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PanelDefault: Story = {
  name: 'Panel Default',
  args: {
    children: TextStory.SmallText(),
    headerProps: {
      children: 'Заголовок'
    }
  }
};

export const PanelBorder: Story = {
  name: 'Panel Border',
  args: {
    children: TextStory.SmallText(),

    headerProps: {
      children: 'Заголовок'
    },

    withBorder: 15,
    p: 'md',
    bdRadius: 'md'
  }
};

export const PanelGreen: Story = {
  name: 'Panel Green',
  args: {
    children: TextStory.SmallText(),
    headerProps: {
      children: 'Заголовок',
      fontSize: 'lg',
      fontBold: true,
      icon: IconsStory.HydraulicAnalysis64,
      iconPlacement: 'left',
      ml: 'md'
    },

    bdColor: 'brown',
    bdRadius: 'xs',
    bdStyle: 'double',
    bdWidth: 3,
    bdShadow: 4,
    bgColor: 'greenPalest',
    bgShadow: 10
  }
};

export const PanelAndPanelCenter: Story = {
  name: 'Panel Center',
  args: {
    children: (
      <Panel bdRadius bgColor="blueGrayLight" p={'md'}>
        {TextStory.MiddleText()}
      </Panel>
    ),
    style:
    {
      overflow: 'scroll'
    },
    p: 'lg',
    bdStyle: 'solid',
    w: '50vw',
    h: '30vw',
    bgColor: 'blueGrayDark',
    bgShadow: 10,
    header: 'Большой текст',
    m: 'lg'
  }
};
