import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';
import { ArgTypesStory, IconsStory, TextStory } from '#storydata';
import { TElementSizes } from '#types';

const meta = {
  title: 'Layout/Panel',
  component: Panel,
  tags: ['autodocs'],
  args: {},

  argTypes: {
    // Params
    centerContent: { control: 'inline-radio', options: ['horizontally', 'vertically', 'center', undefined], table: { category: 'Params' } },
    size: { control: 'inline-radio', options: [...TElementSizes, undefined], table: { category: 'Params' } },
    header: { control: 'text', table: { category: 'Params' } },

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
    style: {
      overflowX: 'clip'
    },

    children: TextStory.SmallText(),
    m: 'sm',
    borderStyle: 'double',
    borderWidth: 3,
    borderShadow: 4,

    headerProps: {
      children: 'Заголовок',
      p: 'xxs',
      fontSize: 'lg',
      fontBold: true,
      icon: IconsStory.HydraulicAnalysis64,
      iconPlacement: 'left'
    },

    h: '100%',
    borderColor: 'brown',
    borderRadius: 'xs',
    backColor: 'greenPalest',
    shadow: 10,
    pl: 'xs',
    pt: 'xxl',
    w: '100%',
    borderRadiusTopLeft: 'xs',
    borderRadiusTopRight: 'xs'
  }
};

export const PanelAndPanelCenter: Story = {
  name: 'Panel Center',
  args: {
    style: {
      overflow: 'scroll'
    },

    children: (
      <Panel borderRadius backColor="blueGreyLight" p={'md'}>
        {TextStory.MiddleText()}
      </Panel>
    ),

    centerContent: 'center',
    p: 'lg',
    borderStyle: 'solid',
    w: '50vw',
    h: '30vw',
    backColor: 'blueGreyDark',
    shadow: 10,
    header: 'Большой текст',
    m: 'lg'
  }
};

export const PanelBrown: Story = {
  name: 'Panel Brown',
  args: {
    children: (
      <Panel borderRadius backColor="blueGreyLight" p={'md'} w={'min-content'}>
        {TextStory.MiddleText()}
      </Panel>
    ),

    centerContent: 'vertically',
    p: 'md',
    borderStyle: 'solid',
    w: '30vw',
    h: 'min-content',
    backColor: 'brownBlack',
    shadow: 10
  }
};
