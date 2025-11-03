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
			title: 'E-Commerce Platform',
			description:
				'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'Task Management App',
			description:
				'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
			techStack: ['Svelte', 'TypeScript', 'Drizzle ORM', 'SQLite'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'API Gateway Service',
			description:
				'A scalable API gateway with authentication, rate limiting, and request routing for microservices architecture.',
			techStack: ['Express', 'Redis', 'Docker', 'Kubernetes'],
			githubUrl: 'https://github.com',
			liveUrl: 'https://example.com'
		},
		{
			title: 'Real-Time Chat Application',
			description:
				'A modern chat application with WebSocket support, file sharing, and end-to-end encryption for secure messaging.',
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
		<h2 class="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
		<p class="mb-12 text-lg text-foreground/80">
			A selection of projects showcasing my full-stack development expertise
		</p>
		<div class="grid gap-6 md:grid-cols-2">
			{#each featuredProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
