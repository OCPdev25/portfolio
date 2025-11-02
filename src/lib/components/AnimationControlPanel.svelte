<script lang="ts">
	import Bun from '$lib/icons/Bun.svelte';

	let animationDuration = $state(400);

	function handleDurationChange(event: Event) {
		const target = event.target as HTMLInputElement;
		animationDuration = parseInt(target.value, 10);
	}
</script>

<div class="animation-control-panel">
	<div class="mb-4 rounded-lg bg-gray-800 p-4">
		<h2 class="mb-3 text-lg font-semibold text-white">Animation Control Panel</h2>
		<div class="flex flex-col gap-4">
			<div>
				<label for="duration-slider" class="mb-2 block text-sm text-gray-300">
					Animation Duration: <span class="font-mono text-white">{animationDuration}ms</span>
				</label>
				<input
					id="duration-slider"
					type="range"
					min="100"
					max="1000"
					step="50"
					value={animationDuration}
					oninput={handleDurationChange}
					class="w-full accent-blue-500"
				/>
				<div class="mt-1 flex justify-between text-xs text-gray-400">
					<span>100ms</span>
					<span>1000ms</span>
				</div>
			</div>
			<div class="rounded bg-gray-700 p-4">
				<p class="mb-2 text-sm text-gray-300">Preview:</p>
				<div class="flex items-center justify-center">
					<Bun {animationDuration} class="h-16 w-16" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.animation-control-panel {
		margin-bottom: 2rem;
	}
</style>
