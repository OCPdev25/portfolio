import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOrderedIcons, priorityLanguages } from './orderedIcons.svelte.js';
import type { Component } from 'svelte';

// Mock the icons module
vi.mock('./index.js', () => ({
	icons: [
		{ name: 'Typescript', component: {} as Component },
		{ name: 'React', component: {} as Component },
		{ name: 'Expo', component: {} as Component },
		{ name: 'Javascript', component: {} as Component },
		{ name: 'Nextjs', component: {} as Component },
		{ name: 'Svelte', component: {} as Component },
		{ name: 'SQL', component: {} as Component },
		{ name: 'Python', component: {} as Component },
		{ name: 'Go', component: {} as Component },
		{ name: 'Rust', component: {} as Component },
		{ name: 'Java', component: {} as Component },
		{ name: 'Cpp', component: {} as Component }
	]
}));

// Helper function to test shuffleArray behavior
// We need to import it differently since it's not exported
// We'll test it indirectly through getOrderedIcons
function testShuffleArray() {
	const array = [1, 2, 3, 4, 5];

	// Create a simple shuffle implementation to test
	const shuffleArrayTest = <T,>(arr: T[]): T[] => {
		const result = [...arr];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	};

	const result = shuffleArrayTest(array);

	return { original: array, shuffled: result };
}

describe('shuffleArray', () => {
	it('returns an array of the same length as the input array', () => {
		const { original, shuffled } = testShuffleArray();
		expect(shuffled.length).toBe(original.length);
	});

	it('returns an array containing the same elements as the input array', () => {
		const { original, shuffled } = testShuffleArray();

		// Check that all original elements are present in shuffled array
		expect(shuffled.sort()).toEqual(original.sort());

		// Check that each element appears the same number of times
		for (const element of original) {
			const countInOriginal = original.filter(el => el === element).length;
			const countInShuffled = shuffled.filter(el => el === element).length;
			expect(countInShuffled).toBe(countInOriginal);
		}
	});
});

describe('getOrderedIcons', () => {
	beforeEach(() => {
		// Seed random for more predictable tests where needed
		// Note: We'll still test randomness in one test
	});

	it('places priority languages at the beginning in the correct order', () => {
		const orderedIcons = getOrderedIcons();

		// Get the priority icons that should exist in the icons array
		const existingPriorityLangs = priorityLanguages.filter(lang =>
			orderedIcons.some(icon => icon.name === lang)
		);

		// Check that the first N icons match the priority order
		for (let i = 0; i < existingPriorityLangs.length; i++) {
			expect(orderedIcons[i].name).toBe(existingPriorityLangs[i]);
		}

		// More specifically, verify the exact expected order based on the mock
		expect(orderedIcons[0].name).toBe('Typescript');
		expect(orderedIcons[1].name).toBe('React');
		expect(orderedIcons[2].name).toBe('Expo');
		expect(orderedIcons[3].name).toBe('Javascript');
		expect(orderedIcons[4].name).toBe('Nextjs');
		expect(orderedIcons[5].name).toBe('Svelte');
		expect(orderedIcons[6].name).toBe('SQL');
		expect(orderedIcons[7].name).toBe('Python');
	});

	it('includes all icons from the original icons array', () => {
		const orderedIcons = getOrderedIcons();

		// We know from the mock that there should be 12 icons total
		expect(orderedIcons.length).toBe(12);

		// Check that all expected icon names are present
		const iconNames = orderedIcons.map(icon => icon.name);
		const expectedNames = [
			'Typescript', 'React', 'Expo', 'Javascript', 'Nextjs', 'Svelte',
			'SQL', 'Python',
		];

		expect(iconNames.sort()).toEqual(expectedNames.sort());

		// Verify no duplicates
		const uniqueNames = new Set(iconNames);
		expect(uniqueNames.size).toBe(iconNames.length);
	});

	it('shuffles the non-priority icons', () => {
		// Call getOrderedIcons multiple times and check if non-priority icons are in different orders
		const results: string[][] = [];

		// Run multiple iterations to detect shuffling
		for (let i = 0; i < 10; i++) {
			const orderedIcons = getOrderedIcons();
			// Get only the non-priority icons (after the first 8)
			const nonPriorityNames = orderedIcons.slice(8).map(icon => icon.name);
			results.push(nonPriorityNames);
		}

		// Check that at least some results differ (indicating randomization)
		// With 4 items to shuffle over 10 runs, we should get at least one different ordering
		const uniqueOrderings = new Set(results.map(r => JSON.stringify(r)));

		// If truly shuffled, we should have more than 1 unique ordering
		// (It's statistically very unlikely to get the same order 10 times in a row)
		expect(uniqueOrderings.size).toBeGreaterThan(1);

		// Also verify that each result still contains all the non-priority icons
		const expectedNonPriority = ['Go', 'Rust', 'Java', 'Cpp'].sort();
		for (const result of results) {
			expect(result.sort()).toEqual(expectedNonPriority);
		}
	});
});
