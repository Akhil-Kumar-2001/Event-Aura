import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../service/axiosInstance'
import { useEventStore } from './eventStore'
import { useAttendeeStore } from './attendeeStore'

interface User {
  email: string
  id: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  email: string | null
  name: string | null
  user: User | null
  accessToken: string | null
  role: 'attendee' | 'organizer' | null
  setAuth: (auth: boolean, userData?: { user: User; accessToken: string; role: 'attendee' | 'organizer' }) => void
  logout: () => Promise<boolean> // Modified to return Promise<boolean> for success status
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: null,
      name: null,
      user: null,
      accessToken: null,
      role: null,

      setAuth: (auth, userData) => {
        if (auth && userData) {
          set({
            isAuthenticated: true,
            email: userData.user.email,
            name: userData.user.name,
            user: userData.user,
            accessToken: userData.accessToken,
            role: userData.role
          })
        } else {
          set({ isAuthenticated: false })
        }
      },

      logout: async () => {
        try {
          const response = await apiClient.post('/auth/logout')
          if (response.data.success) {
            set({
              isAuthenticated: false,
              email: null,
              name: null,
              user: null,
              accessToken: null,
              role: null
            })
            useEventStore.getState().clearEvents()
            useAttendeeStore.getState().clearAttendees()
            return true 
          }
          return false 
        } catch (error) {
          console.error('Logout API call failed:', error)
          return false 
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
)