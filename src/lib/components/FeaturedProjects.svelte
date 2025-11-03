<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from './ProjectCard.svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const featuredProjects: Project[] = [
		{
			title: 'Built an e-commerce platform that processes $500K+ monthly',
			description: 'Real-time inventory • Secure payments • Admin dashboard',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'Shipped a task app used by 10K+ teams',
			description: 'Real-time collaboration • Drag-and-drop • Team features',
			techStack: ['Svelte', 'TypeScript', 'Drizzle ORM', 'SQLite'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'Scaled API gateway handling 1M+ requests/day',
			description: 'Authentication • Rate limiting • Microservices routing',
			techStack: ['Express', 'Redis', 'Docker', 'Kubernetes'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'Launched chat app with end-to-end encryption',
			description: 'WebSocket support • File sharing • Secure messaging',
			techStack: ['Next.js', 'WebSockets', 'MongoDB', 'Tailwind CSS'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		}
	];
</script>

<section id="projects" class="section-padding mx-auto max-w-6xl px-4 py-20">
	<div
		class="transition-opacity duration-1000 {mounted ? 'opacity-100' : 'opacity-0'}"
		style="transition-delay: 400ms"
	>
		<h2 class="mb-4 text-3xl font-bold md:text-4xl">Projects that shipped</h2>
		<p class="mb-12 text-lg text-foreground/80">Real products with real impact</p>
		<div class="grid gap-6 md:grid-cols-2">
			{#each featuredProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
