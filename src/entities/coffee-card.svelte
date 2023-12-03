<script lang="ts">
	import type { Coffee } from '$shared/types/Coffee';
	import BadgeList from '$shared/ui-kit/badge-list.svelte';
	import Badge from '$shared/ui-kit/badge.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispath = createEventDispatcher();

	export let coffee: Promise<Coffee> | Coffee;

	let isImageLoaded: boolean = false;

	let image: HTMLImageElement | undefined;

	onMount(async () => {
		await coffee;

		dispath('coffeeLoaded');
	});

	onMount(() => {
		isImageLoaded = Boolean(image?.complete) && !isImageLoaded;
	});
</script>

<div class="card">
	{#await coffee}
		<div class="image _loading"></div>
		<div class="sub_header _loading"></div>
		<div class="title _loading"></div>
		<div class="sub_title _loading"></div>
	{:then { uid, blendName, origin, variety, notes, intensifier }}
		<div class="image" class:_loading={!isImageLoaded}>
			<img
				src={`https://loremflickr.com/500/500/coffee_bean?${uid}`}
				alt="coffee"
				bind:this={image}
				on:load={() => (isImageLoaded = true)}
			/>
		</div>
		<div class="sub_header">
			<span>
				{origin}
			</span>
			<span>
				{variety}
			</span>
		</div>
		<div class="title">
			{blendName}
		</div>
		<div class="sub_title">
			{intensifier}
		</div>

		<div class="footer">
			<BadgeList>
				{#each notes as note}
					<Badge>{note}</Badge>
				{/each}
			</BadgeList>
		</div>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>

<style>
	:root {
		--max-width: 300px;
	}

	.card {
		width: 100%;
		max-width: var(--max-width);
	}

	.image {
		margin: 0 0 1rem;
		font-size: 0;

		&._loading {
			width: var(--max-width);
			min-height: var(--max-width);
		}

		& > img {
			max-width: 100%;
		}
	}

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0 0 0.2rem;

		&._loading {
			height: 1.5rem;
		}
	}

	.sub_header {
		font-size: 0.9rem;
		display: flex;
		justify-content: space-between;
		margin: 0 0 0.4rem;

		&._loading {
			height: 0.9rem;
		}
	}

	.sub_title {
		font-style: italic;

		&._loading {
			height: 1rem;
		}
	}

	.footer {
		margin: 1rem 0 0;
	}

	._loading {
		animation-duration: 1s;
		animation-name: loading;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		background-color: #eee;
	}

	@keyframes loading {
		from {
			background-color: #eee;
		}

		to {
			background-color: #bebebe;
		}
	}
</style>
