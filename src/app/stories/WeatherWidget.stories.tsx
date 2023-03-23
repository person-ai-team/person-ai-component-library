import { Meta, StoryObj } from "@storybook/react";
import WeatherWidget from "../components/Widgets/Weather/WeatherWidget";
import type { Size } from "../components/Widgets/ResizableWidget";

const meta: Meta<typeof WeatherWidget> = {
	title: "Example/WeatherWidget",
	component: WeatherWidget,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof WeatherWidget>;

export const Small: Story = {
	args: {
		initialSize: "small",
		data: {
			location: "London",
			temperature: 25,
			description: "Sunny",
		},
	},
};

export const Medium: Story = {
	args: {
		initialSize: "medium",
		data: {
			location: "Seattle",
			temperature: 15,
			description: "Rainy",
		},
	},
};
