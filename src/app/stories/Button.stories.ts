import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/Button/Button";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
	title: "Example/Button",
	component: Button,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
	args: {
		variant: "primary",
		label: "Button",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		label: "Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		label: "Button",
	},
};

export const Light: Story = {
	args: {
		variant: "light",
		label: "Button",
	},
};

export const Dark: Story = {
	args: {
		variant: "dark",
		label: "Button",
	},
};
