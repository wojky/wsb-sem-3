import { For, Show, createComputed } from "solid-js";
import { Title } from "solid-start";
import { useCart } from "~/cart/cart";
import Price from "~/components/Price";

export default function Cart() {
  const { cart, remove } = useCart();
  const cartValue = () => cart().value;

  return (
    <main>
      <Title>Cart</Title>
      <p>
        Koszyk! Cena: <Price price={cartValue} />
      </p>

      <For each={cart().items}>
        {(record) => (
          <p>
            {record.item.name} <Price price={() => record.item.price} /> x{record.count}{" "}
            <button onClick={() => remove(record.item.id)}>🗑</button>
          </p>
        )}
      </For>

      <Show when={cart().items.length} fallback={""}>
        <button>Order it!</button>
      </Show>
    </main>
  );
}
