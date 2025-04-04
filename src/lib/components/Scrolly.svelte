<script>
	/**
	Scrollytelling component from Russell Goldenberg 
	https://twitter.com/codenberg/status/1432774653139984387
	
   * This component manages which item is most in view for scroll triggering
   * example:
   * <Scroll
   * 	bind:value={scrollIndex}
   * >
   * **items here**
   * </Scroll>
   *
   * optional params with defaults
   * <Scroll root={null} top={0} bottom={0} increments={100}>
   */
	import { onMount } from "svelte";

	let {
		root = null,
		top = 0,
		bottom = 0,
		increments = 100,
		currentStep = $bindable(),
		children
	} = $props();

	// let steps = $state([]);
	// let threshold = $state([]);
	const steps = [];
	const threshold = [];
	let nodes = $state([]);
	let intersectionObservers = $state([]);
	let container;

	function update() {
		if (!nodes.length) return;
		nodes.forEach(createObserver);
	}

	function mostInView() {
		let maxRatio = 0;
		let maxIndex = 0;
		for (let i = 0; i < steps.length; i++) {
			if (steps[i] > maxRatio) {
				maxRatio = steps[i];
				maxIndex = i;
			}
		}

		if (maxRatio > 0) currentStep = maxIndex;
		else currentStep = undefined;
	}

	function createObserver(node, index) {
		const handleIntersect = (e) => {
			const ratio = e[0].intersectionRatio;
			steps[index] = ratio;
			mostInView();
		};

		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin, threshold };

		if (intersectionObservers[index]) intersectionObservers[index].disconnect();

		const io = new IntersectionObserver(handleIntersect, options);
		io.observe(node);
		intersectionObservers[index] = io;
	}

	onMount(() => {
		for (let i = 0; i < increments + 1; i++) {
			threshold.push(i / increments);
		}
		nodes = container.querySelectorAll(":scope > *");
		update();
	});

	// React to changes in top or bottom
	$effect(() => {
		if (top || bottom) {
			update();
		}
	});
</script>

<div bind:this={container}>
	{@render children()}
</div>
