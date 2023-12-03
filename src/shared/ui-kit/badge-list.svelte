<div class="badge_list">
	<slot />
</div>

<style>
	.badge_list {
		display: flex;
		gap: 1rem;
		overflow-y: auto;

		&::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}
	}
</style>
