import { For, Show, createResource } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { useCart } from '~/cart/cart';
import Price from '~/components/Price';

export type MenuPosition = {
  id: number;
  type: 'VEGAN';
  name: string;
  ingredients: string[];
  price: number;
};

export function routeData() {
  const [menu] = createResource(async () => {
    const response = await fetch('http://localhost:3001/meals');
    return (await response.json()) as MenuPosition[];
  });

  return { menu };
}

type MenuDTORequest = typeof routeData;

export default function Menu() {
  const { menu } = useRouteData<MenuDTORequest>();

  const cartCtx = useCart();

  return (
    <main>
      <Title>Menu</Title>
      <p>Menu</p>

      <Show when={menu()} fallback={<p>Wczytuje listę dań...</p>}>
        <ol>
          <For each={menu()}>
            {(item, index) => (
              <li class="flex flex-col md:flex-row">
                <p>
                  {index() + 1}. {item.name} {item.type === 'VEGAN' ? '🍃' : ''}
                </p>
                <p class="text-xs">({item.ingredients.join(', ')})</p>
                <Price price={() => item.price} />
                <button
                  onClick={() => {
                    cartCtx.add(item);
                  }}
                >
                  Mniam! Biorę!
                </button>
                {index() === menu()!.length - 1 ? null : <hr />}
              </li>
            )}
          </For>
        </ol>
      </Show>
    </main>
  );
}
