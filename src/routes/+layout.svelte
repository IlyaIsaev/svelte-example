<div class="wrap">
  <slot />
</div>

<style>
  @import 'normalize.css';

  :global(*) {
    box-sizing: border-box;
  }

  :global(html),
  :global(body) {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
</style>
