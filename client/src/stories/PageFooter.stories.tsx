import { Meta, StoryObj } from '@storybook/react';
import { PageFooter } from './components/page-footer/PageFooter.tsx';
import { Button } from './components/button/Button.tsx';

const meta = {
  title: 'Page/PageFooter',
  component: PageFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    leftArea: { control: 'object' },
    rightArea: { control: 'object' },
  },
} satisfies Meta<typeof PageFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Footer: Story = {
  args: {
    leftArea: <Button label="Back" />,
    rightArea: <Button primary label="Next" />,
  },
};
