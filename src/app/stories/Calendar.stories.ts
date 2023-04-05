import type { Meta, StoryObj } from "@storybook/react";

import Calendar  from "../../app/calendar/page";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction

const meta: Meta<typeof Calendar> = {
    title: "Example/Calendar",
    component: Calendar,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
    args: {
    }
};



// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
