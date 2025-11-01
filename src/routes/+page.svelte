<script lang="ts">
	import { icons } from '$lib/icons';
	import SkillCard from '$lib/components/SkillCard.svelte';
</script>

<div>
	<h1 class="mb-4 text-4xl font-bold">Skills</h1>
	<div class="flex flex-wrap gap-2">
		{#each icons as { name, component }}
			<SkillCard skill={name} IconComponent={component} />
		{/each}
	</div>
</div>
