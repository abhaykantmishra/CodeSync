"use client"

import { Piechart } from "@/components/ui/piechart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Areachart, description } from "@/components/ui/areachart";
import { Barchart } from "@/components/ui/barchart";
import Heatmap from "@/components/ui/heatmap";
import dbService from "@/appwrite/db_service";
import { fetchPlatformsUserData } from "@/lib/fetchData";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


export default function Dashboard() {

  const location = usePathname();
  const { toast } = useToast()
  const userId = location.replace("/dashboard/", "")

  const [activeTab, setActiveTab] = useState("leetcode");
  const [platformsData, setPlatformsData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [noPlatformAdded, setNoPlatformAdded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false)

  const setCurrenUser = async ({ userId }) => {
    let currUId = "";
    if (typeof window !== undefined) {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwt.verify(accessToken, process.env.NEXT_PUBLIC_TOKEN_SECRET);
      currUId = String(decodedToken.userId);
    }
    if (userId.trim() == currUId.trim()) {
      setIsCurrentUser(true)
    }
  }

  const fetchUserData = async ({ currUser }) => {
    try {
      const userData = await dbService.getUserData({ userId: userId });

      setIsPublic(userData?.isPublic);
      if (!userData.leetcodeusername && !userData.codechefusername && !userData.codeforcesusername &&
        !userData.geeksforgeeksusername
      ) {
        setNoPlatformAdded(true);
        return;
      }

      if (userData?.platformData !== null) {
        const data = JSON.parse(userData.platformData);
        // persisting data in localstorage => 
        if (currUser === true) {
          const dataToken = jwt.sign(data, process.env.NEXT_PUBLIC_DATA_ENCRYPTION_SECRET);
          if (typeof window !== undefined)
            localStorage.setItem("pdata", dataToken)
        }
        setPlatformsData(data);
      }
      else if (userData.platformData === null) {
        const data = await fetchPlatformsUserData(userId);
        if (data) {
          const dataToken = jwt.sign(data, process.env.NEXT_PUBLIC_DATA_ENCRYPTION_SECRET);
          if (typeof window !== undefined) {
            localStorage.setItem("pdata", dataToken)
          }
          setPlatformsData(data);
        }
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  const refreshUserData = async () => {
    setIsRefreshing(true);
    try {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith("accessToken="));
      const accessToken = cookie.split("=")[1];

      const decodedToken = jwt.verify(accessToken , process.env.NEXT_PUBLIC_TOKEN_SECRET);
      const userId = `${decodedToken?.userId}`;

      const data = await fetchPlatformsUserData(userId);
      const dataToken = jwt.sign(data , process.env.NEXT_PUBLIC_DATA_ENCRYPTION_SECRET);
      if(typeof window !== undefined && isCurrentUser === true){
        localStorage.setItem("pdata" , dataToken)
      }
      setPlatformsData(data);
      toast({
        variant: "green",
        // title: "Uh oh! Could'nt refreshed userdata.",
        description: "User data refreshed successfully",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setIsRefreshing(false);
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Could'nt refreshed userdata.",
        description: "There was a problem with your request.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setIsRefreshing(false);
    }
  }

  // // function refreshUserData(){
  //   console.log("refreshing data..");
  //   setIsRefreshing(true)
  //   toast({
  //     variant: "destructive",
  //     title: "Uh oh! Something went wrong.",
  //     description: "There was a problem with your request.",
  //     action: <ToastAction altText="Try again">Try again</ToastAction>,
  //   })
  //   console.log("refreshed data...")
  //   setIsRefreshing(false)
  // // } 

  const extractPdata = (datatoken) => {
    try {
      const data = jwt.verify(datatoken, process.env.NEXT_PUBLIC_DATA_ENCRYPTION_SECRET);
      return data;
    } catch (error) {

    }
  }

  useEffect(() => {
    const uid = String(location.replace("/dashboard/", ""));

    setCurrenUser({ userId: uid });
    let dataToken = "";
    if (typeof window !== undefined) {
      dataToken = localStorage.getItem("pdata");
    }
    if (dataToken && isCurrentUser === true) {
      const data = extractPdata(dataToken)
      setPlatformsData(data)
    } else {
      fetchUserData({ currUser: isCurrentUser });
    }
  }, [])

  if ((noPlatformAdded === false) && (platformsData === null || platformsData === undefined)) {
    return (
      <div>
        <h1 className="text-center text-lg mt-10">Loading...</h1>
      </div>
    )
  }

  if ((!platformsData && noPlatformAdded) && (isCurrentUser === true || isPublic === true)) {
    return (
      <div>
        <h1 className="text-center text-base md:text-lg mt-10 text-red-300">Add atleast One Platform to See Dashboard</h1>
      </div>
    )
  }

  if ((!platformsData && noPlatformAdded) && (isCurrentUser === false || isPublic === false)) {
    return (
      <div>
        <h1 className="text-center text-base md:text-lg mt-10">Not a Public Account</h1>
      </div>
    )
  }

  if (isCurrentUser === false && isPublic === false) {
    return (
      <div>
        <h1 className="text-center text-base md:text-lg mt-10">Not a Public Account</h1>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">Coder Statistics</h1>
        {
          (isRefreshing === true) ? (
            <Button disabled >Refreshing..</Button>
          ) : (
            <Button onClick={refreshUserData} > Refresh </Button>
          )
        }
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="leetcode" className="hidden md:block" >LeetCode</TabsTrigger>
          <TabsTrigger value="leetcode" className="md:hidden block" >LC</TabsTrigger>
          <TabsTrigger value="codeforces" className="hidden md:block">CodeForces</TabsTrigger>
          <TabsTrigger value="codeforces" className="md:hidden block" >CF</TabsTrigger>
          <TabsTrigger value="codechef" className="hidden md:block">CodeChef</TabsTrigger>
          <TabsTrigger value="codechef" className="md:hidden block" >CC</TabsTrigger>
          <TabsTrigger value="gfg" className="hidden md:block">GFG</TabsTrigger>
          <TabsTrigger value="gfg" className="md:hidden block" >GFG</TabsTrigger>
          <TabsTrigger value="codestudio" className="hidden md:block">CodeStudio</TabsTrigger>
          <TabsTrigger value="codestudio" className="md:hidden block" >CS</TabsTrigger>
        </TabsList>
        <TabsContent value="leetcode">
          <DsaStats data={platformsData.leetcodedata} />
        </TabsContent>
        <TabsContent value="codeforces">
          <CpStats data={platformsData.codeforcesdata} />
        </TabsContent>
        <TabsContent value="codechef">
          <CpStats data={platformsData.codechefdata} />
        </TabsContent>
        <TabsContent value="gfg">
          <DsaStats data={platformsData.gfgdata} />
        </TabsContent>
        <TabsContent value="codestudio">
          <DsaStats data={platformsData.codestudiodata} />
        </TabsContent>
      </Tabs>

    </div>
  )
}

function DsaStats({ data }) {
  if (data === null || data === undefined) {
    return (
      <div>
        <h1 className="text-center">
          Add username for this platform in profile to see statistics
        </h1>
      </div>
    )
  }
  // Data for PieChart (solved problems by difficulty)
  const pieData = [
    { namekey: "easy", datakey: data?.solvedProblems?.easy, fill: "var(--color-easy)" },
    { namekey: 'Medium', datakey: data?.solvedProblems?.medium, fill: "var(--color-medium)" },
    { namekey: 'Hard', datakey: data?.solvedProblems?.hard, fill: "var(--color-hard)" },
  ]

  // Data for BarChart (problems solved over time)
  const barData = data?.problemSolvingHistory?.map((entry) => ({
    date: entry.date,
    solvedCount: entry.solvedCount,
  }));

  // Data for LineChart (rating over time)
  const lineData = data?.contests?.map((contest) => ({
    date: contest.contestDate,
    rating: contest.newRating,
  }));

  // Data for BarChart (topic wise ploblems solved)
  let topicwisedata = [];
  for (let i = 0; i < (Math.min(6, data?.topicwiseData?.length)); i++) {
    topicwisedata[i] = data?.topicwiseData[i];
  }
  let other = 0;
  for (let i = 7; i < (data?.topicwiseData?.length) - 1; i++) {
    other = other + data?.topicwiseData[i].solvedProblem;
  }

  let i = 0;
  let topicwiseData = topicwisedata?.map((topic) => {
    const arr = ["first", "second", "third", "fourth", "fifth", "sixth"]
    const color = arr[i++];
    return {
      namekey: topic.topicName, datakey: topic.solvedProblem, fill: `var(--color-${color})`
    }
  })
  topicwiseData = [...topicwiseData,
  { namekey: "Other", datakey: other, fill: "var(--color-other)" }
  ];

  const activeDaysData = [
    {
      namekey: "Active days",
      datakey: data?.activeDays,
      fill: "var(--color-total)"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">

      {/* Profile Header */}
      <div className="w-full justify-center">
        <Card >
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-6 pb-8">
            <div>
              <h2 className="text-xl font-bold">{data?.username}</h2>
              <p className="text-gray-300">{data?.rank}</p>
              <p className="text-sm text-gray-300">
                Rating: {data?.rating} | Max Rank: {data?.maxRank}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solved Problems , Active Days , Heatmap */}
      <div className="flex md:flex-row flex-col justify-start my-auto">
        <div className="w-full flex flex-col sm:flex-row md:flex-row ">
          {/* Solved Problems */}
          <div className="w-full my-2 mx-1 lg:my-0 md:mr-2">
            <Piechart chartdata={pieData} header={"Total Solved Problems"} />
          </div>
          {/* Active Days */}
          {
            (data?.activeDays) ? (
              <div className="w-full my-2 mx-1 lg:my-0 md:ml-2">
                <Piechart chartdata={activeDaysData} header={"Active days "} />
              </div>
            ) : (
              <>
              </>
            )
          }
        </div>
        {/* Problems Solved Over Time  */}
        <div className="flex mx-1 px-1 py-[8px] justify-start rounded-sm outline outline-[0.5px] outline-gray-800">
          <Heatmap />
        </div>
      </div>

      {/* Contest Rating & Topicwise Problems  */}
      <div className="flex md:flex-row flex-col justify-center my-auto">
        {/* Contest Rating Progress (Line Chart) */}
        {
          (data?.contests) ? (
            <div className="w-full md:w-1/2 md:mr-2">
              <Areachart height={300} chartdata={lineData} />
            </div>
          ) : (
            <></>
          )
        }
        {/* topic wise problems */}
        {
          (data?.topicwiseData) ? (
            <div className="w-full md:w-1/2 md:mr-2">
              <Barchart chartData={topicwiseData} height={240} />
            </div>
          ) : (<></>)
        }
      </div>

    </div>
  )
}

function CpStats({ data }) {

  if (data === null || data === undefined) {
    return (
      <div>
        <h1 className="text-center">
          Add username for this platform in profile to see statistics
        </h1>
      </div>
    )
  }

  // Data for PieChart (solved problems by difficulty)
  const pieData = [
    { namekey: "easy", datakey: data?.solvedProblems?.easy, fill: "var(--color-easy)" },
    { namekey: 'Medium', datakey: data?.solvedProblems?.medium, fill: "var(--color-medium)" },
    { namekey: 'Hard', datakey: data?.solvedProblems?.hard, fill: "var(--color-hard)" },
    { namekey: 'total', datakey: data?.solvedProblems?.total, fill: "var(--color-total)" },
  ];

  // Data for BarChart (problems solved over time)
  const barData = data?.problemSolvingHistory?.map((entry) => ({
    date: entry.date,
    solvedCount: entry.solvedCount,
  }));

  // Data for LineChart (rating over time)
  const lineData = data?.contests?.map((contest) => ({
    date: contest.contestDate,
    rating: contest.newRating,
  }));

  // Data for topicwise data (ploblem solved from different topic)
  let topicwisedata = [];
  for (let i = 0; i < (Math.min(6, data?.topicwiseData?.length)); i++) {
    topicwisedata[i] = data?.topicwiseData[i];
  }
  let other = 0;
  for (let i = 7; i < (data?.topicwiseData?.length) - 1; i++) {
    other = other + data?.topicwiseData[i].solvedProblem;
  }
  let i = 0;
  let topicwiseData = topicwisedata?.map((topic) => {
    const arr = ["first", "second", "third", "fourth", "fifth", "sixth"]
    const color = arr[i++];
    return {
      namekey: topic.topicName, datakey: topic.solvedProblem, fill: `var(--color-${color})`
    }
  })
  topicwiseData = [...topicwiseData,
  { namekey: "Other", datakey: other, fill: "var(--color-other)" }
  ];

  const activeDaysData = [
    {
      namekey: "Active days",
      datakey: data?.activeDays,
      fill: "var(--color-total)"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">

      {/* Profile Header */}
      <div className="w-full justify-center">
        <Card >
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-6 pb-8">
            <div>
              <h2 className="text-xl font-bold">{data?.username}</h2>
              <p className="text-gray-300">{data?.rank}</p>
              <p className="text-sm text-gray-300">
                Max Rating: {data?.maxRating} | Max Rank: {data?.maxRank}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solved Problems , Active Days , Heatmap */}
      <div className="flex md:flex-row flex-col justify-start my-auto">
        <div className="w-full flex flex-col sm:flex-row md:flex-row ">
          {/* Solved Problems */}
          <div className="w-full my-2 mx-1 lg:my-0 md:mr-2">
            <Piechart chartdata={pieData} header={"Total Solved Problems"} />
          </div>
          {/* Active Days */}
          {
            (data?.activeDays) ? (
              <div className="w-full my-2 mx-1 lg:my-0 md:ml-2">
                <Piechart chartdata={activeDaysData} header={"Active days "} />
              </div>
            ) : (
              <>
              </>
            )
          }
        </div>
        {/* Problems Solved Over Time  */}
        <div className="flex mx-1 px-1 py-[8px] justify-start rounded-sm outline outline-[0.5px] outline-gray-800">
          <Heatmap />
        </div>
      </div>

      {/* Contest Rating & Topicwise Problems  */}
      <div className="flex md:flex-row flex-col justify-center my-auto">
        {/* Contest Rating Progress (Line Chart) */}
        {
          (data?.contests) ? (
            <div className="w-full md:w-1/2 md:mr-2">
              <Areachart height={300} chartdata={lineData} />
            </div>
          ) : (
            <></>
          )
        }
        {/* topic wise problems */}
        {
          (data?.topicwiseData) ? (
            <div className="w-full md:w-1/2 md:mr-2">
              <Barchart chartData={topicwiseData} height={240} />
            </div>
          ) : (<></>)
        }
      </div>

    </div>
  )
}

