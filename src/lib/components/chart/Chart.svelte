<script>
	import { stack } from "d3-shape";
	import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
	import { extent, max } from "d3-array";
	import {
		getLandfallDataContext,
		getAggregatedDataContext,
		getHoveredDataContext
	} from "$lib/utils/context";
	import { stackColorMapping } from "$lib/data/mapping";
	import AxisX from "$lib/components/chart/AxisX.svelte";
	import AxisY from "$lib/components/chart/AxisY.svelte";
	import RectBackdrop from "$lib/components/chart/RectBackdrop.svelte";
	import StackedArea from "$lib/components/chart/StackedArea.svelte";
	import StackedBar from "$lib/components/chart/StackedBar.svelte";
	import Bar from "$lib/components/chart/Bar.svelte";
	import Line from "$lib/components/chart/Line.svelte";
	import ReferenceLine from "$lib/components/chart/ReferenceLine.svelte";
	import Brush from "$lib/components/chart/Brush.svelte";

	const landfallData = getLandfallDataContext();
	const aggregatedData = getAggregatedDataContext();
	const hoveredData = getHoveredDataContext();
	// $inspect(hoveredData.value);
	// console.log(aggregatedData);

	const margin = { top: 72, right: 32, bottom: 0, left: 32 };
	let width = $state(400);
	let height = $state(400);
	let chartWidth = $derived(width - margin.left - margin.right);
	let chartHeight = $derived(height - margin.top - margin.bottom);

	const stackGenerator = stack().keys(stackColorMapping.map((d) => d.key));
	const stackedData = stackGenerator(aggregatedData);
	// console.log(stackedData);

	let yearLinearScale = $derived.by(() => {
		return scaleLinear()
			.domain(extent(aggregatedData, (d) => d.year))
			.range([0, chartWidth]);
	});

	let yearBandScale = $derived.by(() => {
		return scaleBand()
			.domain(aggregatedData.map((d) => d.year))
			.range([0, chartWidth])
			.paddingInner(0.2)
			.paddingOuter(-0.4);
	});

	let countScale = $derived.by(() => {
		return scaleLinear()
			.domain(extent(stackedData.flat(2)))
			.range([chartHeight, 0]);
	});

	const colorScale = $derived.by(() => {
		return scaleOrdinal()
			.domain(stackColorMapping.map((d) => d.key))
			.range(stackColorMapping.map((d) => d.color));
	});

	let mouseX = $state(0);
	let mouseY = $state(0);
	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect(); // get the client of chart
		mouseX = e.clientX - rect.left; // mouse position x within the chart
		mouseY = e.clientY - rect.top; // mouse position y within the chart

		const closestInvertedX = Math.round(yearLinearScale.invert(mouseX)); // get year value from mouse position x
		[hoveredData.value] = aggregatedData.filter((d) => d.year === closestInvertedX); // filter and get tooltip data based on year
	}

	let isBrushed = $state(false);
</script>

<div class="chart-outer-wrapper border-t-foreground/50 border-t-[0.5px]">
	<div class="chart-inner-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
		<svg class="absolute bottom-0" {width} {height} role="graphics-document">
			<g
				role="graphics-object"
				transform={`translate(${margin.left}, ${margin.top})`}
				onmousemove={handleMouseMove}
				onmouseleave={() => (hoveredData.value = null)}
			>
				<!-- Transparent rect to capture mouse events -->
				<RectBackdrop {chartWidth} {chartHeight} />
				<!-- <AxisY {countScale} {chartWidth} /> -->
				<!-- <StackedBar {stackedData} {yearBandScale} {countScale} /> -->
				<Bar {yearBandScale} {countScale} />
				<!-- <StackedArea {stackedData} {yearLinearScale} {countScale} /> -->
				<!-- <Line {yearLinearScale} {countScale} /> -->
				{#if !isBrushed}
					<ReferenceLine {hoveredData} {yearLinearScale} {chartHeight} />
				{/if}
				<AxisX {yearLinearScale} {yearBandScale} {chartWidth} />
				<Brush {chartWidth} {chartHeight} {yearLinearScale} bind:isBrushed />
			</g>
		</svg>
		<h1 class="sans-14 absolute top-3 font-[700]" style:left="{margin.left}px">
			Atlantic hurricane landfalls, 1851-2023
		</h1>
	</div>
</div>

<style>
	@reference "../../../app.css";

	/* prettier-ignore */
	.chart-outer-wrapper {
		@apply fixed bottom-0 left-[50%] -translate-x-[50%] 
		h-[15vh] w-full
		bg-[#1f1f1f]/70 backdrop-blur-xs;
	}

	/* prettier-ignore */
	.chart-inner-wrapper {
		@apply relative h-full w-[95%] mx-auto;
	}
</style>
