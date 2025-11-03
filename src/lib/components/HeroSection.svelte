<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section id="home" class="section-padding mx-auto max-w-xl px-4">
	<div
		class="hero-legal-pad mx-auto rounded-lg bg-card-background p-10 transition-opacity duration-1000 md:p-16 {mounted
			? 'opacity-100'
			: 'opacity-0'}"
		style="transition-delay: 200ms"
	>
		<h1 class="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
			<span class="text-foreground">I ship products</span>
			<br />
			<span class="text-foreground">that users love.</span>
		</h1>

		<div class="space-y-4 text-lg leading-relaxed text-foreground/90 md:text-xl">
			<p>i design things.</p>
			<p>i think there should be fewer, but better applications.</p>
			<p>i think quality over quantity matters.</p>
			<p>i think clean code and thoughtful design create exceptional experiences.</p>
		</div>

		<p class="mt-8 text-sm text-foreground/60 md:text-base">* Less, but better.</p>
	</div>
</section>
