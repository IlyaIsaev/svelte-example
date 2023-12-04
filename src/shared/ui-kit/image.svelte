<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string | undefined = undefined;

  export let uid: string | undefined = undefined;

  export let maxWidth: number | undefined = undefined;

  export let maxHeight: number | undefined = undefined;

  let showPlaceholder: boolean = true;

  let image: HTMLImageElement | undefined;

  $: size = {
    maxWidth: `--max-width: ${maxWidth ? `${maxWidth}px` : 'auto'};`,
    maxHeight: `--max-height: ${maxHeight ? `${maxHeight}px` : 'auto'};`
  };

  const handleLoad = () => {
    showPlaceholder = false;
  };

  onMount(() => {
    showPlaceholder = !image?.complete;
  });
</script>

<div class="image" class:_loading={showPlaceholder} style="{size.maxWidth}{size.maxHeight}">
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
    max-width: var(--max-width);
    max-height: var(--max-height);

    &._loading {
      width: 100%;
      height: var(--max-height);

      @media screen and (min-width: 992px) {
        & {
          width: var(--max-width);
          height: var(--max-height);
        }
      }
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
