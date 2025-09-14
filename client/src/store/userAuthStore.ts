
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { apiClient } from '../service/axiosInstance'

// interface User {
//   email: string
//   id: string
//   name: string 
// }

// interface AuthState {
//   isAuthenticated: boolean
//   email: string | null
//   name: string | null 
//   user: User | null
//   accessToken: string | null
//   role: 'attendee' | 'organizer' | null
//   setAuth: (auth: boolean, userData?: { user: User; accessToken: string; role: 'attendee' | 'organizer' }) => void
//   logout: () => void
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       isAuthenticated: false,
//       email: null,
//       name: null, // Added name field initialization
//       user: null,
//       accessToken: null,
//       role: null,
      
//       setAuth: (auth, userData) => {
//         if (auth && userData) {
//           set({
//             isAuthenticated: true,
//             email: userData.user.email,
//             name: userData.user.name, // Added name field setting
//             user: userData.user,
//             accessToken: userData.accessToken,
//             role: userData.role
//           })
//         } else {
//           set({ isAuthenticated: false })
//         }
//       },

//       logout: async () => {
//         try {
//           await apiClient.post('/logout')
//         } catch (error) {
//           console.error('Logout API call failed:', error)
//         }

//         set({ 
//           isAuthenticated: false, 
//           email: null,
//           name: null, // Added name field reset
//           user: null, 
//           accessToken: null,
//           role: null 
//         })
//       },
//     }),
//     {
//       name: 'auth-store', 
//     }
//   )
// )







import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../service/axiosInstance'

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
          console.log("=======",response.data)
          if (response.data.success) {
            set({ 
              isAuthenticated: false, 
              email: null,
              name: null,
              user: null, 
              accessToken: null,
              role: null 
            })
            return true // Indicate successful logout
          }
          return false // Indicate failed logout
        } catch (error) {
          console.error('Logout API call failed:', error)
          return false // Indicate failed logout
        }
      },
    }),
    {
      name: 'auth-store', 
    }
  )
)