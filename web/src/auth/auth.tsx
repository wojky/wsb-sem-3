import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { MenuPosition } from "../routes/menu";

// autoryzacja

type AuthContextValue = {
  isAuth: () => boolean;
  login(): void;
  logout(): void;
};

const AuthContext = createContext({} as AuthContextValue);

// export type CartItem = { count: number; item: MenuPosition };

export type AuthState = { isAuth: boolean };

export function AuthProvider(props: { children: any; state: boolean }) {
  const [authState, setAuthState] = createSignal<AuthState>({ isAuth: props.state });

  const service = {
    isAuth: () => authState().isAuth,
    login() {
      setAuthState(() => ({ isAuth: true }));
    },
    logout() {
      setAuthState(() => ({ isAuth: false }));
    },
  };

  return <AuthContext.Provider value={service}>{props.children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
