import type { Meta, StoryObj } from "@storybook/react";
import SideBar from "../components/SideBar/SideBar";

const meta: Meta<typeof SideBar> = {
    title: "Example/SideBar",
    component: SideBar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

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