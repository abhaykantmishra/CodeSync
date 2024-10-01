"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, GraduationCap, Code, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dbService from "@/appwrite/db_service"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"

const userProfileData = {
  basicInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg?height=128&width=128",
  },
  educationInfo: {
    college: "Tech University",
    graduationYear: "2024",
  },
  platformInfo: {
    leetcode: "johndoe_lc",
    codechef: "johndoe_cc",
    codeforces: "johndoe_cf",
    gfg: "johndoe_gfg",
    codestudio: "johndoe_cs",
  },
  socialHandles: {
    discord: "johndoe#1234",
    linkedin: "johndoe-linkedin",
    twitter: "johndoe_tweets",
  },
};

export default function UserProfile({ profile = userProfileData }) {
  const location = usePathname();
  const userId = location.replace("/profile/","")

  const [userdata , setUserdata] = useState({});
  const [isCurrentUser , setIsCurrentUser] = useState(false);
  const [isPublic , setIsPublic] = useState(false);

  const fetchUserData = async () => {
    let currUId = "";
    if(typeof window !== undefined){
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwt.verify(accessToken , process.env.NEXT_PUBLIC_TOKEN_SECRET);
      currUId = decodedToken.userId; 
    }
    console.log(userId , currUId)
    if(userId === currUId){
      setIsCurrentUser(true)
    }
    const userData = await dbService.getUserData({userId:userId});
    console.log(userData);
    setUserdata(userData);
    setIsPublic(userData?.isPublic);
  }

  useEffect(() => {
    fetchUserData();
    console.log(userId ,isCurrentUser , isPublic )
  } , []);
  
  return (
    <>
    {
      (isPublic === false && isCurrentUser === false) ? (
        <div>
          <h1 className="text-center my-5 underline text-xl" >Profile is not public</h1>
        </div>
      ) : (
        <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          <div className="flex flex-row justify-between">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
              <AvatarImage src={userdata?.profileimg} alt={userdata?.name} />
              <AvatarFallback>{userdata?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-200">{userdata?.name}</CardTitle>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Mail className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-600 dark:text-blue-400">{userdata?.email}</span>
              </div>
            </div>
          </div>
          <div>
            { isCurrentUser=== true ? (
              <div className="pt-4">
                <Link href="/edit-profile">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Edit Profile</Button>
                </Link>
              </div>
            ) : (
              <></>
            )}
            <div className="text-sm text-blue-400 my-4">
              {
                (userdata?.isPublic === true) ? (
                  <p>Visilibity : Public</p>
                ) : (
                  <p>Visilibity : Private</p>
                )
              }
            </div>
          </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div className="bg-green-50 dark:bg-transparent p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700 dark:text-green-300">
              <GraduationCap className="h-5 w-5 mr-2" />
              Educational Info- 
            </h3>
            <p className="text-green-800 dark:text-green-200"><strong>College:</strong> {userdata?.college}</p>
            <p className="text-green-800 dark:text-green-200"><strong>Graduation Year:</strong> {userdata?.graduationyear}</p>
          </div>

          <Separator />

          <div className="bg-yellow-50 dark:bg-transparent p-4 rounded-lg">
            <div className="flex flex-row justify-between pb-2">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-300">
              <Code className="h-5 w-5 mr-2" />
              Coding Platforms
            </h3>
            { isCurrentUser === false ? (
                <div className="py-auto">
                  <Link href={`/dashboard/${userId}`} >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View</Button>
                  </Link>
                </div>
            ) : (
              <></>
            ) }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-yellow-100 dark:bg-transparent p-2 rounded-sm outline outline-[0.2px] outline-yellow-800 dark:outline-yellow-200">
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Leetcode</span>
                  <span className="ml-2 text-yellow-700 dark:text-yellow-300">{userdata?.leetcodeusername}</span>
                </div>
                <div className="bg-yellow-100 dark:bg-transparent p-2 rounded-sm outline outline-[0.2px] outline-yellow-800 dark:outline-yellow-200">
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Codechef</span>
                  <span className="ml-2 text-yellow-700 dark:text-yellow-300">{userdata?.codechefusername}</span>
                </div>
                <div className="bg-yellow-100 dark:bg-transparent p-2 rounded-sm outline outline-[0.2px] outline-yellow-800 dark:outline-yellow-200">
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Codeforces</span>
                  <span className="ml-2 text-yellow-700 dark:text-yellow-300">{userdata?.codeforcesusername}</span>
                </div>
                <div className="bg-yellow-100 dark:bg-transparent p-2 rounded-sm outline outline-[0.2px] outline-yellow-800 dark:outline-yellow-200">
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">GFG</span>
                  <span className="ml-2 text-yellow-700 dark:text-yellow-300">{userdata?.geeksforgeeksusername}</span>
                </div>
                <div className="bg-yellow-100 dark:bg-transparent p-2 rounded-sm outline outline-[0.2px] outline-yellow-800 dark:outline-yellow-200">
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Codestudio</span>
                  <span className="ml-2 text-yellow-700 dark:text-yellow-300">{userdata?.codestudiousername}</span>
                </div>
            </div>
          </div>

          <Separator />

          <div className="bg-purple-50 dark:bg-transparent p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-700 dark:text-purple-300">
              <MessageCircle className="h-5 w-5 mr-2" />
              Social Handles
            </h3>
            <div className="space-y-2">
              <p className="text-purple-800 dark:text-purple-200"><strong>Discord:</strong> {userdata?.discordusername}</p>
              <p className="text-purple-800 dark:text-purple-200"><strong>LinkedIn:</strong> {userdata?.linkedinusername}</p>
              <p className="text-purple-800 dark:text-purple-200"><strong>Github:</strong> {userdata?.githubusername}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      )
    }
    </>
  )
  
}