<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	let formStatus = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	onMount(() => {
		mounted = true;
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		formStatus = 'submitting';

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// In a real app, you would send this to your backend
		console.log('Form submitted:', formData);
		formStatus = 'success';
		formData = { name: '', email: '', message: '' };

		setTimeout(() => {
			formStatus = 'idle';
		}, 3000);
	}

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com',
			icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		},
		{
			name: 'Email',
			url: 'mailto:your.email@example.com',
			icon: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
		}
	];
</script>

<section id="contact" class="section-padding mx-auto max-w-4xl px-4 py-20">
	<div
		class="transition-opacity duration-1000 {mounted ? 'opacity-100' : 'opacity-0'}"
		style="transition-delay: 500ms"
	>
		<h2 class="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h2>
		<p class="mb-12 text-lg text-foreground/80">
			I'm always open to discussing new opportunities and interesting projects. Feel free to reach
			out!
		</p>

		<div class="grid gap-12 md:grid-cols-2">
			<!-- Contact Form -->
			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-foreground"> Name </label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						required
						class="w-full rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground/50 focus:ring-2 focus:ring-foreground/20 focus:outline-none"
						placeholder="Your name"
					/>
				</div>
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-foreground"> Email </label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						required
						class="w-full rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground/50 focus:ring-2 focus:ring-foreground/20 focus:outline-none"
						placeholder="your.email@example.com"
					/>
				</div>
				<div>
					<label for="message" class="mb-2 block text-sm font-medium text-foreground">
						Message
					</label>
					<textarea
						id="message"
						bind:value={formData.message}
						required
						rows="6"
						class="w-full rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-foreground/50 focus:ring-2 focus:ring-foreground/20 focus:outline-none"
						placeholder="Your message..."
					></textarea>
				</div>
				<button
					type="submit"
					disabled={formStatus === 'submitting'}
					class="w-full rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{formStatus === 'submitting'
						? 'Sending...'
						: formStatus === 'success'
							? 'Message Sent!'
							: 'Send Message'}
				</button>
			</form>

			<!-- Social Links -->
			<div>
				<h3 class="mb-6 text-xl font-semibold">Connect With Me</h3>
				<div class="space-y-4">
					{#each socialLinks as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-4 rounded-lg bg-card-background p-4 shadow-card transition-all hover:shadow-card-hover"
						>
							<svg
								class="h-6 w-6 shrink-0 text-foreground"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d={link.icon} />
							</svg>
							<span class="font-medium text-foreground">{link.name}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
