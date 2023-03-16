import type { Meta, StoryObj } from "@storybook/react";
import {PersonDialog} from "../components/Dialog/Dialog";

const meta: Meta<typeof PersonDialog> = {
    title: "Example/PersonDialog",
    component: PersonDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof PersonDialog>;

export const LoggedIn: Story = {
    args: {
    }
};

export const LoggedOut: Story = {};