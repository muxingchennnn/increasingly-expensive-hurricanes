<script>
	import {
		getHoveredDotContext,
		getHoveredTrackContext,
		getDblclickedTrackContext,
		getHurricaneDataContext,
		getLandfallDataContext,
		getBrushedDataContext
	} from "$lib/utils/context";
	let { projection, colorScale } = $props();

	const landfallData = getLandfallDataContext();
	const hurricaneData = getHurricaneDataContext();
	const brushedData = getBrushedDataContext();

	$effect(() => {
		// console.log(brushedData.value ?? landfallData);
		// console.log(landfallData);
	});

	const hoveredDot = getHoveredDotContext();
	const hoveredTrack = getHoveredTrackContext();
	const dblclickedTrack = getDblclickedTrackContext();
	// $inspect(hoveredDot.value, hoveredTrack.value);

	function handleDblClick() {
		dblclickedTrack.value = hoveredTrack.value ?? null;
		// console.log(dblclickedTrack.value);
		hoveredDot.value = null;
		hoveredTrack.value = null;
		brushedData.value = [];
	}

	function handleHover(e, dot) {
		if (e.type === "mouseover") {
			hoveredDot.value = dot;
			hoveredTrack.value = hurricaneData.get(dot.id);
		} else if (e.type === "mouseout") {
			hoveredDot.value = null;
			hoveredTrack.value = null;
		}
	}
</script>

<g class="dots">
	{#each brushedData.value ?? landfallData as dot (crypto.randomUUID())}
		<circle
			role="graphics-symbol"
			aria-label="Hurricane landfall location"
			cx={projection([+dot.longitude, +dot.latitude])[0]}
			cy={projection([+dot.longitude, +dot.latitude])[1]}
			fill={colorScale(dot.category)}
			r={hoveredDot.value ? (hoveredDot.value.date === dot.date ? 10 : 4) : 4}
			opacity={hoveredDot.value ? (hoveredDot.value.date === dot.date ? 1 : 0.2) : 0.6}
			onmouseover={(e) => handleHover(e, dot)}
			onmouseout={(e) => handleHover(e, dot)}
			onfocus={(e) => handleHover(e, dot)}
			onblur={(e) => handleHover(e, dot)}
			ondblclick={handleDblClick}
		/>
	{/each}
</g>

<style>
	circle {
		transition:
			r 300ms ease,
			opacity 500ms ease;
		cursor: pointer;
	}
</style>
