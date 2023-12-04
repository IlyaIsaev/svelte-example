<script lang="ts">
  import type { Coffee } from '$shared/types/Coffee';
  import Badge from '$shared/ui-kit/badge.svelte';
  import Image from '$shared/ui-kit/image.svelte';

  export let coffee: Coffee | undefined = undefined;

  let maxCardWidth = 300;
</script>

<div class="card" style="--max-card-width: {maxCardWidth}px">
  {#if coffee}
    <div class="image">
      <Image
        src={coffee.imgSrc}
        uid={coffee.uid}
        maxWidth={maxCardWidth}
        maxHeight={maxCardWidth}
      />
    </div>

    <div class="sub_header">
      <span>
        {coffee.origin}
      </span>
      <span>
        {coffee.variety}
      </span>
    </div>
    <div class="title">
      {coffee.blendName}
    </div>
    <div class="sub_title">
      {coffee.intensifier}
    </div>

    <div class="footer">
      <div class="badge_list">
        {#each coffee.notes as note}
          <Badge>{note}</Badge>
        {/each}
      </div>
    </div>
  {:else}
    <div class="image">
      <Image maxWidth={maxCardWidth} maxHeight={maxCardWidth} />
    </div>
    <div class="sub_header _loading"></div>
    <div class="title _loading"></div>
    <div class="sub_title _loading"></div>
    <div class="footer">
      <div class="badge_list _loading">
        <Badge>&nbsp;</Badge>
      </div>
    </div>
  {/if}
</div>

<style>
  .card {
    width: 100%;

    @media screen and (min-width: 992px) {
      & {
        max-width: var(--max-card-width);
      }
    }
  }

  .image {
    display: flex;
    justify-content: center;
    width: 100%;
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

  .badge_list {
    display: flex;
    gap: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    &._loading > * {
      visibility: hidden;
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
