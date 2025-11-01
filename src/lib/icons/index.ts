import type { Component } from 'svelte';

const iconModules = import.meta.glob('./*.svelte', { eager: true });

export const icons: Array<{
	name: string;
	component: Component;
}> = Object.entries(iconModules).map(([path, module]) => ({
	name: path.replace('./', '').replace('.svelte', ''),
	component: (module as { default: Component }).default
}));
