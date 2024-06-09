import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from './PageContent.tsx';

const meta = {
    title: 'Page Content',
    component: PageContent,
    parameters: {
        layout: 'fullScreen',
    },
    tags: ['autodocs'],
    argTypes: {
        justifyContent: {
            control: 'select',
            options: ['space-between', 'space-around', 'flex-start', 'center', 'flex-end'],
        },
        alignItems: {
            control: 'select',
            options: ['space-between', 'space-around', 'flex-start', 'center', 'flex-end'],
        },
        flexDirection: { control: 'select', options: ['row', 'column', 'row-reverse'] },
        children: { control: 'text' },
    },
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlexColumnJustifyCenter: Story = {
    args: {
        flexDirection: 'column',
        justifyContent: 'center',
        children: 'Example page content/flex-column/justify-center',
    },
};

export const FlexRowJustifyStart: Story = {
    args: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        children: 'Example page content/flex-row/justify-start',
    },
};
