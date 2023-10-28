import { Title } from "solid-start";
import { useNavigate } from "solid-start/router";

export default function Home() {
  const to = useNavigate();

  to("/menu");

  return (
    <main>
      <Title>Pizzeria</Title>
    </main>
  );
}
