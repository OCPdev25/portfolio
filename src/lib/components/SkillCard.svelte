<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		skill: string;
		IconComponent: Component;
		variant?: string;
	}

	let { skill, IconComponent, variant = '4' }: Props = $props();
</script>

<div class="flex items-center gap-3 rounded bg-background py-1.5 pr-4 pl-3 shadow-skill-main">
	<IconComponent class="h-4 w-4 shrink-0" />
	<span class="text-sm whitespace-nowrap text-white">{skill}</span>
</div>
