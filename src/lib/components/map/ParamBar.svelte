<script>
	let { zoom, lng, lat, handleReset } = $props();
</script>

<div class="sidebar">
	Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:
	{zoom.toFixed(2)}
</div>
<button onclick={handleReset} class="reset-button">Reset</button>

<style>
	.sidebar {
		background-color: rgb(35 55 75 / 90%);
		color: #fff;
		padding: 6px 12px;
		font-family: monospace;
		z-index: 1;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 12px;
		border-radius: 4px;
	}

	.reset-button {
		position: absolute;
		top: 50px;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		padding: 4px 10px;
		border-radius: 10px;
		cursor: pointer;
		color: #fff;
	}
</style>
