import s from '@/styles/gallery.module.css';

type Props = {
  children: React.ReactNode;
};

export function Gallery({ children }: Props) {
  return <section className={s.container}>{children}</section>;
}
