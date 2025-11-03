export type BunAnimationState =
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
		animationState: BunAnimationState;
	};
	handleHover: () => Promise<void>;
	handleMouseLeave: () => void;
}

export class BunAnimation {
	// Reactive state properties using $state rune
	isHovered = $state(false);
	isPeeking = $state(false);
	isBlinking = $state(false);
	animationState = $state<BunAnimationState>('idle');

	// Configuration properties
	private animationDuration: number;
	private suspensionTime: number;

	constructor(animationDuration = 600, suspensionTime = 500) {
		this.animationDuration = animationDuration;
		this.suspensionTime = suspensionTime;
	}

	// Accessor for state (for backward compatibility)
	get state() {
		return {
			isHovered: this.isHovered,
			isPeeking: this.isPeeking,
			isBlinking: this.isBlinking,
			animationState: this.animationState
		};
	}

	// Public methods
	async handleHover(): Promise<void> {
		if (this.animationState !== 'idle') return;

		this.isHovered = true;

		// 1. Initial blink
		this.animationState = 'initial-blink';
		await this.blink(100);
		if (!this.isHovered) return;

		// 2. Peek up
		this.animationState = 'peeking';
		this.isPeeking = true;
		await new Promise((resolve) => setTimeout(resolve, this.animationDuration));
		if (!this.isHovered) return;

		// 3. Suspended peek (peek-a-boo moment)
		this.animationState = 'suspended';
		await new Promise((resolve) => setTimeout(resolve, this.suspensionTime));
		if (!this.isHovered) return;

		// 4. Blink while suspended (excessive blinking)
		this.animationState = 'blinking-suspended';
		await this.excessiveBlinkOnSuspension(5, 60);
		if (!this.isHovered) return;

		// 5. Descend back to original position
		this.animationState = 'descending';
		this.isPeeking = false;
		await new Promise((resolve) => setTimeout(resolve, this.animationDuration));
		if (!this.isHovered) return;

		// 6. Final blink
		this.animationState = 'final-blink';
		await this.blink(100);

		// Reset
		this.animationState = 'idle';
		this.isBlinking = false;
	}

	handleMouseLeave(): void {
		this.isHovered = false;
		// Graceful exit - allow current animation to complete if possible
		setTimeout(() => {
			if (!this.isHovered) {
				this.animationState = 'idle';
				this.isPeeking = false;
				this.isBlinking = false;
			}
		}, this.animationDuration);
	}

	// Private helper methods
	private async blink(duration = 100): Promise<void> {
		this.isBlinking = true;
		await new Promise((resolve) => setTimeout(resolve, duration));
		this.isBlinking = false;
		await new Promise((resolve) => setTimeout(resolve, duration));
	}

	private async excessiveBlinkOnSuspension(blinkCount = 4, blinkDuration = 80): Promise<void> {
		for (let i = 0; i < blinkCount; i++) {
			this.isBlinking = true;
			await new Promise((resolve) => setTimeout(resolve, blinkDuration));
			this.isBlinking = false;
			await new Promise((resolve) => setTimeout(resolve, blinkDuration));
		}
	}
}
