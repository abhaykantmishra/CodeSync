"use client";

import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { useState } from 'react';
import { BorderBeam } from '@/components/magicui/border-beam';
import authService from '@/appwrite/auth_service';
import { useRouter } from 'next/navigation';
import jwt from "jsonwebtoken";

export default function SignupPage() {
  
  const router = useRouter();

  const [formInput , setFormInput] = useState({
      name:"",
      email:"",
      password:"",
  })

  const handleSignup = async (e) => {
      e.preventDefault();
      console.log("Sining Up..")
      // console.log(formInput);
      const response = await authService.createAccount(formInput);
      // console.log("creayedUser : " ,response);
      // logging In user
      const loggedInUser = await authService.loginUser({email:formInput.email , password:formInput.password});
      // console.log("loggedInUser : ", loggedInUser);
      try {
        const userId = loggedInUser.$id;
        const token = jwt.sign({userId:userId} , process.env.NEXT_PUBLIC_TOKEN_SECRET , {expiresIn:"2d"});
        console.log(token)
        if(typeof window !== undefined){
          localStorage.setItem("accessToken" , token);
        }
        document.cookie = `accessToken=${token}; path=/; max-age=172800`;
        router.push('/home');
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='flex-grow flex-col justify-center items-center h-[90vh] mx-4 md:mx-0 '>
      <div className=" flex items-center justify-center h-full my-auto overflow-hidden ">
        <Card className= "border-none rounded-md relative overflow-hidden max-w-[450px] bg-gradient-to-br from-sky-800 via-sky-400 to-sky-800  dark:bg-gradient-to-br dark:from-gray-800 dark:via-purple-900 dark:to-gray-800 items-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Welcome to CMS</CardTitle>
            <CardDescription className="text-gray-200">
              Signup to CMS if you can because we don't have a Signup flow
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSignup}>
                <div className="space-y-2 my-4">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                    </label>
                    <Input
                        // name="email"
                        id="name"
                        placeholder="Full Name"
                        type="text"
                        className="bg-sky-400 dark:bg-black"
                        onChange={(e) => { setFormInput((prev) => ({ ...prev, name: e.target.value }));   }}
                    />
                </div>
                <div className="space-y-2 my-4">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email Address
                </label>
                <Input
                    // name="email"
                    id="email"
                    placeholder="example@email.com"
                    type="email"
                    className="bg-sky-400 dark:bg-black"
                    onChange={(e) => { setFormInput((prev) => ({ ...prev, email: e.target.value }));   }}
                />
                </div>
                <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                </label>
                <Input
                    // name="password"
                    id="password"
                    type="password"
                    className="bg-sky-400 dark:bg-black"
                    placeholder="password"
                    onChange={(e) => { setFormInput((prev) => ({ ...prev, password: e.target.value })) }}
                />
                </div>
                <Button type="submit" className="w-full mt-4 bg-white text-black hover:bg-gray-200">
                    Signup →
                </Button>
            </form>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Link href={'/login'}
                className='text-sm font-normal text-gray-300 dark:text-blue-500 text-center underline'
              >
                <p className='mt-2'>Already have an Account? Login</p>
              </Link>
            </div>
          </CardContent>

          {/* Beam  */}
          <BorderBeam size={250} borderWidthBig={2} colorFrom='red' colorTo='red' duration={8} delay={5} />
        </Card> 
      </div>
    </div>
  )
}

