import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './components/loaders/Loaders.tsx';

const meta: Meta = {
  title: 'loaders/Spinner',
  component: Spinner,
  argTypes: {
    color: { control: 'color' },
    duration: { control: 'number' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SpinnerLoader: Story = {
  args: {
    color: 'blue',
    duration: 0.5,
  },
};
