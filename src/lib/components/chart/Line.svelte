<script>
	import { line, curveBumpX } from "d3-shape";
	import { getAggregatedDataContext } from "$lib/utils/context";

	const aggregatedData = getAggregatedDataContext();
	let { yearLinearScale, countScale } = $props();

	const lineGenerator = line()
		.curve(curveBumpX)
		.x((d) => yearLinearScale(d.year))
		.y((d) => countScale(d.total_count));
</script>

<g class="line-chart">
	<path d={lineGenerator(aggregatedData)} fill="none" stroke="#d9d9d9" stroke-width="1px" />
</g>
