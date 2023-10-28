import { useCart } from "~/cart/cart";

export default function CartCounter() {
  const { cart } = useCart();

  return <span>({cart().items.reduce((total, { count }) => total + count, 0)})</span>;
}
