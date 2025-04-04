<script>
	import { LngLat } from "mapbox-gl";
	import { scaleOrdinal } from "d3-scale";
	import { trackWidthAndColorMapping } from "$lib/data/mapping";
	import { getDblclickedTrackContext } from "$lib/utils/context";
	import MapBox from "$lib/components/map/MapBox.svelte";
	import Dots from "$lib/components/map/Dots.svelte";
	import Track from "$lib/components/map/Track.svelte";
	import MapTooltip from "$lib/components/map/MapTooltip.svelte";

	const dblclickedTrack = getDblclickedTrackContext();

	let projection = $state(() => [0, 0]); // Map the [lng, lat] data onto the Mapbox map positions
	function updateProjection(mapboxObj) {
		projection = function (coordinates) {
			let [lon, lat] = coordinates;
			let point = mapboxObj.project(new LngLat(lon, lat));
			return [point.x, point.y];
		};
	}

	const colorScale = scaleOrdinal()
		.domain(trackWidthAndColorMapping.map((d) => d.category))
		.range(trackWidthAndColorMapping.map((d) => d.color));

	const trackWidthScale = scaleOrdinal()
		.domain(trackWidthAndColorMapping.map((d) => d.category))
		.range(trackWidthAndColorMapping.map((d) => d.width));
</script>

<MapBox {projection} {updateProjection} />
<svg
	role="graphics-document"
	class="map-visualization pointer-events-none absolute top-0 left-0 h-full w-full"
>
	<Track {projection} {colorScale} {trackWidthScale} />
	<Dots {projection} {colorScale} />
</svg>
<MapTooltip {projection} {colorScale} />

<style>
	:global(g) {
		pointer-events: auto;
	}
</style>
