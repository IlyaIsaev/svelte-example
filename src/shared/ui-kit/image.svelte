<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string | undefined = undefined;

  export let uid: string | undefined = undefined;

  let showPlaceholder: boolean = true;

  let image: HTMLImageElement | undefined;

  const handleLoad = () => {
    showPlaceholder = false;
  };

  onMount(() => {
    showPlaceholder = !image?.complete;
  });
</script>

<div class="image" class:_loading={showPlaceholder}>
  {#if src !== undefined}
    <img
      src={`${src}${uid ? `?${uid}` : ''}`}
      alt="coffee"
      bind:this={image}
      on:load={handleLoad}
    />
  {/if}
</div>

<style>
  .image {
    margin: 0 0 1rem;
    font-size: 0;

    &._loading {
      width: 300px;
      min-height: 300px;
    }

    & > img {
      max-width: 100%;
    }
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
