import { createSignal } from "solid-js";
import { Title, createRouteAction, redirect, useNavigate, json } from "solid-start";
import { useAuth } from "~/auth/auth";
import { UserDTO, useUser } from "~/user/user";

async function login(username: string, password: string) {
  const response = await fetch(
    `http://localhost:3001/users?username=${username}&password=${password}`
  );
  const [user] = (await response.json()) as UserDTO;

  return user || new Error("Bad credentials");
}

export default function Login() {
  const to = useNavigate();
  const { login: setLogin, isAuth } = useAuth();

  if (isAuth()) {
    to("/menu");
  }

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const { setUser } = useUser();

  async function handleLogin() {
    const res = await login(username(), password());

    if (res instanceof Error) {
      return redirect("/");
    }

    console.log("?", res);

    setLogin();
    setUser({ id: res.id, name: res.name });
    to("/menu");
  }

  return (
    <main>
      <Title>Login</Title>
      <div class="border border-orange-600">
        <form>
          <fieldset>
            <label for="username">Username</label>
            <input
              name="username"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
