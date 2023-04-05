import type { Meta, StoryObj } from "@storybook/react";

import CreateEvent from "../components/Calendar/CreateEventService";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction

const meta: Meta<typeof CreateEvent> = {
    title: "Example/CreateEvent",
    component: CreateEvent,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreateEvent>;

export const Primary: Story = {
    args: {
    }
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args

