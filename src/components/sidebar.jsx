'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

export function Sidebar({children}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...')
    // After logout, you might want to redirect to the login page
    // router.push('/login')
  }

  return (
    <>
    <div className={`hidden md:flex md:flex-col h-screen bg-gray-100 text-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <span className="text-2xl font-bold">Logo</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">
                <Home />
                {!isCollapsed && <span>Home</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile/123" className="flex items-center">
                <User />
                {!isCollapsed && <span>Profile</span>}
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut />
          {!isCollapsed && <span>Logout</span>}
        </Button>
        <Button>Click</Button>
      </div>
    </div>
    <div className='hidden md:flex'>
        {children}
    </div>
    </>
  )
}