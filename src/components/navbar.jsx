'use client'

// lg:hidden md:hidden flex

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import ShimmerButton from './magicui/shimmer-button'
import { Home, Route, Moon, Sun, User, Code, MessageCircleMore, LogOut } from 'lucide-react'

import jwt from "jsonwebtoken";
import authService from '@/appwrite/auth_service'

export function Navbar({children , loginState=false}) {

  const router = useRouter()
  const location = usePathname();
  const [id , setId] = useState("");

  const activeClassname = `text-blue-500`;
  const isActive = (name) => {
    // console.log(name);
    if(name === location){
      return true;
    }
    else{
      return false;
    }
  }

  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark')
  }

  const handleLogout = async () => {
    // Implement your logout logic here
    console.log('Logging out...')
    const logoutuser = await authService.logoutUser();
    // console.log(logoutuser);
    if(typeof window != undefined){
      localStorage.clear();
      router.push('//')
    }
  }

  useEffect(() => {
  let userId;
  if(typeof window !== undefined){
    const token = localStorage.getItem("accessToken")
    if(token){
      const decodedToken = jwt.verify(token , process.env.NEXT_PUBLIC_TOKEN_SECRET);
      userId = decodedToken.userId;
      setId(userId);
    }
  }
  },[])

  return (
    <div className='flex flex-col w-full justify-center items-center'>

    <nav className={`w-full max-w-6xl 2xl:max-w-7xl flex items-center justify-between my-2 mx-1`}>

      <div className="LEFT flex items-center md:space-x-4 sm:space-x-2">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        {
          loginState === true ? (
            <>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/dashboard/${id}`}>
                <Code className={ (isActive(`/dashboard/`))=== true ? (`${activeClassname}`) : (``)} />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/roadmap">
                <Route className={ (isActive("/roadmap"))=== true ? (`${activeClassname}`) : (``)} />
                <span className="sr-only">Roadmap</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/discuss">
                <MessageCircleMore className={ (isActive("/discuss"))=== true ? (`${activeClassname}`) : (``)} />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            </>
          ) : (
            <></>
          )
        }
      </div>

      {/* <div className="MIDDLE flex items-center md:space-x-4 sm:space-x-2">
        <Button variant="ghost" size="icon"
          onClick={() => {if(isLoggedIn){setLoggedIn(false)} else{setLoggedIn(true)} }}
        >
          <Home />
        </Button>
      </div> */}

      <div className="RIGHT flex items-center md:space-x-4 sm:space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
        {
          loginState === true ? (
            <>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/profile/${id}`}>
                <User className={ (isActive(`/profile/${id}`))=== true ? (`${activeClassname}`) : (``)} />
                <span className="bg-black dark:bg-white sr-only">Go to profile</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut />
              <span className="sr-only">Logout</span>
            </Button>
            </>
          ) : (
            <>
            <ShimmerButton onClick={() => {router.push("/signup")}} className="shadow-2xl px-4 py-[9px] rounded-sm mx-1">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                Register
              </span>
            </ShimmerButton>

            <ShimmerButton onClick={() => {router.push("/login")}} className="shadow-2xl px-4 py-[9px] rounded-sm mx-1">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
                Login
              </span>
            </ShimmerButton>

            </>
          )
        }
       
      </div>

    </nav>

    <div className='w-full'>
      <hr />
      {children}
    </div>
    
    </div>
  )
}