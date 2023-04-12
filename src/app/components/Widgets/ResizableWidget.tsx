import { useState } from "react";

export type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
	sm: "w-48 h-48",
	md: "w-96 h-48",
	lg: "w-96 h-96",
};

// Describe the functions below
export interface ResizableWidgetProps {
	initialSize: Size;
	children: React.ReactNode;
}

export default function ResizableWidget({ initialSize, children }: ResizableWidgetProps) {
	const [size, setSize] = useState<Size>(initialSize);

	return (
		<div className={`relative border ml-4 mt-4 p-4 ${sizes[size]}`}>
			<div className="absolute inset-x-0 bottom-0 gap-2 flex justify-between -mb-10">
				{Object.keys(sizes).map((key) => (
					<button
						key={key}
						className={`text-xs px-2 py-1 rounded ${
							size === key ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
						onClick={() => setSize(key as Size)}>
						{key}
					</button>
				))}
			</div>
			{children}
		</div>
	);
}
