import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { MenuPosition } from "../routes/menu";

type CartContextValue = {
  cart: Accessor<CartState>;
  add(item: MenuPosition): void;
  remove(id: number): void;
  set(): void;
};

const CartContext = createContext({} as CartContextValue);

export type CartItem = { count: number; item: MenuPosition };

type CartState = { value: number; items: CartItem[] };

export function CartProvider(props: { children: any; state: CartState }) {
  const [cart, setCart] = createSignal<CartState>(props.state);

  const service = {
    cart,
    add(menuItem: MenuPosition) {
      setCart((cart) => {
        let alreadyExist = false;
        let items: CartState["items"] = cart.items.map((i) => {
          if (i.item.id === menuItem.id) {
            alreadyExist = true;

            return { count: i.count + 1, item: i.item };
          }

          return i;
        });

        if (!alreadyExist) {
          items.push({
            count: 1,
            item: menuItem,
          });
        }

        return {
          items,
          value: cart.value + menuItem.price,
        };
      });
    },
    remove(id: number) {
      setCart((cart) => {
        const itemToRemove = cart.items.find(({ item }) => item.id === id);

        if (!itemToRemove) return cart;

        const updatedValue = cart.value - itemToRemove.item.price;

        if (itemToRemove.count <= 1) {
          return {
            value: updatedValue,
            items: cart.items.filter(({ item }) => item.id !== id),
          };
        }

        return {
          value: updatedValue,
          items: cart.items.map((record) => {
            if (record.item.id === id) {
              return {
                count: record.count - 1,
                item: record.item,
              };
            } else {
              return record;
            }
          }),
        };
      });
    },
    set() {},
  };

  return <CartContext.Provider value={service}>{props.children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
