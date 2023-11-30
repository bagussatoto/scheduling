import { h } from 'preact';
import style from './style.css';

import Spacer from '../spacer'
import Button from '../button'
import cx from '../../cx';
import { route } from 'preact-router';
import isLoggedIn from '../../signals'
import { useEffect } from 'preact/hooks';

export default function Header() {
  const classes = cx(style.header_container,
    !isLoggedIn.value && style.center,
  )
  useEffect(() => {
    const mail = localStorage.getItem('email');
    isLoggedIn.value = mail ? JSON.parse(!!mail) : false;
  }, [localStorage.getItem('email')])
  const logout = () => {
    isLoggedIn.value = false;
    localStorage.setItem('email', '')
    route('/');
  }
  return (
    <header
      class={style.header}
    >
      <div class={classes}>
        <h1 data-cy="header-title" style="font-size: 2rem;">GetJadwal</h1>
        {(isLoggedIn.value) && (
          <>
            <Spacer />
            <Button onClick={logout} data-cy="btn-logout">Check out | {localStorage.getItem('email').replaceAll('"', '')}</Button>
          </>
        )} 
      </div>
    </header>
  )
}
