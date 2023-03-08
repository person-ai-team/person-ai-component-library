import React, { useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";

const ButtonVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;

type ButtonProps = {
	isLoading?: boolean;
	isDarkBg?: boolean;
	variant?: typeof ButtonVariant[number];
	size?: "extraSmall" | "small" | "medium" | "large";
	label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getVariantClasses = (variant: typeof ButtonVariant[number]): string => {
	switch (variant) {
		case "primary": {
			return "text-white bg-gray-600 hover:bg-gray-700 border-transparent";
		}
		case "outline" : {
			return "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400";
		}
		case "ghost": {
			return "bg-slate-100 hover:bg-slate-200 text-gray-700";
		}
		case "light": {
			return "bg-white hover:bg-gray-100 text-gray-700";
		}
		case "dark": {
			return "bg-gray-800 hover:bg-gray-700 text-white";
		}
		default: {
			return "bg-blue-500 hover:bg-blue-600 text-white";
		}
	}
};

const getSizeClasses = (size: "extraSmall" | "small" | "medium" | "large"): string => {
	switch (size) {
		case "extraSmall": {
			return "px-2.5 py-1.5 text-xs";
		}
		case "small": {
			return "px-3 py-2 text-sm";
		}
		case "large": {
			return "px-6 py-3 text-base";
		}
		default: {
			return "px-4 py-2 text-sm";
		}
	}
};

const getDarkBgClasses = (isDarkBg: boolean, variant: typeof ButtonVariant[number] ): string | undefined => {
	if (isDarkBg && variant === "outline" ) {
		return "text-white hover:text-black";
	}
};

const getLoadingClasses = (isLoading: boolean): string | undefined => {
	if (isLoading) {
		return "relative disabled:cursor-wait";
	}
};

const BASE_BUTTON_CLASSES =
	"cursor-pointer rounded-lg border font-medium inline-flex items-center justify-center";

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
	size = "medium",
	label,
	isLoading = false,
	disabled: buttonDisabled = false,
	variant = "primary",
	isDarkBg = false,
	...props
}) => {
	const disabled = isLoading || buttonDisabled;
	const computedClasses = useMemo(() => {
		const sizeClass = getSizeClasses(size);
		const variantClass = getVariantClasses(variant as typeof ButtonVariant[number]);
		const darkBgClass = getDarkBgClasses(isDarkBg as boolean, variant as typeof ButtonVariant[number]);
		const loadingClass = getLoadingClasses(isLoading as boolean);

		return [variantClass, sizeClass, darkBgClass, loadingClass].join(" ");
	}, [size, variant, isDarkBg, isLoading]);

	return (
		<button disabled={disabled} type="button" className={`${BASE_BUTTON_CLASSES} ${computedClasses}`} {...props}>
			{isLoading && (
				<span className="">
					<ImSpinner2 className="animate-spin" />
				</span>
			)}
			{
				!isLoading && label
			}
		</button>
	);
};
