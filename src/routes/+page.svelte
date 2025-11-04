<script lang="ts">
	import { onMount } from 'svelte';
	import { getOrderedIcons } from '$lib/icons/orderedIcons.svelte';
	import SkillCard from '$lib/components/SkillCard.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';

	// Randomize on each component mount (page load/navigation)
	let orderedIcons = $state<Array<{ name: string; component: any }>>([]);
	let mounted = $state(false);

	onMount(() => {
		orderedIcons = getOrderedIcons();
		mounted = true;
	});
</script>

<Navigation />
<ProfilePicture />

<HeroSection />

<AboutSection />

<section id="skills" class="section-padding mx-auto max-w-6xl px-4 py-20">
	<div
		class="transition-opacity duration-1000 {mounted ? 'opacity-100' : 'opacity-0'}"
		style="transition-delay: 350ms"
	>
		<h2 class="mb-4 text-3xl font-bold md:text-4xl">I build with modern tools</h2>
		<p class="mb-8 text-lg text-foreground/80">Tech stack I ship with</p>
		<div class="flex flex-wrap gap-2">
			{#key orderedIcons.map((i) => i.name).join(',')}
				{#each orderedIcons as icon (icon.name)}
					<SkillCard skill={icon.name} IconComponent={icon.component} variant="1" />
				{/each}
			{/key}
		</div>
	</div>
</section>

<FeaturedProjects />

<ContactSection />

<Footer />
