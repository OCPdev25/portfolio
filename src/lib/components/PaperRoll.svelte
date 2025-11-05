<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';

	const UNROLL_THRESHOLD = 0.95;
	const SLICE_COUNT = 14;
	const SLICE_DELAY_MS = 80;
	const TORN_EDGE_STEPS = [
		{ retreat: 1, waveVar: 'small', position: '0%' },
		{ retreat: 2, waveVar: 'large', position: '8%' },
		{ retreat: 1.5, waveVar: 'medium', position: '16%' },
		{ retreat: 1, waveVar: 'small', position: '24%' },
		{ retreat: 2.5, waveVar: 'large', position: '32%' },
		{ retreat: 1.5, waveVar: 'medium', position: '42%' },
		{ retreat: 2, waveVar: 'large', position: '52%' },
		{ retreat: 1, waveVar: 'small', position: '62%' },
		{ retreat: 2, waveVar: 'medium', position: '72%' },
		{ retreat: 2.5, waveVar: 'large', position: '82%' },
		{ retreat: 1.5, waveVar: 'small', position: '92%' },
		{ retreat: 1, waveVar: 'medium', position: '100%' }
	] as const;

	const tornEdgePolygon = [
		'0% 0%',
		...TORN_EDGE_STEPS.map(
			({ retreat, waveVar, position }) =>
				`calc(100% - var(--paper-roll-unroll, 0) * ${retreat}% - var(--paper-roll-wave-${waveVar})) ${position}`
		),
		'0% 100%'
	].join(', ');

	let hovered = $state(false);

	const reduceMotion = $derived(prefersReducedMotion.current);

	const hoverProgress = Tween.of(() => (hovered ? 1 : 0), {
		duration: 600,
		easing: quintOut
	});

	const paperUnroll = $derived(reduceMotion ? (hovered ? 1 : 0) : hoverProgress.current);

	const isFullyUnrolled = $derived(paperUnroll >= UNROLL_THRESHOLD);
	const waveActive = $derived(!reduceMotion && isFullyUnrolled && hovered);

	const slices = Array.from({ length: SLICE_COUNT }, (_, index) => ({
		index,
		style: `--slice-index:${index};`
	}));
</script>

