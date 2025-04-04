import { brushX } from "d3-brush";
import { select } from "d3-selection";

export function brushAction(node, { width, height, scale, brushLowerBound, brushUpperBound }) {
	const selection = select(node);
	const brush = brushX();

	const resetBrush = () => {
		selection.call(brush.clear);
		[brushLowerBound.value, brushUpperBound.value] = scale.domain();
	};

	const handleBrush = ({ sourceEvent, selection }) => {
		if (!sourceEvent || selection === null) return; // ensure the brush event was triggered by user input
		[brushLowerBound.value, brushUpperBound.value] = selection.map((d) =>
			Math.round(scale.invert(d))
		);
	};

	const handleDblclick = () => resetBrush();

	$effect(() => {
		console.log(width, height);
		brush.extent([
			[0, 0],
			[width, height]
		]);

		// prettier-ignore
		selection.call(brush)
    .on("start brush end", handleBrush)
    .on("dblclick", handleDblclick);

		resetBrush(); // Reset brush on initial render, and run when width changes

		return () => {
			selection.on(".brush", null); // Clean up drag listeners named ".brush"
			selection.on("dblclick", null); // Clean up "dblclick" listener
		};
	});
}
