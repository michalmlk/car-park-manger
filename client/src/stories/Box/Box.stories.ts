import type {Meta, StoryObj} from "@storybook/react";
import {Box} from "./Box.tsx";
import React from "react";

const meta = {
    title: "Box",
    component: Box,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {control: 'object'}
    }
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BoxContainer: Story = {
    args: {
        children: React.createElement('p', null, 'test')
    }
}