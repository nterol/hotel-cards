import s from '@/styles/header.module.css';
import { api } from '@/utils/api';

import { StaycationLogo } from '../logo';

export function Header() {
  const { data: user } = api.user.getUserByID.useQuery({ id: 1 });

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <StaycationLogo classname={s.logo} />
        {user ? <p className={s.header__user}>{user ? `Welcome, ${user?.first_name}` : null}</p> : null}
      </nav>
    </header>
  );
}
