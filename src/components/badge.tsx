import s from '@/styles/badge.module.css';

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className={s.badge}>{children}</span>;
}
