import axios from "axios";
import { NextResponse } from "next/server";
import conf from "@/lib/confEnv";
const url = `${conf.backendapi}/api/codechef`

export async function GET(request){
    const pathname = String(request?.url).substring(36)
    const username = pathname.replace("codechef/","");
    try {
        // console.log(username);
        const data = await getCodechefData(username);
        // console.log("data:" , data);
        if(!data || !(data?.username)){
            return NextResponse.json({
                success:false,
                msg:"Something went wrong!"
            })
        }

        return Response.json({
            success:true,
            data:data,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            msg:"Something went wrong!"
        })
    }
}

const user = {
    username: 'JohnDoe',
    avatar: '/images/avatar.jpg',
    rank: 'Pupil',
    maxRank: 'Expert',
    maxRating: 1800,
    activeDays:50,
    solvedProblems: {
      easy: 120,
      medium: 75,
      hard: 30,
    },
    problemSolvingHistory: [
      { date: '2023-01-01', solvedCount: 10 },
      { date: '2023-02-01', solvedCount: 15 },
      { date: '2023-03-01', solvedCount: 20 },
    ],
    contests: [
      { contestId: 123, contestName: 'LeetCode Weekly Contest 200', contestDate: '2023-08-12', newRating: 1600 },
      { contestId: 124, contestName: 'LeetCode Biweekly Contest 101', contestDate: '2023-08-26', newRating: 1550 },
      { contestId: 125, contestName: 'LeetCode Weekly Contest 202', contestDate: '2023-09-10', newRating: 1700 },
    ],
}

async function getCodechefData(username){
    try {
        const res = await axios.get(`${url}/${username}`);
        const userData = res.data
        // console.log(userData);
        const contestHistory = userData?.userInfo?.ratingGraph?.map((contest) => {
            return {
                contestId: contest.contestName,
                contestName: contest.contestName,
                contestDate: contest.date,
                newRating: contest.rating,
                rank:contest.rank,
            }
        })
        const data = {
            username:userData.userInfo?.handle,
            rank: userData?.userInfo?.title,
            rating: userData?.userInfo?.rating,
            maxRating: userData?.additionalInfo?.higestRating,
            activeDays: userData?.userCalender?.totalActiveDays,
            solvedProblems: {
                easy: 0,
                medium: 0,
                hard: 0,
                total: userData?.additionalInfo?.totalSolved,
            },
            contests: contestHistory,
        }
        return data
    } catch (error) {
        console.log(error);
        return null;
    }
}