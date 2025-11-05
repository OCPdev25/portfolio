<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		/** External control: bind:checked to this prop to control the toggle state */
		checked?: boolean;
		/** Callback function called when toggle state changes */
		onChange?: (checked: boolean) => void;
		/** Animation duration in milliseconds */
		duration?: number;
		/** Easing function for animation */
		easing?: (t: number) => number;
	}

	let { checked = $bindable(false), onChange, duration = 500, easing = cubicOut }: Props = $props();

	let checkboxId = `paper-roll-${Math.random().toString(36).substring(2, 9)}`;

	// Tweened stores for smooth animations - easy to tweak!
	const paperOpacity = tweened(0, { duration, easing });
	const paperTransformX = tweened(-2, { duration, easing }); // in vmin units

	// Update tweened stores when checked state changes
	$effect(() => {
		paperOpacity.set(checked ? 1 : 0);
		paperTransformX.set(checked ? 0 : -2);
	});

	// Derive transform string from tweened value
	let paperTransform = $derived(`translateX(${paperTransformX}vmin)`);

	function handleCheckedChange() {
		onChange?.(checked);
	}
</script>

<div
	class="toggle"
	class:checked
	style="--paper-opacity: {$paperOpacity}; --paper-transform: {paperTransform}"
>
	<input
		type="checkbox"
		id={checkboxId}
		class="checkbox"
		role="switch"
		aria-checked={checked}
		aria-label="Toggle switch"
		bind:checked
		onchange={handleCheckedChange}
	/>
	<label for={checkboxId} class="btn">
		<span class="thumb"></span>
	</label>
</div>

