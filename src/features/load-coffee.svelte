<script lang="ts">
  import { getRandomCoffee } from '$shared/api/get-random-coffee';
  import { createEventDispatcher, onMount } from 'svelte';

  const LOAD_COFFEE_TIMEOUT = 30000;

  const dispath = createEventDispatcher();

  let disableLoadCoffee: boolean = true;

  let timeout: NodeJS.Timeout;

  const getCoffee = () => {
    disableLoadCoffee = true;

    dispath(
      'coffeeLoad',
      getRandomCoffee().finally(() => {
        disableLoadCoffee = false;
      })
    );

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

<button class="load_coffee_button" on:click={getCoffee} disabled={disableLoadCoffee}> load </button>

<style>
  .load_coffee_button {
    padding: 0.5rem;
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }
</style>
