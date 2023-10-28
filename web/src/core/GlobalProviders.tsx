import { AuthProvider } from "~/auth/auth";
import { CartProvider } from "~/cart/cart";

// todo: why it doesnt work
export default function GlobalProviders({ children }: { children: any }) {
  return (
    <AuthProvider state={false}>
      <CartProvider state={{ value: 0, items: [] }}>{children}</CartProvider>
    </AuthProvider>
  );
}
