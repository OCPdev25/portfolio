<script lang="ts">
	import { onMount } from 'svelte';
	import { getOrderedIcons } from '$lib/icons/orderedIcons.svelte';
	import SkillCard from '$lib/components/SkillCard.svelte';
	import AnimationControlPanel from '$lib/components/AnimationControlPanel.svelte';

	// Randomize on each component mount (page load/navigation)
	let orderedIcons = $state<Array<{ name: string; component: any }>>([]);

	onMount(() => {
		orderedIcons = getOrderedIcons();
	});
</script>

<!-- default skills -->
<div>
	<h1 class="mb-4 text-4xl font-bold">Skills</h1>
	<AnimationControlPanel />
	<div class="flex flex-wrap gap-2">
		{#key orderedIcons.map((i) => i.name).join(',')}
			{#each orderedIcons as icon (icon.name)}
				<SkillCard skill={icon.name} IconComponent={icon.component} variant="1" />
			{/each}
		{/key}
	</div>
</div>
