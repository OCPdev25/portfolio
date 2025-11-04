<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		skill: string;
		IconComponent: Component;
		variant?: string;
	}

	let { skill, IconComponent, variant = '4' }: Props = $props();
</script>

<div
	class="flex items-center gap-3 rounded bg-card-background/30 py-1.5 pr-4 pl-3 shadow-skill-main hover:shadow-[0_4px_20px_rgba(255,255,255,0.5)]"
>
	<IconComponent class="h-8 w-12 shrink-0" />
	<span class="text-sm whitespace-nowrap text-white">{skill}</span>
</div>
