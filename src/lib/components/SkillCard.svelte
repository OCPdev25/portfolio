<script lang="ts">
	let { skill, IconComponent } = $props();
</script>

<div class="flex items-center gap-2 rounded border border-gray-700 bg-[#1a1a1a] px-4 py-2">
	<IconComponent class="h-5 w-5" />
	<span class="text-sm text-white">{skill}</span>
</div>
