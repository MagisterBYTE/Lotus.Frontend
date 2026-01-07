import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Preview } from '@storybook/react-vite';
import { DesignSystemProvider } from '../src/provider';
import { theme } from './theme';


const preview: Preview = {
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { context }) =>
    {
      // 👇 Make it configurable by reading from parameters
      const colorScheme = context.globals.backgrounds?.value;
      switch (context.globals.viewport)
      {
        case 'desktop':
          return (
            // Your page layout is probably a little more complex than this ;)
            <div className="page-layout" style={{maxHeight: '1080px', overflow: 'clip'}}>
              <MantineProvider theme={theme} forceColorScheme={colorScheme}>
                <DesignSystemProvider colorScheme={colorScheme}>
                  <Story />
                </DesignSystemProvider>
              </MantineProvider>
            </div>
          );
        case 'tablet':
          return (
            <div className="page-mobile-layout">
              <MantineProvider theme={theme} forceColorScheme={colorScheme}>
                <DesignSystemProvider colorScheme={colorScheme}>
                  <Story />
                </DesignSystemProvider>
              </MantineProvider>
            </div>
          );
        default:
          // In the default case, don't apply a layout
          return <div style={{height: '1080px', padding: '2rem', overflow: 'clip'}}>
           <MantineProvider theme={theme} forceColorScheme={colorScheme}>
            <DesignSystemProvider colorScheme={colorScheme}>
              <Story />
            </DesignSystemProvider>
          </MantineProvider>
          </div>
      }
    },
  ],
};

export default preview;