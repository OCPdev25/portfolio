type AnimationState =
	| 'idle'
	| 'initial-blink'
	| 'peeking'
	| 'suspended'
	| 'blinking-suspended'
	| 'descending'
	| 'final-blink';

export interface BunAnimationReturn {
	state: {
		isHovered: boolean;
		isPeeking: boolean;
		isBlinking: boolean;
		animationState: AnimationState;
	};
	handleHover: () => Promise<void>;
	handleMouseLeave: () => void;
}

export function createBunAnimation(
	animationDuration = 600,
	suspensionTime = 500
): BunAnimationReturn {
	const state = $state({
		isHovered: false,
		isPeeking: false,
		isBlinking: false,
		animationState: 'idle' as AnimationState
	});

	async function BunBlink(duration = 100): Promise<void> {
		state.isBlinking = true;
		await new Promise((resolve) => setTimeout(resolve, duration));
		state.isBlinking = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
	}

	async function BunExcessiveBlinkOnSuspension(blinkCount = 4, blinkDuration = 80): Promise<void> {
		for (let i = 0; i < blinkCount; i++) {
			state.isBlinking = true;
			await new Promise((resolve) => setTimeout(resolve, blinkDuration));
			state.isBlinking = false;
			await new Promise((resolve) => setTimeout(resolve, blinkDuration));
		}
	}

	async function handleHover() {
		if (state.animationState !== 'idle') return;

		state.isHovered = true;

		// 1. Initial blink
		state.animationState = 'initial-blink';
		await BunBlink(100);
		if (!state.isHovered) return;

		// 2. Peek up
		state.animationState = 'peeking';
		state.isPeeking = true;
		await new Promise((resolve) => setTimeout(resolve, animationDuration));
		if (!state.isHovered) return;

		// 3. Suspended peek (peek-a-boo moment)
		state.animationState = 'suspended';
		await new Promise((resolve) => setTimeout(resolve, suspensionTime));
		if (!state.isHovered) return;

		// 4. Blink while suspended (excessive blinking)
		state.animationState = 'blinking-suspended';
		await BunExcessiveBlinkOnSuspension(5, 60);
		if (!state.isHovered) return;

		// 5. Descend back to original position
		state.animationState = 'descending';
		state.isPeeking = false;
		await new Promise((resolve) => setTimeout(resolve, animationDuration));
		if (!state.isHovered) return;

		// 6. Final blink
		state.animationState = 'final-blink';
		await BunBlink(100);

		// Reset
		state.animationState = 'idle';
		state.isBlinking = false;
	}

	function handleMouseLeave() {
		state.isHovered = false;
		// Graceful exit - allow current animation to complete if possible
		setTimeout(() => {
			if (!state.isHovered) {
				state.animationState = 'idle';
				state.isPeeking = false;
				state.isBlinking = false;
			}
		}, animationDuration);
	}

	return {
		state, // Return state object directly to maintain reactivity
		handleHover,
		handleMouseLeave
	};
}
