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
import jwt from "jsonwebtoken"
import { useToast } from '@/hooks/use-toast';
import { description } from '@/components/ui/areachart';
// import { cookies } from 'next/headers';

export default function LoginPage(){
   
  const router = useRouter();
  const { toast } = useToast();

  const [formInput , setFormInput] = useState({
      email:"",
      password:"",
  })
  const [isSubmitting , setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
      e.preventDefault();
      console.log("Logging In..")
      setIsSubmitting(true);
      // creating login session =>
      let response = {};
      try {
        response = await authService.loginUser(formInput);
      } catch (error) {
        console.log(error);
        toast({
          variant:"red",
          description:error.message
        })
        return
      }
      // generating access token =>
      try {
        const userId = response.userId;
        const token = jwt.sign({userId:userId} , process.env.NEXT_PUBLIC_TOKEN_SECRET , {expiresIn:"1d"});
        if(typeof window !== undefined){
          localStorage.setItem("accessToken" , token);
        }
        // setting token in cookie =>
        document.cookie = `accessToken=${token}; path=/; max-age=172800`;
        setIsSubmitting(false)
        router.push(`/dashboard/${userId}`);
      } catch (error) {
        console.log(error)
        toast({
          variant:"red",
          description:error.message
        })
        setIsSubmitting(false);
        return ;
      }
  }
  
  return (
    <div className='flex-grow flex-col justify-center items-center h-[90vh] mx-4 md:mx-0 '>
      <div className=" flex items-center justify-center w-full h-full my-auto overflow-hidden ">
      <Card className= "border-none relative overflow-hidden w-[400px] max-w-[800px] bg-gradient-to-br from-sky-800 via-sky-400 to-sky-800  dark:bg-gradient-to-br dark:from-gray-800 dark:via-purple-900 dark:to-gray-800 items-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Welcome Back to CMS</CardTitle>
          <CardDescription className="text-gray-200">
            Login to CMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
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
              <Button type="submit" className="w-full mt-7 bg-white text-black hover:bg-gray-200">
              Login →
              </Button>
          </form>
          <div className="space-y-2">
            {/* <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button> */}
            <Link className='text-sm font-normal text-gray-300 dark:text-blue-500 text-center underline' href={'/signup'}>
              <p className='mt-2'>Don&apos;t have an Account? Signup</p>
            </Link>
          </div>
        </CardContent>

        <BorderBeam size={250} borderWidthBig={2} colorFrom='red' colorTo='red' duration={8} delay={5} />
      </Card> 
      
      </div>
    </div>
  )
}