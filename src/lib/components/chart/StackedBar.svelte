<script>
	let { stackedData, stackColor, yearBandScale, countScale } = $props();
</script>

<g class="stacked-bar-chart">
	{#each stackedData as barSeries, i}
		<g class="bar-series">
			{#each barSeries as bar}
				<!-- {console.log(bar)} -->
				<rect
					role="graphics-symbol"
					x={yearBandScale(bar.data.year)}
					y={countScale(bar[1])}
					height={countScale(bar[0]) - countScale(bar[1])}
					width={yearBandScale.bandwidth()}
					fill={"#d9d9d9"}
					opacity={0.8}
				/>
			{/each}
		</g>
	{/each}
</g>
