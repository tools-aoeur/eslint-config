import { useState } from 'react';
import { type Item, items } from './util';

type Props = { label: string; onSelect: (item: Item) => void };

export default function Clean({ label, onSelect }: Props) {
  const [selected, setSelected] = useState<Item>();

  function onClick(item: Item) {
    setSelected(item);
    onSelect(item);
  }

  return (
    <ul aria-label={label}>
      {items.map(item => (
        <li key={item.id}>
          <button
            aria-pressed={selected?.id === item.id}
            onClick={() => onClick(item)}
            type="button"
          >
            {item.id}
          </button>
        </li>
      ))}
    </ul>
  );
}
