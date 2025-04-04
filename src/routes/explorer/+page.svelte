<script>
	import MapViz from "$lib/components/map/MapViz.svelte";
	import Chart from "$lib/components/chart/Chart.svelte";
	import {
		setHurricaneDataContext,
		setLandfallDataContext,
		setAggregatedDataContext,
		setHoveredDotContext,
		setHoveredTrackContext,
		setDblclickedTrackContext,
		setHoveredDataContext,
		setBrushedDataContext
	} from "$lib/utils/context";
	import { min, max } from "d3-array";

	let { data } = $props();
	const { hurricaneGroupedData, landfallData, aggregatedData } = data;
	let hoveredDot = $state({ value: null });
	let hoveredTrack = $state({ value: null });
	let dblclickedTrack = $state({ value: null });
	let hoveredData = $state({ value: null });
	let brushedData = $state({ value: null });

	setHurricaneDataContext(hurricaneGroupedData);
	setLandfallDataContext(landfallData);
	setAggregatedDataContext(aggregatedData);
	setHoveredDotContext(hoveredDot);
	setHoveredTrackContext(hoveredTrack);
	setDblclickedTrackContext(dblclickedTrack);
	setHoveredDataContext(hoveredData);
	setBrushedDataContext(brushedData);
</script>

<main class="relative h-full w-full">
	<MapViz />
	<Chart />
</main>
