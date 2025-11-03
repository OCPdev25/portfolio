<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const sayHiLinks = [
		{ name: 'LinkedIn', url: 'https://linkedin.com' },
		{ name: 'GitHub', url: 'https://github.com' },
		{ name: 'Email', url: 'mailto:your.email@example.com' },
		{ name: 'Resume', url: '#' }
	];
</script>

<footer
	class="border-t border-foreground/10 bg-background px-4 py-16 transition-opacity duration-1000 {mounted
		? 'opacity-100'
		: 'opacity-0'}"
>
	<div class="mx-auto max-w-6xl">
		<!-- Top Section: Quote Left, Say Hi Right -->
		<div class="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-start">
			<!-- Quote Section - Left -->
			<div class="text-left">
				<p class="font-serif text-2xl text-foreground italic md:text-3xl">
					To build something, is to
					<br />
					<span class="text-foreground/90">believe in the future.</span>
				</p>
			</div>

			<!-- SAY HI - Right -->
			<div class="text-right md:text-left">
				<h3 class="mb-4 text-xs font-semibold tracking-wider text-foreground/60 uppercase">
					Say Hi
				</h3>
				<div class="flex flex-col gap-2">
					{#each sayHiLinks as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group flex items-center justify-end gap-2 text-sm tracking-wide text-foreground/80 uppercase transition-colors hover:text-foreground md:justify-start"
						>
							<span>{link.name}</span>
							<svg
								class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
					{/each}
					<!-- Scroll to Top -->
					<button
						onclick={scrollToTop}
						class="group mt-4 flex items-center justify-end gap-2 text-sm tracking-wide text-foreground/80 uppercase transition-colors hover:text-foreground md:justify-start"
					>
						<span>Back to top</span>
						<svg
							class="h-3 w-3 transition-transform group-hover:-translate-y-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 10l7-7m0 0l7 7m-7-7v18"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Personal Touch -->
		<div class="text-center">
			<p class="text-xs tracking-wider text-foreground/60 uppercase">
				Made with <span class="text-foreground/80">❤️</span> and lots of coffee
			</p>
		</div>
	</div>
</footer>

<style>
</style>
