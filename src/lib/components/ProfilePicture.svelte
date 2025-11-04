<script lang="ts">
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
</script>

<div class="profile-picture-outer {sizeClasses[size]}">
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
		</div>
	</div>
</div>
