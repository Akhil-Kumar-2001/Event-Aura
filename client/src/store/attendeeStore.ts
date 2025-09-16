
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAttendee {
  id: string;
  name: string;
  email: string;
  event: string;
  eventId: string;
  amount: string;
  purchaseDate: string;
}

interface AttendeeState {
  attendees: IAttendee[];
  addAttendee: (attendee: IAttendee) => void;
  removeAttendee: (id: string) => void;
  clearAttendees: () => void;
}

export const useAttendeeStore = create<AttendeeState>()(
  persist(
    (set) => ({
      attendees: [],

      addAttendee: (attendee) =>
        set((state) => {
            const exists = state.attendees.some((a) => a.id === attendee.id)

            return {
            attendees: exists
                ? state.attendees.map((a) =>
                    a.id === attendee.id ? attendee : a
                )
                : [attendee, ...state.attendees],
            }
        }),

      removeAttendee: (id) =>
        set((state) => ({
          attendees: state.attendees.filter((a) => a.id !== id),
        })),

      clearAttendees: () =>
        set(() => ({
          attendees: [],
        })),
    }),
    {
      name: "attendee-store",
    }
  )
);