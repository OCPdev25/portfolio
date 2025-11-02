import type { Component } from 'svelte';

const iconModules = import.meta.glob('./*.svelte', { eager: true });

export const icons: Array<{
	name: string;
	component: Component;
}> = Object.entries(iconModules).map(([path, module]) => ({
	name: path.replace('./', '').replace('.svelte', ''),
	component: (module as { default: Component }).default
}));

// Priority languages that should appear first, in this order
const priorityLanguages = ['Typescript', 'React', 'Expo', 'Javascript', 'Nextjs', 'Svelte', 'SQL', 'Python' ];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function getOrderedIcons(): Array<{
	name: string;
	component: Component;
}> {
	const priorityIcons: Array<{ name: string; component: Component }> = [];
	const remainingIcons: Array<{ name: string; component: Component }> = [];

	// Separate icons into priority and remaining groups
	for (const icon of icons) {
		if (priorityLanguages.includes(icon.name)) {
			priorityIcons.push(icon);
		} else {
			remainingIcons.push(icon);
		}
	}

	// Sort priority icons by the order defined in priorityLanguages array
	const sortedPriorityIcons = priorityLanguages
		.map((lang) => priorityIcons.find((icon) => icon.name === lang))
		.filter((icon): icon is { name: string; component: Component } => icon !== undefined);

	// Randomize remaining icons
	const randomizedRemaining = shuffleArray(remainingIcons);

	// Return priority first, then randomized rest
	return [...sortedPriorityIcons, ...randomizedRemaining];
}
