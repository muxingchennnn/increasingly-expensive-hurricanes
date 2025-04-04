<script>
	import { innerWidth, innerHeight } from "svelte/reactivity/window";
	import { fade } from "svelte/transition";
	import { timeFormat } from "d3-time-format";
	import { color } from "d3";
	import { getHoveredDotContext } from "$lib/utils/context";

	let { projection, colorScale } = $props();
	const hoveredDot = getHoveredDotContext();

	let tooltipWidth = $state(400);
	let tooltipHeight = $state(400);
	const xNudge = 16;
	const yNudge = 8;

	let xPosition = $derived(
		projection([+hoveredDot.value.longitude, +hoveredDot.value.latitude])[0] + xNudge
	);
	let yPosition = $derived(
		projection([+hoveredDot.value.longitude, +hoveredDot.value.latitude])[1] + yNudge
	);

	let computedXPosition = $derived.by(() =>
		xPosition + xNudge + tooltipWidth > innerWidth.current
			? xPosition - tooltipWidth - xNudge * 2
			: xPosition + xNudge
	);

	let computedYPosition = $derived.by(() =>
		yPosition + yNudge + tooltipHeight > innerHeight.current * 0.85 // 0.85 substract the height of chart 15vh
			? yPosition - tooltipHeight - yNudge * 2
			: yPosition + yNudge
	);

	// $inspect(hoveredDot.value);
</script>

{#if hoveredDot.value?.id}
	<div
		class="tooltip"
		style="left: {computedXPosition}px; top: {computedYPosition}px"
		transition:fade={{ duration: 250 }}
		bind:clientWidth={tooltipWidth}
		bind:clientHeight={tooltipHeight}
	>
		<h1 class="sans-16 -mb-1.5 font-bold">
			{hoveredDot.value.name.charAt(0).toUpperCase() + hoveredDot.value.name.slice(1).toLowerCase()}
		</h1>
		<h2 class="serif-14 mb-1 text-gray-400 italic">
			{timeFormat("%b %d, %Y, %H:%M EST")(hoveredDot.value.date)}
		</h2>
		<div class="-space-y-0.5">
			<p>Speed: {Math.round(hoveredDot.value.mph)} mph / {hoveredDot.value.knots} kt</p>
			{#if hoveredDot.value.status === "TS"}
				<p>Status: Tropical Storm</p>
			{:else}
				<p
					class="badge"
					style:--badge-content={hoveredDot.value.category > 0 && `'${hoveredDot.value.category}'`}
					style:--badge-color={colorScale(hoveredDot.value.category)}
				>
					Status: Hurricane
				</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	@reference "../../../app.css";

	/* prettier-ignore */
	.tooltip {
		@apply absolute w-fit px-[1rem] py-[0.875rem]
		rounded border-[0.5px] bg-gray-500/25 backdrop-blur-xs
	border-t-gray-400/70 border-l-gray-400/60
	  border-b-gray-500/70 border-r-gray-500/80;
	
	}

	p {
		@apply sans-16 font-[200];
	}

	/* prettier-ignore */
	.badge {
		@apply flex items-center after:block after:self-center after:h-[1.25rem] after:w-[1.25rem] after:ml-1
		after:rounded-full
		after:bg-[var(--badge-color)] after:content-[var(--badge-content)]
		after:sans-14 after:font-[500] after:text-center after:content-center after:leading-[1rem] ;
	}
</style>
