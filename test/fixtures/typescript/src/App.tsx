import { useEffect, useState } from 'react';
import { Item, items } from './util';

type Props = { label: string; onClick(): void };

export default function App({ onClick, label }: Props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, []);
  const value = 'x' as string;
  const list: Item[] = items;
  return (
    <div>
      {list.map(item => (
        <span>{item.id}</span>
      ))}
      <button onClick={onClick} id={'a'} className="b" key="k">
        {label}
      </button>
      <a href="https://x.y" target="_blank">{value}</a>
      <img src="x.png" />
      <div></div>
    </div>
  );
}
