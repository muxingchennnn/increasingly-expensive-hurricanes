<script>
	import { brushX } from "d3-brush";
	import { select } from "d3-selection";
	import { min, max } from "d3-array";
	import {
		getLandfallDataContext,
		getAggregatedDataContext,
		getBrushedDataContext
	} from "$lib/utils/context";
	import { onMount } from "svelte";

	let { chartWidth, chartHeight, yearLinearScale, isBrushed = $bindable() } = $props();

	const landfallData = getLandfallDataContext();
	const aggregatedData = getAggregatedDataContext();
	const brushedData = getBrushedDataContext();
	let brushLowerBound = $state({ value: min(aggregatedData, (d) => d.year) });
	let brushUpperBound = $state({ value: max(aggregatedData, (d) => d.year) });
	// $inspect(brushLowerBound, brushUpperBound);
	// $inspect(brushedData);

	let brushEl;
	let brushSelObj; // d3 selection object
	const brush = brushX();

	function resetBrush() {
		brushSelObj.call(brush.clear);
		[brushLowerBound, brushUpperBound] = yearLinearScale.domain();
		isBrushed = false;
		brushedData.value = null;
	}

	function handleBrushed({ sourceEvent, selection }) {
		if (!sourceEvent) return; // ensure the brush event was triggered by user input
		if (selection !== null) {
			isBrushed = true;
			[brushLowerBound, brushUpperBound] = selection.map((d) =>
				Math.round(yearLinearScale.invert(d))
			);

			brushedData.value = landfallData.filter((d) => {
				return d.year >= brushLowerBound && d.year <= brushUpperBound;
			});
		} else if (selection === null) {
			resetBrush(); // Reset brush when click on the area outside the brush
		}
		// console.log(brushedData);
		// console.log(brushLowerBound, brushUpperBound);
	}

	function handleDblclick() {
		resetBrush(); // Reset brush when doubleclick the brush area
	}

	onMount(() => {
		brushSelObj = select(brushEl);
	});

	$effect(() => {
		// prettier-ignore
		brush
			.extent([[0, 0],[chartWidth, chartHeight]])
			.on("start brush end", handleBrushed);

		brushSelObj.call(brush).on("dblclick", handleDblclick);

		resetBrush(); // Reset brush on initial render, and run when chartWidth changes

		return () => {
			brushSelObj.on(".brush", null); // Clean up drag listeners named ".brush"
			brushSelObj.on("dblclick", null); // Clean up "dblclick" listener
		};
	});
</script>

<g bind:this={brushEl} role="graphics-object"></g>

<style>
</style>
