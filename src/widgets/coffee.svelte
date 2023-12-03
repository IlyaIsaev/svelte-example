<script lang="ts">
	import CoffeeCard from '$entities/coffee-card.svelte';
	import { getRandomCoffee } from '$shared/api/get-random-coffee';
	import type { Coffee } from '$shared/types/Coffee';
	import { onMount } from 'svelte';

	const LOAD_COFFEE_TIMEOUT = 30000;

	export let serverLoadedCoffee: Coffee;

	let coffeeList: (Promise<Coffee> | Coffee)[] = [serverLoadedCoffee];

	let disableLoadCoffee: boolean = true;

	let timeout: NodeJS.Timeout;

	const getCoffee = () => {
		disableLoadCoffee = true;

		coffeeList = [...coffeeList, getRandomCoffee()];

		clearTimeout(timeout);

		timeout = setTimeout(() => {
			getCoffee();
		}, LOAD_COFFEE_TIMEOUT);
	};

	onMount(() => {
		disableLoadCoffee = false;

		timeout = setTimeout(() => {
			getCoffee();
		}, LOAD_COFFEE_TIMEOUT);

		return () => clearTimeout(timeout);
	});
</script>

<div class="coffee_widget">
	<div class="list">
		{#each coffeeList as coffee}
			<div class="coffee_card">
				<CoffeeCard {coffee} on:coffeeLoaded={() => (disableLoadCoffee = false)} />
			</div>
		{/each}
	</div>

	<button class="load_coffee_button" on:click={getCoffee} disabled={disableLoadCoffee}>
		load
	</button>
</div>

<style>
	.coffee_widget {
		display: flex;
		flex-direction: column;
	}

	.list {
		max-height: 100%;
		overflow-y: auto;
		margin: 0 0 1.5rem;

		&::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}
	}

	.coffee_card {
		margin: 0 0 2rem;
	}

	.load_coffee_button {
		padding: 0.5rem;
		cursor: pointer;
	}
</style>
