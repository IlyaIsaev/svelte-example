<script lang="ts">
  import type { PageData } from './$types';
  import Coffee from '$widgets/coffee.svelte';

  export let data: PageData;
</script>

<Coffee serverLoadedCoffee={data.coffee} />
