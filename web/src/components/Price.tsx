export default function Price({ price }: { price: () => number }) {
  return <span>Cena: {`${(price() / 100).toFixed(2)} zł`}</span>;
}
