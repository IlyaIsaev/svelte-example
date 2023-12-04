<script lang="ts">
  import CoffeeCard from '$entities/coffee-card.svelte';
  import type { Coffee } from '$shared/types/Coffee';
  import { afterUpdate } from 'svelte';
  import LoadCoffee from '../features/load-coffee.svelte';

  export let serverLoadedCoffee: Coffee;

  let coffeeListEl: HTMLDivElement;

  let coffeeList: Promise<Coffee>[] = [];

  const handleCoffeeLoad = (event: CustomEvent<Promise<Coffee>>) => {
    coffeeList = [...coffeeList, event.detail];
  };

  afterUpdate(() => {
    coffeeListEl.scroll({ top: coffeeListEl.scrollHeight, behavior: 'smooth' });
  });
</script>

<div class="coffee_widget">
  <div class="list" bind:this={coffeeListEl}>
    <div class="coffee_card">
      <CoffeeCard coffee={serverLoadedCoffee} />
    </div>

    {#each coffeeList as coffee}
      <div class="coffee_card">
        {#await coffee}
          <CoffeeCard />
        {:then value}
          <CoffeeCard coffee={value} />
        {:catch}
          <p>Something went wrong. Reload a page please.</p>
        {/await}
      </div>
    {/each}
  </div>

  <LoadCoffee on:coffeeLoad={handleCoffeeLoad} />
</div>

<style>
  .coffee_widget {
    display: flex;
    max-width: 100%;
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
</style>
