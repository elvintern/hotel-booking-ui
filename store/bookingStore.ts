import { BookingStatus, RoomType } from '@/lib/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone?: string;
  hotelId: string;
  hotelName: string;
  roomType: RoomType;
  pricePerNight: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequests?: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export type BookingFormData = Omit<Booking, 'id' | 'createdAt' | 'status' | 'totalPrice'>;

interface BookingStore {
  bookings: Booking[];
  isModalOpen: boolean;
  hasHydrated: boolean;

  // Actions
  addBooking: (booking: BookingFormData & { totalPrice: number }) => void;
  removeBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  openModal: () => void;
  closeModal: () => void;
  setHasHydrated: (state: boolean) => void;

  // Selectors
  getBookingById: (id: string) => Booking | undefined;
  getBookingsSortedByCheckIn: () => Booking[];
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      isModalOpen: false,
      hasHydrated: false,

      addBooking: (bookingData) => {
        const newBooking: Booking = {
          ...bookingData,
          id: crypto.randomUUID(),
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          bookings: [newBooking, ...state.bookings],
          isModalOpen: false,
        }));
      },

      removeBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }));
      },

      updateBookingStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        }));
      },

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),

      getBookingById: (id) => {
        return get().bookings.find((b) => b.id === id);
      },

      getBookingsSortedByCheckIn: () => {
        return [...get().bookings].sort(
          (a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
        );
      },
    }),
    {
      name: 'hotel-bookings',
      partialize: (state) => ({ bookings: state.bookings }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
