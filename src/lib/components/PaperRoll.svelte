<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';

	let hovered = $state(false);

	const hoverProgress = Tween.of(() => (hovered ? 1 : 0), {
		duration: 300,
		easing: elasticOut
	});

	const paperUnroll = $derived(hoverProgress.current);

	function setHover(state: boolean) {
		hovered = state;
	}
</script>

<div
	class="paper-roll"
	role="presentation"
	style={`--paper-unroll:${paperUnroll};`}
	onmouseenter={() => setHover(true)}
	onmouseleave={() => setHover(false)}
>
</div>

<style>
	:root {
		--sz: 10vmin;
		--paper-roll-top: 4vmin;
		--paper-roll-left: -1.9vmin;
		--paper-roll-width: 2vmin;
		--paper-roll-line-width: 0.2vmin;
		--paper-roll-height: calc(100% - var(--paper-roll-top) * 2);
		--color-white: #fff;
		--color-gray-transparent: #ccc6;
		--toggle-width: calc(var(--sz) * 4);
		--toggle-height: calc(var(--sz) * 4);
	}

	.paper-roll {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--toggle-width);
		height: var(--toggle-height);
		box-sizing: border-box;
		cursor: pointer;
		user-select: none;
	}

	.paper-roll::before,
	.paper-roll::after {
		content: '';
		position: absolute;
		top: var(--paper-roll-top);
		height: var(--paper-roll-height);
		pointer-events: none;
	}

	.paper-roll::before {
		left: calc(var(--paper-roll-left) + var(--paper-unroll, 0) * 0.5vmin);
		width: calc(var(--paper-roll-width) + var(--paper-unroll, 0) * 3vmin);
		background-color: var(--color-white);
		clip-path: polygon(
			0% 0%,
			calc(18% - var(--paper-unroll, 0) * 5%) 8%,
			calc(2% + var(--paper-unroll, 0) * 3%) 39%,
			calc(21% - var(--paper-unroll, 0) * 5%) 80%,
			calc(2% + var(--paper-unroll, 0) * 3%) 90%,
			calc(15% - var(--paper-unroll, 0) * 3%) 105%,
			100% 100%,
			100% 0%
		);
	}

	.paper-roll::after {
		left: calc(var(--paper-roll-left) + var(--paper-unroll, 0) * 0.5vmin);
		width: calc(var(--paper-roll-line-width) + var(--paper-unroll, 0) * 0.3vmin);
		background: repeating-linear-gradient(
			180deg,
			var(--color-gray-transparent),
			var(--color-white) calc(1px + 0.8vmin) calc(0.8vmin + 2px)
		);
		opacity: calc(0.7 + var(--paper-unroll, 0) * 0.3);
	}
</style>