<style>
	/* CSS Variables */
	:root {
		--sz: 10vmin;
		--transition: all 0.5s ease;

		/* Calculated dimensions */
		--toggle-width: calc(var(--sz) * 4);
		--toggle-height: calc(var(--sz) * 4);
		--btn-height: calc(var(--sz) * 2);
		--thumb-width: calc(var(--sz) * 1.67); /* 2 - 1/3 */
		--thumb-height: calc(var(--sz) * 1.97); /* 2 - 1/30 */

		/* Positioning offsets */
		--paper-roll-top: 4vmin;
		--paper-roll-left: -1.9vmin;
		--paper-roll-width: 2vmin;
		--paper-roll-line-width: 0.2vmin;
		--paper-roll-height: calc(100% - var(--paper-roll-top) * 2);
		--thumb-top-offset: calc(var(--sz) * 0.033); /* 1/10 - 1/15 */
		--thumb-left-offset: calc(var(--sz) / 10 + var(--sz) * -0.25); /* Combined left offset */
		--thumb-left-checked-offset: calc(var(--sz) * 0.075);

		/* Colors */
		--color-on: #9acd32;
		--color-off: #ffc;
		--color-white: #fff;
		--color-white-full: #ffff;
		--color-gray: #ccc;
		--color-gray-transparent: #ccc6;
		--color-shadow: #d3d5de80;

		/* Thumb background gradients */
		--thumb-gradient: repeating-conic-gradient(
			from -90deg at 0.15vmin 90%,
			var(--color-shadow) 0 25%,
			var(--color-white-full) 0 100%
		);

		/* Thumb background positions */
		--thumb-bg-position-default: -90% 0, 5% 0, 185% 0, 0 0;
		--thumb-bg-position-checked: 150% 0, 150% 0, 285% 0, 0 0;
		--thumb-bg-size: 50% 1vmin, 50% 1vmin, 50% 1vmin, 100% 100%;
	}

	/* Toggle Container */
	.toggle {
		position: relative;
		width: var(--toggle-width);
		height: var(--toggle-height);
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(-2px 2px 4px hsla(160, 23%, 97%, 0.5));
		box-sizing: border-box;
	}

	/* Paper Roll Effect - Left side */
	/* Controlled by Svelte tweened stores via CSS variables - smooth animations! */
	.toggle::before {
		content: '';
		position: absolute;
		top: var(--paper-roll-top);
		left: var(--paper-roll-left);
		width: var(--paper-roll-width);
		height: var(--paper-roll-height);
		background-color: var(--color-white);
		clip-path: polygon(0% 0%, 18% 8, 2% 39%, 21% 80%, 2% 90%, 15% 105%, 100% 100%, 100% 0%);
		opacity: var(--paper-opacity, 0);
		transform: var(--paper-transform, translateX(-2vmin));
		pointer-events: none;
		/* No transition needed - Svelte tweened handles it */
	}

	.toggle::after {
		content: '';
		position: absolute;
		top: var(--paper-roll-top);
		left: var(--paper-roll-left);
		width: var(--paper-roll-line-width);
		height: var(--paper-roll-height);
		background: repeating-linear-gradient(
			180deg,
			var(--color-gray-transparent),
			var(--color-white) calc(1px + 0.8vmin) calc(0.8vmin + 2px)
		);
		opacity: var(--paper-opacity, 0);
		transform: var(--paper-transform, translateX(-2vmin));
		pointer-events: none;
		/* No transition needed - Svelte tweened handles it */
	}

	/* Checkbox */
	.checkbox {
		display: none;
	}

	/* Toggle Button */
	.btn {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--toggle-width);
		height: var(--btn-height);
		background: linear-gradient(180deg, var(--color-white) 30%, var(--color-gray) 30%);
		background-size: 100% 200%;
		background-repeat: no-repeat;
		background-position: 0 var(--paper-roll-top);
		transition: var(--transition);
		box-sizing: border-box;
	}

	.checkbox:checked + .btn {
		background-size: 260% var(--paper-roll-height);
	}

	/* ON/OFF Labels */
	.btn::before,
	.btn::after {
		content: 'ON';
		position: absolute;
		width: 50%;
		color: var(--color-on);
		text-align: center;
		height: 100%;
		line-height: 23.5vmin;
		font-size: 8vmin;
		font-family: Arial, Helvetica, sans-serif;
		transform: scaleY(1.1);
		padding: 0 2vmin;
		text-shadow:
			0 1px 2px #0008,
			0 -2px 1px #eee;
		transition: var(--transition);
	}

	.btn::after {
		content: 'OFF';
		right: 0.5vmin;
		padding: 0;
		text-align: right;
		color: var(--color-off);
		text-shadow:
			0 -2px 2px #ffffff87,
			0 1px 2px #222;
	}

	/* Thumb (Toggle Handle) */
	.thumb {
		position: absolute;
		width: var(--thumb-width);
		height: var(--thumb-height);
		top: var(--thumb-top-offset);
		left: var(--thumb-left-offset);
		background: var(--thumb-gradient), var(--thumb-gradient), var(--thumb-gradient);
		border-radius: 50% / 15%;
		box-shadow: calc(var(--sz) * -0.35) calc(var(--sz) * 0.35) calc(var(--sz) * 30) 0
			var(--color-white-full);
		cursor: pointer;
		z-index: 1;
		overflow: hidden;
		background-repeat: repeat-x, repeat-y, repeat-y, no-repeat;
		background-position: var(--thumb-bg-position-default);
		background-size: var(--thumb-bg-size);
		transition: var(--transition);
	}

	.checkbox:checked + .btn .thumb {
		left: calc(100% - var(--thumb-width) - var(--sz) / 10 + var(--thumb-left-checked-offset));
		background-position: var(--thumb-bg-position-checked);
	}

	/* Thumb Highlight */
	.thumb::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 25%;
		background:
			radial-gradient(
				ellipse at 50% 50%,
				var(--color-white) 2.75vmin,
				var(--color-white) calc(2.75vmin + 2px) 100%
			),
			var(--color-shadow);
		border-radius: 100%;
		transition: var(--transition);
	}
</style>
