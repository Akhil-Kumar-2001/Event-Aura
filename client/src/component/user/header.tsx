import { useAuthStore } from '../../store/userAuthStore'
import { Home, Ticket } from "lucide-react"
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Header() {
  const { name, role, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const displayName = useMemo(() => {
    return name || 'User'
  }, [name])

  const displayRole = useMemo(() => {
    if (!role) return 'Role not set'
    return role.charAt(0).toUpperCase() + role.slice(1)
  }, [role])

  const handleLogout = async () => {
    const success = await logout()
    if (success) {
      toast.success('Logged out successfully!')
    } else {
      toast.error('Failed to log out. Please try again.')
    }
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-teal-600">Event Aura</Link>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="group flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-all duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-teal-100 transition-colors duration-200">
                  <Home size={16} className="group-hover:scale-110 transition-transform duration-200" />
                </div>
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/tickets"
                className="group flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-all duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-teal-100 transition-colors duration-200">
                  <Ticket size={16} className="group-hover:scale-110 transition-transform duration-200" />
                </div>
                <span className="font-medium">My Tickets</span>
              </Link>
            </nav>

            {/* Profile Section */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{displayName}</div>
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border transition-all duration-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">{displayRole}</div>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <Link
                        to="/tickets"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Tickets
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}