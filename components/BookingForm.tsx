'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { useBookingStore, type BookingFormData } from '@/store/bookingStore';
import {
  ROOM_LABELS,
  MAX_GUESTS,
  type RoomType,
  type Hotel,
} from '@/lib/constants';
import {
  calculateNights,
  calculatePrice,
  formatCurrency,
  getTodayString,
  getTomorrowString,
} from '@/lib/utils';

const guestOptions = Array.from({ length: MAX_GUESTS }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i === 0 ? 'Guest' : 'Guests'}`,
}));

interface FormErrors {
  guestName?: string;
  email?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

interface BookingFormProps {
  hotel: Hotel;
  onClose: () => void;
  initialRoomType?: RoomType;
}

export function BookingForm({ hotel, onClose, initialRoomType }: BookingFormProps) {
  const router = useRouter();
  const { addBooking } = useBookingStore();

  const defaultRoomType = initialRoomType || hotel.roomTypes[0]?.type || 'standard';

  const [formData, setFormData] = useState<Omit<BookingFormData, 'hotelId' | 'hotelName' | 'pricePerNight'>>({
    guestName: '',
    email: '',
    phone: '',
    roomType: defaultRoomType,
    checkInDate: getTodayString(),
    checkOutDate: getTomorrowString(),
    guests: 1,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const roomOptions = useMemo(() =>
    hotel.roomTypes.map((room) => ({
      value: room.type,
      label: `${ROOM_LABELS[room.type]} - ${formatCurrency(room.price)}/night`,
    })),
    [hotel.roomTypes]
  );

  const selectedRoom = hotel.roomTypes.find((r) => r.type === formData.roomType);
  const pricePerNight = selectedRoom?.price || 0;
  const nights = calculateNights(formData.checkInDate, formData.checkOutDate);
  const totalPrice = calculatePrice(pricePerNight, nights);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    } else if (nights < 1) {
      newErrors.checkOutDate = 'Check-out must be after check-in';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    addBooking({
      ...formData,
      hotelId: hotel.id,
      hotelName: hotel.name,
      pricePerNight,
      roomType: formData.roomType as RoomType,
      totalPrice,
    });

    onClose();
    router.push('/bookings');
  };

  type FormDataFields = Omit<BookingFormData, 'hotelId' | 'hotelName' | 'pricePerNight'>;

  const updateField = <K extends keyof FormDataFields>(
    field: K,
    value: FormDataFields[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckInChange = (newCheckInDate: string) => {
    setFormData((prev) => {
      const updates: Partial<typeof prev> = { checkInDate: newCheckInDate };

      // If new check-in date is >= current check-out date, adjust check-out to next day
      if (newCheckInDate >= prev.checkOutDate) {
        const nextDay = new Date(newCheckInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        updates.checkOutDate = nextDay.toISOString().split('T')[0];
      }

      return { ...prev, ...updates };
    });

    if (errors.checkInDate) {
      setErrors((prev) => ({ ...prev, checkInDate: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Guest Name"
        placeholder="John Doe"
        value={formData.guestName}
        onChange={(e) => updateField('guestName', e.target.value)}
        error={errors.guestName}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label="Phone (Optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Room Type"
          options={roomOptions}
          value={formData.roomType}
          onChange={(e) => updateField('roomType', e.target.value as RoomType)}
        />
        <Select
          label="Guests"
          options={guestOptions}
          value={String(formData.guests)}
          onChange={(e) => updateField('guests', Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Check-in Date"
          type="date"
          value={formData.checkInDate}
          min={getTodayString()}
          onChange={(e) => handleCheckInChange(e.target.value)}
          error={errors.checkInDate}
          required
        />
        <Input
          label="Check-out Date"
          type="date"
          value={formData.checkOutDate}
          min={formData.checkInDate || getTodayString()}
          onChange={(e) => updateField('checkOutDate', e.target.value)}
          error={errors.checkOutDate}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Special Requests (Optional)
        </label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-gray-400 resize-none"
          rows={3}
          placeholder="Any special requests or preferences..."
          value={formData.specialRequests}
          onChange={(e) => updateField('specialRequests', e.target.value)}
        />
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 space-y-2 border border-primary/10">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {ROOM_LABELS[formData.roomType as RoomType]} x {nights}{' '}
            {nights === 1 ? 'night' : 'nights'}
          </span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200/50">
          <span>Total</span>
          <span className="text-accent">{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={nights < 1}>
          Create Booking
        </Button>
      </div>
    </form>
  );
}
