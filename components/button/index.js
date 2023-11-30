import { h } from "preact";
import style from './style';

import cx from '../../cx';

export default function Button({
  children,
  className,
  color,
  ...props
}) {
  const classes = cx(style.btn,
    color === 'danger' && style.danger,
    color === 'gray' && style.gray,
    className
  );
  return (
    <button class={classes} {...props}>
      {children}
    </button>
  )
}
