<script lang="ts">
  import type { PageData } from './$types';
  import Coffee from '$widgets/coffee.svelte';

  export let data: PageData;
</script>

<svelte:head>
	<title>Coffee list</title>
</svelte:head>

<Coffee serverLoadedCoffee={data.coffee} />
