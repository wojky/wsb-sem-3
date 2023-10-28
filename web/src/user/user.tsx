import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { MenuPosition } from "~/routes/menu";

type UserContextValue = {
  setUser(user: User): void;
  user: Accessor<UserState> | null;
  setFavorites(favs: MenuPosition[]): void;
};

const UserContext = createContext({} as UserContextValue);

export type UserState = (User & { favorites: MenuPosition[] }) | null;
export type User = { id: number; name: string };

export type UserDTO = User[];

export function UserProvider(props: { children: any }) {
  const [user, setUser] = createSignal<UserState | null>(null);

  const service: UserContextValue = {
    setUser(u: User) {
      setUser((user) => {
        return user
          ? {
              ...user,
              ...u,
            }
          : { ...u, favorites: [] };
      });
    },
    user,
    setFavorites(favs: MenuPosition[]) {
      if (!user) {
        throw new Error("Cant set favs if no user logged in");
      }

      setUser((user) => {
        return {
          ...user!,
          favorites: favs,
        };
      });
    },
  };

  return <UserContext.Provider value={service}>{props.children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
