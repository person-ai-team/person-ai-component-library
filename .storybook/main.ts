import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	// webpackFinal: async (webConfig) => {
	// 	webConfig.module.rules.push({
	// 		test: /\.css$/i,
	// 		use: [
	// 			{
	// 				loader: "postcss-loader",
	// 				options: { implementation: require.resolve("postcss") },
	// 			},
	// 		],
	// 		include: path.resolve(__dirname, "../"),
	// 	});
	// 	// Return the altered config
	// 	return webConfig;
	// },
};
export default config;
