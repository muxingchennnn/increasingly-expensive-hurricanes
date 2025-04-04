<script>
	import Scrolly from "$lib/components/Scrolly.svelte";
	import Plot from "$lib/components/Plot.svelte";
	import { fade } from "svelte/transition";

	let currentStep = $state(undefined);

	$effect(() => {
		console.log(currentStep);
	});
</script>

<main class="mx-auto h-full w-[90vw] max-w-[1440px]">
	<div class="h-16"></div>
	<h1
		class="xs:text-[20px] mx-auto mb-4 max-w-[600px] font-serif font-[600] text-pretty md:text-[28px]"
	>
		Charting Increasingly Expensive Hurricanes and Their Tangled Factors
	</h1>
	<p class="mx-auto mb-8 max-w-[600px] text-gray-500">By Muxing Chen</p>
	<p class="mx-auto h-[100vh] max-w-[600px]">
		The cost of hurricanes is mounting. While a number of articles have communicated this trend to
		the public, they often fail to effectively leverage visualizations to support their narrative.
		Some reported insightful driving factors behind the increasingly costly hurricanes without data
		graphics. Others included visualizations, yet scattered them throughout the article, making it
		difficult for readers to piece all the charts together to grasp the whole picture and draw
		connections between them. This article experiments with employing juxtaposed data
		visualizations—much as detectives in movies pinning photos, documents, and other useful
		materials to a corkboard—to walk you through the interplay between the more and more expansive
		hurricanes and their contributing factors.
	</p>
	<div class="section-container">
		<div class="sticky">
			<Plot {currentStep} />
			{#if currentStep > 0}
				<Plot {currentStep} />
			{/if}
			{#if currentStep > 1}
				<Plot {currentStep} />

				<Plot {currentStep} />
			{/if}
		</div>

		<div class="steps-container">
			<Scrolly bind:currentStep>
				{#each ["Hello", "Scrollytelling", "World!"] as text, i}
					<div class="step" class:active={currentStep === i}>
						<div class="step-content">{@html text}</div>
					</div>
				{/each}
			</Scrolly>
		</div>
	</div>
	<div class="h-[100vh]"></div>
	<a href="/explorer" class="mx-auto block h-16 text-center"> -> the explorer </a>
</main>

<style>
	.sticky {
		position: sticky;
		top: 10%;
		flex: 1 1 60%;
		width: 60%;
	}

	.section-container {
		margin-top: 1em;
		text-align: center;
		transition: background 100ms;
		display: flex;
		flex-direction: column;
	}

	.step {
		height: 80vh;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	/* .step {
		height: 80vh;
		opacity: 0.3;
		background: plum;
		transition: opacity 300ms ease;
		display: flex;
		justify-content: center;
		place-items: center;
	}

	.step.active {
		opacity: 1;
	} */

	.step-content {
		font-size: 1rem;
		background: whitesmoke;
		color: #ccc;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: background 500ms ease;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
		text-align: left;
		width: 75%;
		margin: auto;
		max-width: 500px;
	}

	.step.active .step-content {
		background: white;
		color: black;
	}

	.steps-container,
	.sticky {
		width: 95%;
		margin: auto;
	}

	.steps-container {
		flex: 1 1 40%;
		z-index: 10;
	}
</style>
