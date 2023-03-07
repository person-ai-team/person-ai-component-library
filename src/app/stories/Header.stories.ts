import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/Header/Header";

const meta: Meta<typeof Header> = {
	title: "Example/Header",
	component: Header,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	tags: ["autodocs"],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
	args: {
		user: {
			name: "Jane Doe",
			email: "janedoe@gmail.com",
			imageUrl:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
};

export const LoggedOut: Story = {};
