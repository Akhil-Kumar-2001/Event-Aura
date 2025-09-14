import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IEvent } from '../Types/basicTypes'

interface EventState {
  events: IEvent[]
  addEvent: (event: IEvent) => void
  setEvents: (events: IEvent[]) => void
  removeEvent: (eventId: string) => void 
}


export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],

      addEvent: (event) =>
        set((state) => ({
          events: [event, ...state.events]
        })),

      setEvents: (events) =>
        set({ events }),

      removeEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter(event => event._id !== eventId)
        })),
    }),
    {
      name: 'event-store',
    }
  )
)