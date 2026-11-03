import { Children, type ReactNode, cloneElement, isValidElement } from 'react';

type Props = { children: ReactNode };

export default function Group({ children }: Props) {
  return (
    <div role="group">
      {Children.map(children, child =>
        isValidElement<{ className?: string }>(child)
          ? cloneElement(child, { className: 'item' })
          : child
      )}
    </div>
  );
}
