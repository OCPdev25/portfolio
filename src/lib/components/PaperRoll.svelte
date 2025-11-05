<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let { checked = $bindable(false) } = $props();
	let hovered = $state(false);

	const toggleProgress = Tween.of(() => (checked ? 1 : 0), {
		duration: 220,
		easing: cubicOut
	});

	const hoverProgress = Tween.of(() => (hovered ? 1 : 0), {
		duration: 180,
		easing: cubicOut
	});

	const progress = $derived(toggleProgress.current);
	const hoverStrength = $derived(hoverProgress.current);

	function setHover(state: boolean) {
		hovered = state;
	}
</script>

<label
	class="toggle"
	data-checked={checked}
	style={`--thumb-progress:${progress}; --hover-strength:${hoverStrength};`}
	onmouseenter={() => setHover(true)}
	onmouseleave={() => setHover(false)}
	onfocusin={() => setHover(true)}
	onfocusout={() => setHover(false)}
>
	<input
		type="checkbox"
		class="checkbox"
		role="switch"
		aria-checked={checked}
		bind:checked={checked}
	/>
	<span class="surface">
		<span class="label on" aria-hidden="true">ON</span>
		<span class="label off" aria-hidden="true">OFF</span>
		<span class="thumb" aria-hidden="true">
			<span class="highlight"></span>
		</span>
	</span>
</label>

<style>
	:root {
		--sz: 10vmin;
		--transition-time: 0.4s;
		--toggle-width: calc(var(--sz) * 4);
		--toggle-height: calc(var(--sz) * 4);
		--btn-height: calc(var(--sz) * 2);
		--thumb-width: calc(var(--sz) * 1.67);
		--thumb-height: calc(var(--sz) * 1.97);
		--thumb-padding: calc(var(--sz) * 0.28);
		--paper-roll-top: 4vmin;
		--paper-roll-left: -1.9vmin;
		--paper-roll-width: 2vmin;
		--paper-roll-line-width: 0.2vmin;
		--paper-roll-height: calc(100% - var(--paper-roll-top) * 2);
		--color-on: #9acd32;
		--color-off: #ffc;
		--color-white: #fff;
		--color-white-full: #ffff;
		--color-gray: #ccc;
		--color-gray-transparent: #ccc6;
		--color-shadow: #d3d5de80;
		--thumb-gradient: repeating-conic-gradient(
			from -90deg at 0.15vmin 90%,
			var(--color-shadow) 0 25%,
			var(--color-white-full) 0 100%
		);
		--thumb-bg-position-default: -90% 0, 5% 0, 185% 0, 0 0;
		--thumb-bg-position-checked: 150% 0, 150% 0, 285% 0, 0 0;
		--thumb-bg-size: 50% 1vmin, 50% 1vmin, 50% 1vmin, 100% 100%;
	}

	.toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--toggle-width);
		height: var(--toggle-height);
		filter: drop-shadow(-2px 2px 4px hsla(160, 23%, 97%, 0.5));
		box-sizing: border-box;
		cursor: pointer;
		user-select: none;
	}

	.toggle::before,
	.toggle::after {
		content: '';
		position: absolute;
		top: var(--paper-roll-top);
		left: var(--paper-roll-left);
		height: var(--paper-roll-height);
		pointer-events: none;
		transition: var(--transition-time);
	}

	.toggle::before {
		width: var(--paper-roll-width);
		background-color: var(--color-white);
		clip-path: polygon(0% 0%, 18% 8%, 2% 39%, 21% 80%, 2% 90%, 15% 105%, 100% 100%, 100% 0%);
	}

	.toggle::after {
		width: var(--paper-roll-line-width);
		background: repeating-linear-gradient(
			180deg,
			var(--color-gray-transparent),
			var(--color-white) calc(1px + 0.8vmin) calc(0.8vmin + 2px)
		);
	}

	.checkbox {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	.surface {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: var(--btn-height);
		padding: 0 var(--thumb-padding);
		box-sizing: border-box;
		border-radius: calc(var(--btn-height) / 2);
		background: linear-gradient(180deg, var(--color-white) 30%, var(--color-gray) 30%);
		background-repeat: no-repeat;
		background-position: 0 var(--paper-roll-top);
		background-size: 100% 200%;
		transition: background-size var(--transition-time);
		box-shadow: 0 calc(var(--hover-strength, 0) * var(--sz) * 0.1)
			calc(var(--hover-strength, 0) * var(--sz) * 0.4) 0 var(--color-shadow);
	}

	.toggle[data-checked='true'] .surface {
		background-size: 260% var(--paper-roll-height);
	}

	.checkbox:focus-visible + .surface {
		outline: 0.35vmin solid rgba(0, 0, 0, 0.2);
		outline-offset: 0.3vmin;
	}

	.label {
		position: relative;
		width: 50%;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 8vmin;
		line-height: 23.5vmin;
		text-shadow:
			0 1px 2px #0008,
			0 -2px 1px #eee;
		transform: scaleY(1.1);
		pointer-events: none;
		transition: opacity var(--transition-time);
	}

	.label.on {
		color: var(--color-on);
		text-align: left;
		opacity: calc(0.4 + 0.6 * var(--thumb-progress, 0));
	}

	.label.off {
		color: var(--color-off);
		text-align: right;
		opacity: calc(1 - 0.6 * var(--thumb-progress, 0));
		text-shadow:
			0 -2px 2px #ffffff87,
			0 1px 2px #222;
	}

	.thumb {
		position: absolute;
		top: 50%;
		left: var(--thumb-padding);
		width: var(--thumb-width);
		height: var(--thumb-height);
		display: grid;
		place-items: center;
		border-radius: 50% / 15%;
		background: var(--thumb-gradient), var(--thumb-gradient), var(--thumb-gradient);
		background-repeat: repeat-x, repeat-y, repeat-y, no-repeat;
		background-position: var(--thumb-bg-position-default);
		background-size: var(--thumb-bg-size);
		box-shadow: calc(var(--sz) * -0.35) calc(var(--sz) * 0.35) calc(var(--sz) * 30) 0 var(--color-white-full);
		transform: translate(
			calc(
				var(--thumb-progress, 0) *
					(var(--toggle-width) - var(--thumb-width) - var(--thumb-padding) * 2)
			),
			-50%
		)
			scale(calc(1 + var(--hover-strength, 0) * 0.04));
		transition: background-position var(--transition-time);
		pointer-events: none;
		z-index: 1;
	}

	.toggle[data-checked='true'] .thumb {
		background-position: var(--thumb-bg-position-checked);
	}

	.highlight {
		width: 100%;
		height: 25%;
		border-radius: 100%;
		background:
			radial-gradient(
				ellipse at 50% 50%,
				var(--color-white) 2.75vmin,
				var(--color-white) calc(2.75vmin + 2px) 100%
			),
			var(--color-shadow);
		opacity: calc(0.7 + var(--hover-strength, 0) * 0.3);
		transition: opacity var(--transition-time);
	}
</style>
