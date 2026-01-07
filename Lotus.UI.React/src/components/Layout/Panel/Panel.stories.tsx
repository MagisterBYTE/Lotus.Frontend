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
    bdStyle: 'double',
    bdWidth: 3,
    bdShadow: 4,

    headerProps: {
      children: 'Заголовок',
      p: 'xxs',
      fontSize: 'lg',
      fontBold: true,
      icon: IconsStory.HydraulicAnalysis64,
      iconPlacement: 'left'
    },

    h: '100%',
    bdColor: 'brown',
    bdRadius: 'xs',
    bgColor: 'greenPalest',
    bgShadow: 10,
    pl: 'xs',
    pt: 'xxl',
    w: '100%',
    bdRadiusTopLeft: 'xs',
    bdRadiusTopRight: 'xs'
  }
};

export const PanelAndPanelCenter: Story = {
  name: 'Panel Center',
  args: {
    style: {
      overflow: 'scroll'
    },

    children: (
      <Panel bdRadius bgColor="blueGreyLight" p={'md'}>
        {TextStory.MiddleText()}
      </Panel>
    ),

    centerContent: 'center',
    p: 'lg',
    bdStyle: 'solid',
    w: '50vw',
    h: '30vw',
    bgColor: 'blueGreyDark',
    bgShadow: 10,
    header: 'Большой текст',
    m: 'lg'
  }
};

export const PanelBrown: Story = {
  name: 'Panel Brown',
  args: {
    children: (
      <Panel bdRadius bgColor="blueGreyLight" p={'md'} w={'min-content'}>
        {TextStory.MiddleText()}
      </Panel>
    ),

    centerContent: 'vertically',
    p: 'md',
    bdStyle: 'solid',
    w: '30vw',
    h: 'min-content',
    bgColor: 'brownBlack',
    bgShadow: 10
  }
};
