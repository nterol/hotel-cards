import { useMemo } from 'react';

import { type OpeningMap } from '@/server/api/routers/openings';
import { api } from '@/utils/api';

import { Gallery } from '../gallery';
import { HotelCard } from '../hotel-card';

export function HostelList() {
  const { data: hotels } = api.hotel.getHostels.useQuery();
  const utils = api.useUtils();

  // uses the cache but won't synchronize on source data change
  // on evolution switch to useQuery to create subscription
  const openings = utils.openings.getOpenings.getData();

  // safely casting because of recursive promise return type
  const openingsMap = useMemo(() => new Map(openings ? (openings as OpeningMap) : []), [openings]);

  return (
    <Gallery>
      {hotels
        ? hotels.map((hotel) => {
            const availabilities = openingsMap.get(hotel.id);
            return availabilities?.[0] ? (
              <HotelCard key={hotel.id} hotel={hotel} bestOffer={availabilities[0]} />
            ) : null;
          })
        : null}
    </Gallery>
  );
}
