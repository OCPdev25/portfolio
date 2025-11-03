<script lang="ts">
	import { onMount } from 'svelte';

	let currentSection = $state('home');

	function scrollToSection(sectionId: string) {
		currentSection = sectionId;
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onMount(() => {
		const handleScroll = () => {
			const sections = ['home', 'about', 'projects', 'contact'];
			const scrollPosition = window.scrollY + 100;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const top = element.offsetTop;
					const bottom = top + element.offsetHeight;
					if (scrollPosition >= top && scrollPosition < bottom) {
						currentSection = section;
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Work' },
		{ id: 'contact', label: 'Contact' }
	];
</script>

<nav class="mx-auto mb-8 flex max-w-4xl justify-center px-4 pt-8">
	<div class="flex gap-2">
		{#each navItems as item}
			<button
				onclick={() => scrollToSection(item.id)}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-all {currentSection === item.id
					? 'bg-card-background text-foreground shadow-card'
					: 'text-foreground/60 hover:bg-card-background/50 hover:text-foreground'}"
			>
				{item.label}
			</button>
		{/each}
	</div>
</nav>
