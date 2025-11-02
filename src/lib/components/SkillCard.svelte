<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		skill: string;
		IconComponent: Component;
		variant?: string;
	}

	let { skill, IconComponent, variant = '1' }: Props = $props();

	function getShadowClass(variant: string): string {
		switch (variant) {
			case '1':
				return 'shadow-[0_1px_2px_rgba(0,0,0,0.3)]';
			case '2':
				return 'shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]';
			case '3':
				return 'shadow-[0_2px_6px_rgba(0,0,0,0.35)]';
			case '4':
				return 'shadow-[0_1px_2px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.25)]';
			default:
				return 'shadow-[0_1px_2px_rgba(0,0,0,0.3)]';
		}
	}
</script>

<div
	class="flex items-center gap-3 rounded bg-background py-1.5 pr-4 pl-3 {getShadowClass(variant)}"
>
	<IconComponent class="h-4 w-4 shrink-0" />
	<span class="text-sm whitespace-nowrap text-white">{skill}</span>
</div>
