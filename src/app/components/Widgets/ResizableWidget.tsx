import { useState } from "react";

export type Size = "small" | "medium" | "large";

const sizes: Record<Size, string> = {
	small: "w-32 h-32",
	medium: "w-64 h-64",
	large: "w-96 h-96",
};

interface ResizableWidgetProps {
	initialSize: Size;
	children: React.ReactNode;
}

export default function ResizableWidget({ initialSize, children }: ResizableWidgetProps) {
	const [size, setSize] = useState<Size>(initialSize);

	return (
		<div className={`border p-4 ${sizes[size]}`}>
			<div className="flex justify-between mb-2">
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
