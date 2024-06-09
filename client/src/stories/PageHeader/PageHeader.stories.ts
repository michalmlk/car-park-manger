import { PageHeader } from './PageHeader';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    component: PageHeader,
    title: 'Page Header',
    parameters: {
        layout: 'fullScreen',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        onBack: { action: 'clicked' },
        customContent: { control: 'text' },
    },
    args: { onBack: fn() },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {
    args: {
        title: 'Example page header',
    },
};
