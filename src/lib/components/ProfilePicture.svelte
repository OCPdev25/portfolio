<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		imageSrc?: string | null;
		alt?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
	}

	let { imageSrc = null, alt = 'Profile picture', size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'w-32 h-32',
		md: 'w-48 h-48',
		lg: 'w-64 h-64',
		xl: 'w-80 h-80'
	};

	let isHovered = $state(false);
	let isBannerOpen = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	function handleDotHover() {
		isBannerOpen = true;

		// Clear existing timer if any
		if (closeTimer) {
			clearTimeout(closeTimer);
		}

		// Auto-close after 2 seconds
		closeTimer = setTimeout(() => {
			isBannerOpen = false;
			closeTimer = null;
		}, 2000);
	}

	onDestroy(() => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
	});
</script>

<div
	class="profile-picture-outer {sizeClasses[size]}"
	role="presentation"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<div class="profile-picture-container">
		<div class="profile-picture-frame">
			{#if imageSrc}
				<img src={imageSrc} {alt} class="profile-picture-image" />
			{:else}
				<div class="profile-picture-placeholder">
					<svg
						class="h-1/2 w-1/2 text-foreground/30"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</div>
			{/if}

			<!-- Green dot indicator -->
			{#if isHovered}
				<button
					type="button"
					class="collab-dot"
					onmouseenter={handleDotHover}
					aria-label="Open collaboration status"
				>
					<span class="collab-dot-pulse"></span>
				</button>
			{/if}

			<!-- Banner that slides out -->
			{#if isBannerOpen}
				<div class="collab-banner">Open to collab</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.profile-picture-outer {
		position: relative;
		display: inline-block;
	}

	.profile-picture-container {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: var(--background);
		padding: 0.75rem;
		/* Thin L-shaped border: bottom edge (full width) and left edge (full height) */
		border-bottom: 2px solid var(--foreground);
		border-left: 2px solid var(--foreground);
		border-top: none;
		border-right: none;
	}

	/* Top-right L-shaped border: top edge (right half) and right edge (full height) */
	.profile-picture-container::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: calc(50% + 2px);
		height: 100%;
		border-top: 2px solid var(--foreground);
		border-right: 2px solid var(--foreground);
		pointer-events: none;
		z-index: 1;
		box-sizing: border-box;
	}

	.profile-picture-frame {
		width: 95%;
		height: 95%;
		background-color: var(--card-background);
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Float to top-left, covering the top-left border, leaving more space on bottom and right */
		transform: translate(-0.5rem, -0.75rem);
		z-index: 2;
		box-shadow: var(--shadow-card);
	}

	.profile-picture-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		filter: grayscale(100%);
		display: block;
	}

	.profile-picture-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background);
	}

	/* Green dot collab indicator */
	@keyframes dotPulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
		}
		50% {
			opacity: 1;
			transform: scale(1.3);
			box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);
		}
	}

	@keyframes dotPulseGlow {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.5);
		}
	}

	@keyframes bannerSlideIn {
		from {
			opacity: 0;
			transform: translateX(-20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	@keyframes bannerSlideOut {
		from {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateX(-20px) scale(0.95);
		}
	}

	.collab-dot {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 10px;
		height: 10px;
		background-color: #22c55e;
		border-radius: 50%;
		border: 2px solid var(--card-background);
		z-index: 10;
		cursor: pointer;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
		animation: dotPulse 2s ease-in-out infinite;
	}

	.collab-dot-pulse {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #22c55e;
		border-radius: 50%;
		opacity: 0.6;
		animation: dotPulseGlow 2s ease-in-out infinite;
	}

	.collab-banner {
		position: absolute;
		top: 0.5rem;
		left: calc(100% - 0.5rem - 10px - 0.5rem);
		background-color: var(--card-background);
		color: var(--foreground);
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		z-index: 9;
		box-shadow: var(--shadow-card-hover);
		border: 1px solid var(--foreground);
		animation: bannerSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		transform-origin: left center;
	}

	.collab-banner.closing {
		animation: bannerSlideOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
</style>
