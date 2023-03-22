import ResizableWidget from "../ResizableWidget";
import Image from "next/image";
import type { Size } from "../ResizableWidget";

interface ImageWidgetProps {
	initialSize: Size;
	width: number;
	height: number;
	src: string;
	alt: string;
}

export default function ImageWidget({ initialSize, src, alt, width, height }: ImageWidgetProps) {
	return (
		<ResizableWidget initialSize={initialSize}>
			<Image src={src} alt={alt} width={width} height={height} />
		</ResizableWidget>
	);
}
