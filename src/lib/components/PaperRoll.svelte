<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';

	let hovered = $state(false);

	const hoverProgress = Tween.of(() => (hovered ? 1 : 0), {
		duration: 600,
		easing: quintOut
	});

	const paperUnroll = $derived(hoverProgress.current);
</script>

<div
	class="paper-roll"
	role="presentation"
	style={`--paper-unroll:${paperUnroll};`}
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	<span class="cylinder"></span>
</div>

<style>
	.paper-roll {
		/* Sizing */
		--base-size: 10vmin;
		--container-width: calc(var(--base-size) * 1.5);
		--container-height: calc(var(--base-size) * 1.5);
		--paper-roll-top-offset: 4vmin;
		--paper-roll-left-offset: 2vmin;
		--paper-roll-height: calc(100% - var(--paper-roll-top-offset) * 2);
		--cylinder-width: 2vmin;
		--paper-line-width: 0.2vmin;

		/* Positioning */
		--paper-offset-from-cylinder: calc(var(--cylinder-width) * 0.2);
		--paper-width-rolled: calc(var(--cylinder-width) * 0.8);
		--lines-offset-from-cylinder: calc(var(--cylinder-width) * 0.5);

		/* Animation */
		--paper-unroll-max-width: 28vmin;
		--paper-unroll-width-multiplier: 0.5vmin;
		--paper-clip-wave-base: 0%;
		--paper-clip-wave-small: 2%;
		--paper-clip-wave-medium: 4%;
		--paper-clip-wave-large: 6%;

		/* Colors */
		--color-paper: #f5e6d3;
		--color-lines-base: #8b7355;
		--color-cylinder-base: #8b7355;
		--color-cylinder-dark: #5a4d3a;
		--color-cylinder-darker: #6b5d47;
		--color-cylinder-light: #9d8363;
		--color-cylinder-cap-dark: #4a3f32;
		--color-cylinder-cap-darker: #2a2419;

		/* Shadows */
		--shadow-inset-dark: inset -0.2vmin 0 0.4vmin rgba(0, 0, 0, 0.5);
		--shadow-inset-light: inset 0.2vmin 0 0.4vmin rgba(255, 255, 255, 0.15);
		--shadow-cylinder-outer: 0 0.1vmin 0.2vmin rgba(0, 0, 0, 0.4);
		--shadow-cylinder-glow: 0 0 0.5vmin rgba(0, 0, 0, 0.2);
		--shadow-cap: 0 0 0.2vmin rgba(0, 0, 0, 0.3);

		/* Z-index layers */
		--z-cylinder: 1;
		--z-paper: 2;
		--z-lines: 3;

		/* Cylinder styling */
		--cylinder-cap-height: 0.4vmin;
		--cylinder-gradient-stop-1: 20%;
		--cylinder-gradient-stop-2: 40%;
		--cylinder-gradient-stop-3: 50%;
		--cylinder-gradient-stop-4: 60%;
		--cylinder-gradient-stop-5: 80%;
		--cylinder-cap-gradient-stop-1: 40%;
		--cylinder-cap-gradient-stop-2: 80%;

		/* Opacity */
		--opacity-lines-base: 0.5;
		--opacity-lines-hover: 1;

		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--container-width);
		height: var(--container-height);
		box-sizing: border-box;
		cursor: pointer;
		user-select: none;
	}

	/* Cylinder */
	.cylinder {
		position: absolute;
		left: var(--paper-roll-left-offset);
		top: var(--paper-roll-top-offset);
		width: var(--cylinder-width);
		height: var(--paper-roll-height);
		background: linear-gradient(
			to right,
			var(--color-cylinder-dark) 0%,
			var(--color-cylinder-darker) var(--cylinder-gradient-stop-1),
			var(--color-cylinder-base) var(--cylinder-gradient-stop-2),
			var(--color-cylinder-light) var(--cylinder-gradient-stop-3),
			var(--color-cylinder-base) var(--cylinder-gradient-stop-4),
			var(--color-cylinder-darker) var(--cylinder-gradient-stop-5),
			var(--color-cylinder-dark) 100%
		);
		border-radius: calc(var(--cylinder-width) / 2);
		box-shadow:
			var(--shadow-inset-dark), var(--shadow-inset-light), var(--shadow-cylinder-outer),
			var(--shadow-cylinder-glow);
		z-index: var(--z-cylinder);
		pointer-events: none;
	}

	.cylinder::before,
	.cylinder::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: var(--cylinder-cap-height);
		background: radial-gradient(
			ellipse at center,
			var(--color-cylinder-base) 0%,
			var(--color-cylinder-darker) var(--cylinder-cap-gradient-stop-1),
			var(--color-cylinder-cap-dark) var(--cylinder-cap-gradient-stop-2),
			var(--color-cylinder-cap-darker) 100%
		);
		border-radius: 50%;
		box-shadow: var(--shadow-cap);
		z-index: var(--z-paper);
	}

	.cylinder::after {
		top: auto;
		bottom: 0;
	}

	/* Paper */
	.paper-roll::before,
	.paper-roll::after {
		content: '';
		position: absolute;
		top: var(--paper-roll-top-offset);
		height: var(--paper-roll-height);
		pointer-events: none;
	}

	.paper-roll::before {
		left: calc(var(--paper-roll-left-offset) + var(--paper-offset-from-cylinder));
		width: calc(var(--paper-width-rolled) + var(--paper-unroll, 0) * var(--paper-unroll-max-width));
		background: linear-gradient(
			to right,
			var(--color-paper) 0%,
			#f9eddd 50%,
			var(--color-paper) 100%
		);
		transform: translateY(calc(var(--paper-unroll, 0) * -0.2vmin));
		box-shadow: calc(var(--paper-unroll, 0) * 0.4vmin) calc(var(--paper-unroll, 0) * 0.3vmin)
			calc(var(--paper-unroll, 0) * 0.8vmin) rgba(0, 0, 0, calc(var(--paper-unroll, 0) * 0.2));
		z-index: var(--z-paper);
		clip-path: polygon(
			0% 0%,
			calc(100% - var(--paper-unroll, 0) * 1% - var(--paper-clip-wave-small)) 0%,
			calc(100% - var(--paper-unroll, 0) * 2% - var(--paper-clip-wave-large)) 8%,
			calc(100% - var(--paper-unroll, 0) * 1.5% - var(--paper-clip-wave-medium)) 16%,
			calc(100% - var(--paper-unroll, 0) * 1% - var(--paper-clip-wave-small)) 24%,
			calc(100% - var(--paper-unroll, 0) * 2.5% - var(--paper-clip-wave-large)) 32%,
			calc(100% - var(--paper-unroll, 0) * 1.5% - var(--paper-clip-wave-medium)) 42%,
			calc(100% - var(--paper-unroll, 0) * 2% - var(--paper-clip-wave-large)) 52%,
			calc(100% - var(--paper-unroll, 0) * 1% - var(--paper-clip-wave-small)) 62%,
			calc(100% - var(--paper-unroll, 0) * 2% - var(--paper-clip-wave-medium)) 72%,
			calc(100% - var(--paper-unroll, 0) * 2.5% - var(--paper-clip-wave-large)) 82%,
			calc(100% - var(--paper-unroll, 0) * 1.5% - var(--paper-clip-wave-small)) 92%,
			calc(100% - var(--paper-unroll, 0) * 1% - var(--paper-clip-wave-medium)) 100%,
			0% 100%
		);
	}
</style>
