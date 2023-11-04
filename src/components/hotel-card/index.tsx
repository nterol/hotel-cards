import Image from 'next/image';

import s from '@/styles/hotel-card.module.css';
import { type RouterOutput } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { getDiscountPercent } from '@/utils/getDiscountPercent';

import { Badge } from '../badge';

type HotelCardProps = {
  hotel: RouterOutput['hotel']['getHostels'][number];
  bestOffer: {
    stock: number;
    id: number;
    sale_id: number;
    room_id: number;
    date: Date;
    price: number;
    discount_price: number;
  };
};

export function HotelCard({ hotel, bestOffer }: HotelCardProps) {
  return (
    <article className={s.card_container}>
      <Image height={389} width={1000} className={s.image} src={hotel.picture_id} alt={hotel.name} />
      <section className={s.info_holder}>
        <h1>
          {hotel.name} {hotel.stars ? Array.from({ length: hotel.stars }, () => '*') : ''}
        </h1>

        <p className={s.light_info}>{hotel.reviews ? `${hotel.reviews.average} (${hotel.reviews.total})` : null}</p>
      </section>
      <section>
        <p>{hotel.preview}</p>
      </section>
      <section className={s.info_holder}>
        <div className={s.mini_section}>
          <p className={s.important}>
            {bestOffer.discount_price}€ <span className={`${s.light_info} ${s.striked}`}>{bestOffer.price}</span>
          </p>
          <DiscountBadge startPrice={bestOffer.price} finalPrice={bestOffer.discount_price} />
        </div>

        <p className={s.important}>
          A partir du : <span className={s.light_info}>{formatDate(bestOffer.date)}</span>
        </p>
      </section>
    </article>
  );
}

function DiscountBadge({ startPrice, finalPrice }: { startPrice: number; finalPrice: number }) {
  const discount = getDiscountPercent(startPrice, finalPrice);

  return <Badge>{discount}%</Badge>;
}
