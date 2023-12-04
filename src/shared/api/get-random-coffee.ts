import type { Coffee } from '$shared/types/Coffee';

export const getRandomCoffee = async (load?: typeof fetch): Promise<Coffee> => {
  const res = await (load || fetch)('https://random-data-api.com/api/coffee/random_coffee');

  const coffee = await res.json();

  return {
    ...coffee,
    blendName: coffee.blend_name,
    notes: coffee.notes.split(','),
    imgSrc: 'https://loremflickr.com/500/500/coffee_bean'
  };
};
