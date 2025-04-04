<script>
	let { yearLinearScale, yearBandScale, chartWidth } = $props();

	// let ticks = $derived.by(() => {
	// 	return areaXScale.ticks(7);
	// });

	let mobileTicks = [1870, 1910, 1950, 1990];
	let ticks = [1851, 1870, 1890, 1910, 1930, 1950, 1970, 1990, 2010];
	// console.log(ticks);
</script>

<g class="axis-x">
	{#each ticks as tick, index}
		<g class="tick" transform="translate({yearLinearScale(tick)} 0)">
			<text
				class="fill-foreground sans-12 font-[200]"
				y={-16}
				dominant-baseline="middle"
				text-anchor="left">{tick}</text
			>
			<line x1="0" x2="0" y1="-6" y2="0" class="stroke-foreground stroke-[0.5px]" />
		</g>
	{/each}
	<!-- <text
		class="fill-foreground text-sm"
		transform="translate({areaXScale(2015)} 0)"
		y={-32}
		dominant-baseline="middle"
		text-anchor="left">Year &rarr;</text
	> -->
</g>
