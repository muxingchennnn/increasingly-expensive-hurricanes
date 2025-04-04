<script>
	let { hoveredData, yearLinearScale, chartHeight } = $props();
</script>

{#if hoveredData.value}
	<line
		x1={yearLinearScale(hoveredData.value?.year)}
		x2={yearLinearScale(hoveredData.value?.year)}
		y1="0"
		y2={chartHeight}
		stroke="var(--color-foreground)"
		stroke-width="0.5px"
	/>
{/if}
