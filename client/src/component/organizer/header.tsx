import { Avatar, AvatarFallback, AvatarImage } from "../../component/organizer/ui/avatar"

interface HeaderProps {
  onProfileClick: () => void
}

export function Header({ onProfileClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-teal-600">Event Aura</h1>

          <button onClick={onProfileClick} className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/professional-organizer-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  )
}