<div
	class="paper-roll"
	role="presentation"
	aria-hidden="true"
	style={`
		--paper-roll-unroll:${paperUnroll};
		--paper-roll-slice-count:${SLICE_COUNT};
		--paper-roll-slice-delay:${SLICE_DELAY_MS}ms;
		--paper-roll-clip-shape:${tornEdgePolygon};
	`}
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	<span class="cylinder"></span>

	<!-- Paper slices for wave effect -->
	<!-- Single gradient background is inherited by all slices - ensures seamless appearance -->
	<div class="paper-container" class:wave-active={waveActive}>
		{#each slices as slice (slice.index)}
			<div class="paper-slice" style={slice.style}></div>
		{/each}
	</div>
</div>

<style>
	@layer component {
		.paper-roll {
			/* Layout tokens */
			--paper-roll-base-size: 10vmin;
			--paper-roll-width: calc(var(--paper-roll-base-size) * 1.5);
			--paper-roll-height: calc(var(--paper-roll-base-size) * 1.5);
			--paper-roll-offset-top: 4vmin;
			--paper-roll-offset-left: 2vmin;
			--paper-roll-available-height: calc(100% - var(--paper-roll-offset-top) * 2);
			--paper-roll-cylinder-width: 2vmin;
			--paper-roll-cylinder-cap-height: 0.4vmin;
			--paper-roll-line-width: 0.2vmin;

			/* Positioning */
			--paper-roll-paper-offset: calc(var(--paper-roll-cylinder-width) * 0.2);
			--paper-roll-paper-rolled-width: calc(var(--paper-roll-cylinder-width) * 0.8);
			--paper-roll-lines-offset: calc(var(--paper-roll-cylinder-width) * 0.5);

			/* Motion */
			--paper-roll-unroll-max-width: 20vmin;
			--paper-roll-unroll-width-step: 0.5vmin;
			--paper-roll-wave-base: 0%;
			--paper-roll-wave-small: 2%;
			--paper-roll-wave-medium: 4%;
			--paper-roll-wave-large: 6%;
			--paper-roll-unroll: 0;
			--paper-roll-slice-count: 14;
			--paper-roll-slice-delay: 80ms;

			/* Colour system */
			--paper-roll-paper-bg: #f5e6d3;
			--paper-roll-paper-highlight: #f9eddd;
			--paper-roll-paper-line: #8b7355;
			--paper-roll-cylinder-base: #8b7355;
			--paper-roll-cylinder-dark: #5a4d3a;
			--paper-roll-cylinder-darker: #6b5d47;
			--paper-roll-cylinder-light: #9d8363;
			--paper-roll-cylinder-cap-dark: #4a3f32;
			--paper-roll-cylinder-cap-darker: #2a2419;

			/* Shadows */
			--paper-roll-shadow-inset-dark: inset -0.2vmin 0 0.4vmin rgba(0, 0, 0, 0.5);
			--paper-roll-shadow-inset-light: inset 0.2vmin 0 0.4vmin rgba(255, 255, 255, 0.15);
			--paper-roll-shadow-cylinder: 0 0.1vmin 0.2vmin rgba(0, 0, 0, 0.4);
			--paper-roll-shadow-cylinder-glow: 0 0 0.5vmin rgba(0, 0, 0, 0.2);
			--paper-roll-shadow-cap: 0 0 0.2vmin rgba(0, 0, 0, 0.3);

			/* Layering */
			--paper-roll-z-cylinder: 1;
			--paper-roll-z-paper: 2;
			--paper-roll-z-lines: 3;

			position: relative;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--paper-roll-width);
			height: var(--paper-roll-height);
			box-sizing: border-box;
			cursor: pointer;
			user-select: none;
		}

		.cylinder {
			position: absolute;
			left: var(--paper-roll-offset-left);
			top: var(--paper-roll-offset-top);
			width: var(--paper-roll-cylinder-width);
			height: var(--paper-roll-available-height);
			background: linear-gradient(
				to right,
				var(--paper-roll-cylinder-dark) 0%,
				var(--paper-roll-cylinder-darker) 20%,
				var(--paper-roll-cylinder-base) 40%,
				var(--paper-roll-cylinder-light) 50%,
				var(--paper-roll-cylinder-base) 60%,
				var(--paper-roll-cylinder-darker) 80%,
				var(--paper-roll-cylinder-dark) 100%
			);
			border-radius: calc(var(--paper-roll-cylinder-width) / 2);
			box-shadow:
				var(--paper-roll-shadow-inset-dark),
				var(--paper-roll-shadow-inset-light),
				var(--paper-roll-shadow-cylinder),
				var(--paper-roll-shadow-cylinder-glow);
			z-index: var(--paper-roll-z-cylinder);
			pointer-events: none;
		}

		.cylinder::before,
		.cylinder::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: var(--paper-roll-cylinder-cap-height);
			background: radial-gradient(
				ellipse at center,
				var(--paper-roll-cylinder-base) 0%,
				var(--paper-roll-cylinder-darker) 40%,
				var(--paper-roll-cylinder-cap-dark) 80%,
				var(--paper-roll-cylinder-cap-darker) 100%
			);
			border-radius: 50%;
			box-shadow: var(--paper-roll-shadow-cap);
			z-index: var(--paper-roll-z-paper);
		}

		.cylinder::after {
			top: auto;
			bottom: 0;
		}

		.paper-container {
			position: absolute;
			left: calc(var(--paper-roll-offset-left) + var(--paper-roll-paper-offset));
			top: var(--paper-roll-offset-top);
			width: calc(
				var(--paper-roll-paper-rolled-width) +
				var(--paper-roll-unroll, 0) * var(--paper-roll-unroll-max-width)
			);
			height: var(--paper-roll-available-height);
			transform: translateY(calc(var(--paper-roll-unroll, 0) * -0.2vmin));
			transform-style: preserve-3d;
			perspective: 1000px;
			pointer-events: none;
			z-index: var(--paper-roll-z-paper);
			background: linear-gradient(
				to right,
				var(--paper-roll-paper-bg) 0%,
				var(--paper-roll-paper-highlight) 50%,
				var(--paper-roll-paper-bg) 100%
			);
			background-size: 100% 100%;
			background-position: 0 0;
			will-change: transform, width;
		}

		.paper-slice {
			position: absolute;
			left: calc((100% / var(--paper-roll-slice-count)) * var(--slice-index) - 1px);
			width: calc(100% / var(--paper-roll-slice-count));
			height: 100%;
			background-image: inherit;
			background-repeat: no-repeat;
			background-size: calc(100% * var(--paper-roll-slice-count) + var(--paper-roll-slice-count) * 1px) 100%;
			background-position-x: calc(
				var(--slice-index) * calc(-100% / var(--paper-roll-slice-count)) * var(--paper-roll-slice-count) /
					(var(--paper-roll-slice-count) - 1) + 1px
			);
			transform-style: preserve-3d;
			transform-origin: 0 0;
			box-shadow: calc(var(--paper-roll-unroll, 0) * 0.4vmin)
				calc(var(--paper-roll-unroll, 0) * 0.3vmin)
				calc(var(--paper-roll-unroll, 0) * 0.8vmin)
				rgba(0, 0, 0, calc(var(--paper-roll-unroll, 0) * 0.15));
			clip-path: polygon(
				var(
					--paper-roll-clip-shape,
					0% 0%,
					calc(100% - var(--paper-roll-unroll, 0) * 1% - var(--paper-roll-wave-small)) 0%,
					calc(100% - var(--paper-roll-unroll, 0) * 2% - var(--paper-roll-wave-large)) 8%,
					calc(100% - var(--paper-roll-unroll, 0) * 1.5% - var(--paper-roll-wave-medium)) 16%,
					calc(100% - var(--paper-roll-unroll, 0) * 1% - var(--paper-roll-wave-small)) 24%,
					calc(100% - var(--paper-roll-unroll, 0) * 2.5% - var(--paper-roll-wave-large)) 32%,
					calc(100% - var(--paper-roll-unroll, 0) * 1.5% - var(--paper-roll-wave-medium)) 42%,
					calc(100% - var(--paper-roll-unroll, 0) * 2% - var(--paper-roll-wave-large)) 52%,
					calc(100% - var(--paper-roll-unroll, 0) * 1% - var(--paper-roll-wave-small)) 62%,
					calc(100% - var(--paper-roll-unroll, 0) * 2% - var(--paper-roll-wave-medium)) 72%,
					calc(100% - var(--paper-roll-unroll, 0) * 2.5% - var(--paper-roll-wave-large)) 82%,
					calc(100% - var(--paper-roll-unroll, 0) * 1.5% - var(--paper-roll-wave-small)) 92%,
					calc(100% - var(--paper-roll-unroll, 0) * 1% - var(--paper-roll-wave-medium)) 100%,
					0% 100%
				)
			);
			will-change: transform;
		}

		.paper-slice::after {
			content: '';
			position: absolute;
			inset: 0;
			opacity: var(--paper-roll-unroll, 0);
			background: repeating-linear-gradient(
				to bottom,
				transparent,
				transparent 6%,
				rgba(0, 0, 0, 0.08) 6%,
				rgba(0, 0, 0, 0.08) 7%
			);
			mix-blend-mode: multiply;
			pointer-events: none;
		}

		.wave-active .paper-slice {
			animation: flag-wave 2s ease-in-out infinite alternate;
			animation-delay: calc(var(--slice-index) * var(--paper-roll-slice-delay));
		}

		@keyframes flag-wave {
			0% {
				transform: rotateY(15deg) rotateX(2deg) translateZ(0.3vmin);
			}
			50% {
				transform: rotateY(-5deg) rotateX(-3deg) translateZ(-0.2vmin);
			}
			100% {
				transform: rotateY(-10deg) rotateX(2deg) translateZ(0.5vmin);
			}
		}

		@media (prefers-reduced-motion: reduce) {
			.paper-container,
			.wave-active .paper-slice {
				animation: none;
				transform: none;
			}
		}
	}
</style>
