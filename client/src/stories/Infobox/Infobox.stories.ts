import { StoryObj, Meta } from '@storybook/react';
import { Infobox } from './Infobox.tsx';

const meta = {
    title: 'Example/Infobox',
    component: Infobox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        headerColor: { control: 'color' },
        description: { control: 'text' },
        descriptionColor: { control: 'color' },
        actionButtonLabel: { control: 'text' },
        onAction: { action: 'clicked' },
    },
} satisfies Meta<typeof Infobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        title: 'Example infobox title',
        description: 'Example infobox long long long long long description',
        headerColor: 'primary',
        actionButtonLabel: 'Action!',
        onAction: () => console.log('Action!'),
    },
};
