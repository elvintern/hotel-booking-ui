'use client';

import { HOTELS } from '@/lib/constants';
import { HotelCard } from './HotelCard';

export function HotelList() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Hotels</h2>
        <p className="text-gray-600 mt-1">Choose from our selection of hotels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOTELS.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
