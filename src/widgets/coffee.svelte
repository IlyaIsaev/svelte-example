<script lang="ts">
  import CoffeeCard from '$entities/coffee-card.svelte';
  import type { Coffee } from '$shared/types/Coffee';
  import LoadCoffee from '../features/load-coffee.svelte';

  export let serverLoadedCoffee: Coffee;

  let coffeeList: Promise<Coffee>[] = [];

  const handleCoffeeLoad = (event: CustomEvent<Promise<Coffee>>) =>
    (coffeeList = [...coffeeList, event.detail]);
</script>

<div class="coffee_widget">
  <div class="list">
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
          <p>Something went wrong. Reload page please.</p>
        {/await}
      </div>
    {/each}
  </div>

  <LoadCoffee on:coffeeLoad={handleCoffeeLoad} />
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
</style>
