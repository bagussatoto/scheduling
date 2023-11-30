import { h } from 'preact';
import style from './style';

import cx from '../../cx';

export default function Card({ children, className, ...props }) {
  const classes = cx(style.card, className);
  return (
    <div class={classes} {...props}>
      {children}
    </div>
  )
}
