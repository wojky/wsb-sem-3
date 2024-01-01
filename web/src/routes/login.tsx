import { createSignal } from 'solid-js';
import { Title, createRouteAction, redirect, useNavigate, json } from 'solid-start';
import { useAuth } from '~/auth/auth';
import { UserDTO, useUser } from '~/user/user';

async function login(username: string, password: string) {
  const response = await fetch(`http://localhost:3001/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: username,
      password,
    }),
  });
  const [user] = (await response.json()) as UserDTO;

  return user || new Error('Bad credentials');
}

export default function Login() {
  const to = useNavigate();
  const { login: setLogin, isAuth } = useAuth();

  if (isAuth()) {
    to('/menu');
  }

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal(false);

  const { setUser } = useUser();

  async function handleLogin() {
    setError(false);
    const res = await login(username(), password());

    if (res instanceof Error) {
      setError(true);
      return redirect('/');
    }

    setLogin();
    setUser({ id: res.id, name: res.name });
    to('/menu');
  }

  return (
    <main>
      <Title>Login</Title>
      <div class="mt-24 max-w-md mx-auto px-6 md:border md:border-orange-600 md:py-4 xl:text-lg xl:py-8 xl:max-w-lg xl:border-2">
        <form>
          <fieldset class="flex flex-col mb-2 md:flex-row md:justify-center">
            <label class="font-semibold md:mr-4" for="username">
              Username
            </label>
            <input
              class="border-b border-gray-400 focus:border-orange-600 text-center outline-none md:text-left"
              name="username"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset class="flex flex-col mb-2 md:flex-row md:justify-center">
            <label class="font-semibold md:mr-4" for="password">
              Password
            </label>
            <input
              class="border-b border-gray-400 focus:border-orange-600 text-center outline-none md:text-left"
              name="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <button type="button" class="mt-4" onClick={handleLogin}>
            Login
          </button>

          {error() && <p class="text-red-500">Bad username or password</p>}
        </form>
      </div>
    </main>
  );
}
