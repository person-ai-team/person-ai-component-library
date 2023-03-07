import React, { useMemo } from "react";

type ButtonProps = {
	primary?: boolean;
	size?: "small" | "medium" | "large";
	label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getSizeClasses = (size: "small" | "medium" | "large"): string => {
	switch (size) {
		case "small": {
			return "px-4 py-2.5";
		}
		case "large": {
			return "px-6 py-3";
		}
		default: {
			return "px-5 py-2.5";
		}
	}
};

const getModeClasses = (isPrimary: boolean): string =>
	isPrimary
		? "text-white bg-blue-400 dark:bg-blue-700"
		: "text-slate-700 bg-red-600 border-slate-700 dark:text-white dark:border-white";

const BASE_BUTTON_CLASSES =
	"cursor-pointer rounded-full border-2 font-bold leading-none inline-block";

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
	primary = false,
	size = "medium",
	label,
	...props
}) => {
	const computedClasses = useMemo(() => {
		const modeClass = getModeClasses(primary);
		const sizeClass = getSizeClasses(size);

		return [modeClass, sizeClass].join(" ");
	}, [primary, size]);

	return (
		<button type="button" className={`${BASE_BUTTON_CLASSES} ${computedClasses}`} {...props}>
			{label}
		</button>
	);
};
