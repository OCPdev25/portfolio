<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const highlights = [
		{
			title: 'Full-Stack Expertise',
			description: 'Experienced in building end-to-end solutions from frontend to backend'
		},
		{
			title: 'Modern Tech Stack',
			description: 'Working with cutting-edge technologies and best practices'
		},
		{
			title: 'Clean Code',
			description: 'Committed to writing maintainable, scalable, and well-tested code'
		}
	];
</script>

<section id="about" class="section-padding mx-auto max-w-4xl px-4 py-20">
	<div
		class="transition-opacity duration-1000 {mounted ? 'opacity-100' : 'opacity-0'}"
		style="transition-delay: 300ms"
	>
		<h2 class="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
		<div class="space-y-6 text-foreground/90">
			<p class="text-lg leading-relaxed">
				I'm a passionate full-stack developer dedicated to creating exceptional digital experiences.
				With expertise spanning both frontend and backend development, I bring ideas to life through
				clean code, thoughtful design, and modern technologies.
			</p>
			<p class="text-lg leading-relaxed">
				My approach combines technical excellence with user-centered design, ensuring that every
				application I build is not only functional but also intuitive and delightful to use.
			</p>
		</div>
		<div class="mt-12 grid gap-6 md:grid-cols-3">
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
