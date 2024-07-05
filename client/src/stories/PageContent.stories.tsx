import { Meta, StoryObj } from '@storybook/react';
import { PageContent } from './components/page-content/PageContent.tsx';

const meta = {
  title: 'Page/Page Content',
  component: PageContent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: { control: 'object' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    children: <h1>Page Content</h1>,
  },
};
