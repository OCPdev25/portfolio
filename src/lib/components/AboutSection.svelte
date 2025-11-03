<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const highlights = [
		{
			title: 'I turn ideas into production-ready apps',
			description: 'End-to-end development from concept to deployment'
		},
		{
			title: 'I write code that scales',
			description: 'Clean, maintainable, and well-tested solutions'
		},
		{
			title: 'I design for users',
			description: 'Intuitive interfaces that people actually want to use'
		}
	];
</script>

<section id="about" class="section-padding mx-auto max-w-4xl px-4 py-20">
	<div
		class="transition-opacity duration-1000 {mounted ? 'opacity-100' : 'opacity-0'}"
		style="transition-delay: 300ms"
	>
		<h2 class="mb-12 text-3xl font-bold md:text-4xl">I turn ideas into production-ready apps</h2>
		<div class="grid gap-6 md:grid-cols-3">
			{#each highlights as highlight}
				<div
					class="rounded-lg bg-card-background p-6 shadow-card transition-all hover:shadow-card-hover"
				>
					<h3 class="mb-3 text-xl font-semibold">{highlight.title}</h3>
					<p class="text-foreground/80">{highlight.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
