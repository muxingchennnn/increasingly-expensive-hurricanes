<script>
	import { line } from "d3-shape";
	import { computeQuad } from "$lib/utils/computeQuad";
	import TrackDefs from "$lib/components/map/TrackDefs.svelte";
	import {
		getHoveredTrackContext,
		getAggregatedDataContext,
		getDblclickedTrackContext
	} from "$lib/utils/context";

	let { projection, colorScale, trackWidthScale } = $props();
	const hoveredTrack = getHoveredTrackContext();
	const dblclickedTrack = getDblclickedTrackContext();

	// $inspect(hoveredTrack);

	let trackProjection = $derived(
		line()
			.x((d) => projection([d.longitude, d.latitude]).at(0))
			.y((d) => projection([d.longitude, d.latitude]).at(1))
	);

	let trackData = $derived(hoveredTrack.value ?? dblclickedTrack.value);
	$effect(() => {
		console.log(trackData);
	});
</script>

<TrackDefs {colorScale} {projection} {trackData} />
<g class="track-segments">
	{#if trackData}
		{#each trackData, i}
			<!-- {console.log(trackData)} -->
			{@const startPoint = trackData.slice(i, i + 2).at(0)}
			{@const endPoint = trackData.slice(i, i + 2).at(1)}
			{#if endPoint}
				{@const p1 = projection([startPoint.longitude, startPoint.latitude])}
				{@const p2 = projection([endPoint.longitude, endPoint.latitude])}
				{@const w1 = parseInt(trackWidthScale(startPoint.category), 10)}
				{@const w2 = parseInt(trackWidthScale(endPoint.category), 10)}
				{@const polygonPoints = computeQuad(p1, p2, w1, w2)}
				<polygon
					role="graphics-symbol"
					aria-label="Hurricane track segment"
					points={polygonPoints.map((d) => d.join(",")).join(" ")}
					fill={`url(#gradient-${i})`}
				/>
				<!-- Connection circle at end point -->
				<circle
					cx={projection([endPoint.longitude, endPoint.latitude])[0]}
					cy={projection([endPoint.longitude, endPoint.latitude])[1]}
					r={w2 / 2}
					fill={`url(#gradient-${i})`}
				/>
			{/if}
		{/each}
	{/if}
</g>

<g class="track-arrows">
	{#if trackData}
		{#each trackData, i}
			{@const segment = trackData.slice(i, i + 2)}
			{#if segment.length > 1}
				{#if i === trackData.length - 1 || (trackData.length - i) % 2 === 0}
					<path
						role="graphics-symbol"
						aria-label="Hurricane track arrow"
						d={trackProjection(segment)}
						fill="none"
						stroke="transparent"
						marker-end={`url(#arrow-${i})`}
						vector-effect="non-scaling-stroke"
					/>
				{/if}
			{/if}
		{/each}
	{/if}
</g>
