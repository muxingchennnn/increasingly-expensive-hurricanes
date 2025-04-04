<script>
	import { getAggregatedDataContext } from "$lib/utils/context";

	const aggregatedData = getAggregatedDataContext();
	let { yearBandScale, countScale } = $props();
</script>

<g class="bar-chart">
	{#each aggregatedData as bar, i}
		<rect
			role="graphics-symbol"
			x={yearBandScale(bar.year)}
			y={countScale(bar.total_count)}
			height={countScale(0) - countScale(bar.total_count)}
			width={yearBandScale.bandwidth()}
			fill={"#d9d9d9"}
			opacity={0.8}
		/>
	{/each}
</g>
