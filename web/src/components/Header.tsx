import { A } from 'solid-start';
import CartCounter from './CartCounter';
import { useAuth } from '~/auth/auth';
import { Show } from 'solid-js';

export default function Header() {
  const { isAuth, logout } = useAuth();
  return (
    <>
      <Show
        when={isAuth()}
        fallback={
          <A test-id="header-login-btn" href="/login">
            Log in
          </A>
        }
      >
        <button
          test-id="header-logout-btn"
          onClick={() => {
            logout();
          }}
        >
          Hi Kamil, Logout
        </button>
      </Show>
      <A href="/about">About</A>
      <A href="/menu">Menu</A>
      <A href="/cart">Cart</A>
      <CartCounter />
    </>
  );
}
