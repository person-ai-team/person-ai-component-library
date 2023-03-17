import type { Meta, StoryObj } from "@storybook/react";
import Home from "../page"

const meta: Meta<typeof Home> = {
    title: "Example/Home",
    component: Home,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof Home>;

export const LoggedIn: Story = {
    args: {
    }
};

export const LoggedOut: Story = {};

