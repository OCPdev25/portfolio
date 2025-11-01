const iconModules = import.meta.glob('./*.svelte', { eager: true });

export const icons = Object.entries(iconModules).map(([path, module]) => ({
	name: path.replace('./', '').replace('.svelte', ''),
	component: (module as any).default
}));
