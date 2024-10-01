"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, GraduationCap, Code, MessageCircle, EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import dbService from '@/appwrite/db_service'
import jwt from "jsonwebtoken";

const initialProfile = {
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

const user = {
  name:"",
  email: "",
  platforms:{}
}

export default function EditProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [userData , setUserData] = useState();
  const [isPublic , setIsPublic] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const fetchCurrentUserdata = async () => {
    try {
      let currUId = "";
      if(typeof window !== undefined){
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwt.verify(accessToken , process.env.NEXT_PUBLIC_TOKEN_SECRET);
        currUId = decodedToken.userId; 
      }
      const currUserdata = await dbService.getUserData({userId : currUId});
      const data = cleanUserData(currUserdata)
      setUserData(data);
      setIsPublic(data?.isPublic);
    } catch (error) {
      console.log(error)
    }
  }

  const toggleVisibility = () => {
    setIsPublic(!isPublic)
    setUserData((prev) => ({...prev , isPublic:(!isPublic)}));
  }

  useState(() => {
    fetchCurrentUserdata()
  } , [])

  const validateForm = ()=> {
    const newErrors = {};

    if (!userData.name.trim()) {
      newErrors.basicInfo = { ...newErrors.basicInfo, name: "Name is required" };
    }
    if (!userData.email.trim() || !/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.basicInfo = { ...newErrors.basicInfo, email: "Valid email is required" };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cleanUserData = (userData) => {
    const filteredData = {};
    for (const key in userData) {
      if (!key.startsWith("$")) {
        filteredData[key] = userData[key];
      }
    }
    return filteredData;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(userData)
      try {
        const res = await dbService.updateWholeUserData({data:userData});
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      router.push(`/profile/${userData?.userId}`);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          <CardTitle className="text-2xl font-bold text-center text-blue-800 dark:text-blue-200">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-700 dark:text-blue-300">
                  <Mail className="h-5 w-5 mr-2" />
                  Basic Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userData?.name}
                      onChange={(e) => setUserData((prev) => ({...prev, name:e.target.value}))}
                      className="mt-1"
                    />
                    {errors.basicInfo?.name && <p className="text-red-500 text-sm mt-1">{errors.basicInfo.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData?.email}
                      onChange={(e) => setUserData((prev) => ({...prev, email:e.target.value}))}
                      className="mt-1"
                    />
                    {errors.basicInfo?.email && <p className="text-red-500 text-sm mt-1">{errors.basicInfo.email}</p>}
                  </div>
                  <div>
                    <div className="flex flex-wrap mt-6">
                      <div className="flex items-center space-x-2 mx-1 my-1">
                        {isPublic ? (
                          <EyeIcon className="h-5 w-5 text-primary" />
                        ) : (
                          <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                        <Label htmlFor="visibility-toggle" className="text-sm font-medium">
                          Visibility:
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mx-1 my-1">
                        <Switch
                          id="visibility-toggle"
                          checked={isPublic}
                          onCheckedChange={toggleVisibility}
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                          {isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* College  */}
              <div className="bg-green-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700 dark:text-green-300">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Educational Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="college">College</Label>
                    <Input
                      id="college"
                      value={userData?.college}
                      onChange={(e) => setUserData((prev) => ({...prev, college:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={userData?.graduationyear}
                      onChange={(e) => setUserData((prev) => ({...prev, graduationyear:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Platforms  */}
              <div className="bg-yellow-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-300">
                  <Code className="h-5 w-5 mr-2" />
                  Coding Platforms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leetcode">Leetcode</Label>
                    <Input
                      value={userData?.leetcodeusername}
                      onChange={(e) => setUserData((prev) => ({...prev, leetcodeusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="codechef">Codechef</Label>
                    <Input
                      value={userData?.codechefusername}
                      onChange={(e) => setUserData((prev) => ({...prev, codechefusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input
                      value={userData?.codeforcesusername}
                      onChange={(e) => setUserData((prev) => ({...prev, codeforcesusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="geeksforgeeks">GFG</Label>
                    <Input
                      value={userData?.geeksforgeeksusername}
                      onChange={(e) => setUserData((prev) => ({...prev, geeksforgeeksusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="codestudio">Codestudio</Label>
                    <Input
                      value={userData?.codestudiousername}
                      onChange={(e) => setUserData((prev) => ({...prev, codestudiousername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Social  */}
              <div className="bg-purple-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-700 dark:text-purple-300">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Social Handles
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="discord">Discord</Label>
                    <Input
                      value={userData?.discordusername}
                      onChange={(e) => setUserData((prev) => ({...prev, discordusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">Github</Label>
                    <Input
                      value={userData?.githubusername}
                      onChange={(e) => setUserData((prev) => ({...prev, githubusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">Linkedin</Label>
                    <Input
                      value={userData?.linkedinusername}
                      onChange={(e) => setUserData((prev) => ({...prev, linkedinusername:e.target.value}))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}