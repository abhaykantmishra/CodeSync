"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Mail, GraduationCap, Code, MessageCircle } from "lucide-react"
import { useRouter } from 'next/navigation'

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

export default function EditProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = ()=> {
    const newErrors = {};

    if (!profile.basicInfo.name.trim()) {
      newErrors.basicInfo = { ...newErrors.basicInfo, name: "Name is required" };
    }
    if (!profile.basicInfo.email.trim() || !/^\S+@\S+\.\S+$/.test(profile.basicInfo.email)) {
      newErrors.basicInfo = { ...newErrors.basicInfo, email: "Valid email is required" };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Profile updated:", profile);
      // Here you would typically send the data to your backend
      router.push('/profile');
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
                      value={profile.basicInfo.name}
                      onChange={(e) => handleChange('basicInfo', 'name', e.target.value)}
                      className="mt-1"
                    />
                    {errors.basicInfo?.name && <p className="text-red-500 text-sm mt-1">{errors.basicInfo.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.basicInfo.email}
                      onChange={(e) => handleChange('basicInfo', 'email', e.target.value)}
                      className="mt-1"
                    />
                    {errors.basicInfo?.email && <p className="text-red-500 text-sm mt-1">{errors.basicInfo.email}</p>}
                  </div>
                </div>
              </div>

              <Separator />

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
                      value={profile.educationInfo.college}
                      onChange={(e) => handleChange('educationInfo', 'college', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={profile.educationInfo.graduationYear}
                      onChange={(e) => handleChange('educationInfo', 'graduationYear', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-yellow-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-700 dark:text-yellow-300">
                  <Code className="h-5 w-5 mr-2" />
                  Coding Platforms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(profile.platformInfo).map(([platform, handle]) => (
                    <div key={platform}>
                      <Label htmlFor={platform}>{platform}</Label>
                      <Input
                        id={platform}
                        value={handle}
                        onChange={(e) => handleChange('platformInfo', platform, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-purple-50 dark:bg-transparent p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-700 dark:text-purple-300">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Social Handles
                </h3>
                <div className="space-y-4">
                  {Object.entries(profile.socialHandles).map(([platform, handle]) => (
                    <div key={platform}>
                      <Label htmlFor={platform}>{platform}</Label>
                      <Input
                        id={platform}
                        value={handle}
                        onChange={(e) => handleChange('socialHandles', platform, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
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