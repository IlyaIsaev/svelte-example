import { getRandomCoffee } from '$shared/api/get-random-coffee';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const coffee = await getRandomCoffee(fetch);

	return {
		coffee
	};
};
