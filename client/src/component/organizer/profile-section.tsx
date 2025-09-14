import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
import { Button } from "../organizer/ui/button"
import { Input } from "../organizer/ui/input"
import { Label } from "../organizer/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../organizer/ui/avatar"
import { X, Edit, Wallet, LogOut } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { useAuthStore } from "../../store/userAuthStore"
import { useState } from "react"

interface ProfileSectionProps {
  onClose: () => void
}

export function ProfileSection({ onClose }: ProfileSectionProps) {
  const { logout, name, email } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const success = await logout()
      if (success) {
        onClose()
        console.log('Logged out successfully')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/professional-organizer-avatar.jpg" />
              <AvatarFallback>
                {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD'}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={name || "John Doe"} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={email || "john.doe@example.com"} />
            </div>

            <div>
              <Label htmlFor="about">About the Organizer</Label>
              <Textarea
                id="about"
                placeholder="Tell us about yourself and your event organizing experience..."
                defaultValue="Experienced event organizer with over 5 years in the industry. Specializing in corporate events, conferences, and social gatherings."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-teal-600" />
                  <span className="font-medium">Wallet Balance</span>
                </div>
                <span className="font-bold text-lg">$12,450.00</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700 bg-transparent hover:bg-red-50"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}