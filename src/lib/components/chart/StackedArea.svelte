<script>
	import { area, curveBumpX } from "d3-shape";

	let { stackedData, stackColor, yearLinearScale, countScale } = $props();

	const areaGenerator = area()
		.curve(curveBumpX)
		.x((d) => yearLinearScale(d.data.year))
		.y0((d) => countScale(d[0]))
		.y1((d) => countScale(d[1]));
</script>

<g class="stacked-area-chart">
	{#each stackedData as area, i}
		<g class="area-path">
			<path d={areaGenerator(area)} fill={"#d9d9d9"} />
		</g>
	{/each}
</g>
