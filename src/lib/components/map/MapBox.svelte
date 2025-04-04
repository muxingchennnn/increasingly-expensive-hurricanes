<script>
	import { onMount, onDestroy } from "svelte";
	import { Map, NavigationControl, AttributionControl } from "mapbox-gl";
	import ParamBar from "./ParamBar.svelte";

	let { projection, updateProjection } = $props();

	let map;
	let mapContainer;
	const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
	const initialState = {
		zoom: 4.5,
		lng: -73.5786,
		lat: 32.8316
	};
	let mapParams = $state({
		zoom: initialState.zoom,
		lng: initialState.lng,
		lat: initialState.lat,
		projection: "mercator"
	});

	function updateMapParams() {
		mapParams.zoom = map.getZoom();
		mapParams.lng = map.getCenter().lng;
		mapParams.lat = map.getCenter().lat;
	}

	function handleReset() {
		map.flyTo({
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			essential: true
		});
	}

	onMount(() => {
		// console.log(map);
		if (!map) {
			map = new Map({
				accessToken: accessToken,
				container: mapContainer,
				projection: mapParams.projection,
				style: "mapbox://styles/mapbox/dark-v11/", // Style URL
				center: [mapParams.lng, mapParams.lat], // Starting position [lng, lat]
				zoom: mapParams.zoom, // Starting zoom
				minZoom: 3.5,
				maxZoom: 8,
				hash: false,
				attributionControl: false,
				logoPosition: "top-left",
				pitchWithRotate: false, // disables pitch via right click + drag or Ctrl + drag
				dragRotate: false, // disables map rotation via right click + drag or Ctrl + drag
				touchZoomRotate: false, // disable pinch to zoom and rotation
				doubleClickZoom: false,
				scrollZoom: false // disables zoom with scroll wheel or trackpad
			});
			// console.log(map);

			map.on("load", () => {
				projection = updateProjection(map); // Update projection function when the map is loaded
				// map.addControl(new AttributionControl(), "top-left");
				const navigation = new NavigationControl({
					showCompass: true,
					visualizePitch: false
				});
				map.addControl(navigation, "top-left");

				const navControl = document.querySelector(".mapboxgl-ctrl-group");
				if (navControl) {
					const zoomInBtn = navControl.children[0]; // First button (Zoom In)
					const zoomOutBtn = navControl.children[1]; // Second button (Zoom Out)

					zoomInBtn.onclick = () => {
						map.zoomTo(map.getZoom() + 0.5);
					};

					zoomOutBtn.onclick = () => {
						map.zoomTo(map.getZoom() - 0.5);
					};
				}
			});

			// map.on('viewreset', updateDotsPos);
			map.on("move", () => {
				projection = updateProjection(map); // Update projection function when the map is moved
				updateMapParams();
			});
		}

		onDestroy(() => {
			map.remove();
		});
	});
</script>

<!-- <ParamBar {...mapParams} {handleReset} /> -->
<div class="relative h-[100svh] w-full overflow-hidden" bind:this={mapContainer}></div>

<style>
</style>
