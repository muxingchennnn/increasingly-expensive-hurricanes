<script>
	let { currentStep } = $props();

	let data = [
		{ foo: 4, bar: 1, swag: 7 },
		{ foo: 1, bar: 3, swag: 3 },
		{ foo: 9, bar: 5, swag: 4 },
		{ foo: 2, bar: 5, swag: 5 },
		{ foo: 10, bar: 4, swag: 6 },
		{ foo: 9, bar: 5, swag: 7 },
		{ foo: 5, bar: 3, swag: 8 },
		{ foo: 4, bar: 10, swag: 9 },
		{ foo: 1, bar: 6, swag: 10 }
	];

	import { scaleLinear, scaleSqrt } from "d3-scale";
	import { extent, min, max } from "d3-array";
	import { fade } from "svelte/transition";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	let width;
	let height;

	const margin = { top: 30, bottom: 30, left: 30, right: 30 };

	const tweenOptions = {
		delay: 0,
		duration: 1000,
		easing: cubicOut
	};

	const tweenedX = tweened(
		data.map((d) => d.foo),
		tweenOptions
	);

	const tweenedY = tweened(
		data.map((d) => d.bar),
		tweenOptions
	);

	let tweenedData = $derived(
		data.map((d, index) => ({
			x: $tweenedX[index],
			y: $tweenedY[index]
		}))
	);

	function setTween(dimension, key) {
		dimension.set(data.map((d) => +d[key]));
	}

	$effect(() => {
		if (currentStep == 0) {
			setTween(tweenedX, "foo");
			setTween(tweenedY, "bar");
		}
		if (currentStep == 1) {
			setTween(tweenedX, "foo");
			setTween(tweenedY, "swag");
		}
		if (currentStep == 2) {
			setTween(tweenedX, "swag");
		}
	});

	let xScale = $derived(
		scaleLinear()
			.domain(extent($tweenedX, (d) => d))
			.range([margin.left, width - margin.right])
	);

	let yScale = $derived(
		scaleLinear()
			.domain(extent($tweenedY, (d) => d))
			.range([height - margin.top, margin.bottom])
	);
</script>

<div class="chart-container" bind:offsetWidth={width} bind:offsetHeight={height} transition:fade>
	<svg width={width + margin.right + margin.left} {height}>
		{#each tweenedData as d}
			<circle
				cx={xScale(d.x)}
				cy={yScale(d.y)}
				r={15}
				fill="steelblue"
				stroke="#000000"
				opacity=".9"
			/>
		{/each}
	</svg>
</div>

<style>
	.chart-container {
		height: 20vh;
		margin-bottom: 1em;
		max-width: 100%;
		background: linear-gradient(to bottom right, steelblue -100%, white 100%);
		border-radius: 5px;
		box-shadow: 1px 1px 6px #cecece;
	}
</style>
