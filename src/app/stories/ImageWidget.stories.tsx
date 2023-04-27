import type { Meta, StoryObj } from "@storybook/react";
import ImageWidget from "../components/Widgets/ImageWidget/ImageWidget";

const meta: Meta<typeof ImageWidget> = {
	title: "Example/ImageWidget",
	component: ImageWidget,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof ImageWidget>;

export const Small: Story = {
	args: {
		initialSize: "sm",
		src: "https://picsum.photos/200",
		width: 500,
		height: 500,
		alt: "Random image",
	},
};
