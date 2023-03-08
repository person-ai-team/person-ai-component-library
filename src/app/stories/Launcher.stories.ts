import type { Meta, StoryObj } from "@storybook/react";

import Launcher from "../components/Launcher/Launcher";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Launcher> = {
	title: "Example/Launcher",
	component: Launcher,
	tags: ["autodocs"],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof Launcher>;

export const Search: Story = {};
