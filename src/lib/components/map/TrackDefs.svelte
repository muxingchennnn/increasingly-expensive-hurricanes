<script>
	import { getHoveredTrackContext } from "$lib/utils/context";

	let { colorScale, projection, trackData } = $props();
	const hoveredTrack = getHoveredTrackContext();
	$effect(() => {
		console.log(trackData);
	});
</script>

<defs>
	<!-- Define arrow marker -->
	{#if trackData}
		{#each trackData, i}
			{@const segment = trackData.slice(i, i + 2)}
			{#if segment.length > 1}
				<marker
					id={`arrow-${i}`}
					viewBox="0 0 16 16"
					refX="8"
					refY="8"
					markerWidth="12"
					markerHeight="12"
					orient="auto-start-reverse"
					markerUnits="userSpaceOnUse"
				>
					<path
						d="M 2 2 L 14 8 L 2 14 z"
						fill={colorScale(segment[1].category)}
						class="stroke-foreground stroke-1"
					/>
				</marker>
			{/if}
		{/each}
	{/if}
	<!-- Define gradients -->
	{#if trackData}
		{#each trackData, i}
			{@const startPoint = trackData.slice(i, i + 2).at(0)}
			{@const endPoint = trackData.slice(i, i + 2).at(1)}
			{#if endPoint}
				<linearGradient
					id={`gradient-${i}`}
					gradientUnits="userSpaceOnUse"
					x1={projection([startPoint.longitude, startPoint.latitude]).at(0)}
					y1={projection([startPoint.longitude, startPoint.latitude]).at(1)}
					x2={projection([endPoint.longitude, endPoint.latitude]).at(0)}
					y2={projection([endPoint.longitude, endPoint.latitude]).at(1)}
				>
					<stop offset="0%" stop-color={colorScale(startPoint.category)} />
					<stop offset="100%" stop-color={colorScale(endPoint.category)} />
				</linearGradient>
			{/if}
		{/each}
	{/if}
</defs>
