import ResizableWidget from "../ResizableWidget";
import type { Size } from "../ResizableWidget";

interface WeatherData {
	location: string;
	temperature: number;
	description: string;
}

interface WeatherWidgetProps {
	initialSize: Size;
	data: WeatherData;
}

export default function WeatherWidget({ initialSize, data }: WeatherWidgetProps) {
	return (
		<ResizableWidget initialSize={initialSize}>
			<div>
				<h2>{data.location}</h2>
				<p>{data.temperature}°C</p>
				<p>{data.description}</p>
			</div>
		</ResizableWidget>
	);
}
