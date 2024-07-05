import { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './components/page-header/PageHeader.tsx';
import { DeleteOutlined, SettingsOutlined } from '@mui/icons-material';

const meta = {
  title: 'Page/Page Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  component: PageHeader,
  argTypes: {
    title: { control: 'text' },
    actions: { control: 'object', required: false },
    showActions: { control: 'boolean', required: false },
    showBackIcon: { control: 'boolean', required: false },
    onBack: { action: 'clicked' },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PageHeaderWithoutActions: Story = {
  args: {
    title: 'Page Header Without Actions',
  },
};

export const PageHeaderWithActions: Story = {
  args: {
    title: 'Page Header Without Actions',
    actions: [
      {
        icon: <DeleteOutlined />,
        action: () => console.log('delete'),
      },
      {
        icon: <SettingsOutlined />,
        action: () => console.log('Settings'),
      },
    ],
  },
};
