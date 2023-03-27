/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			xs: "500px",
			xxs: "300px",
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
