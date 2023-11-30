import { h } from 'preact'
import style from './style.css';

import cx from '../../cx';

export default function Container({ className, ...props }) {
  const classes = cx(style.container, className);
  return <div class={classes} {...props} />;
}
