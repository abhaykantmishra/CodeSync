import axios from "axios";
import { NextResponse } from "next/server";
import conf from "@/lib/confEnv";
const url = `${conf.backendapi}/api/codeforces`

export async function GET(request){
    const pathname = String(request?.url).substring(36)
    let username = pathname.replace("codeforces/","");
    username = username.replace('plateform/' , "");
    try {
        // console.log(username);
        const data = await getUserCodeforcesData(username);
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

async function getUserCodeforcesData(username){
    const userName = String(username).toLowerCase();
    try {
        const res = await axios.get(`${url}/${userName}`);
        const userData = res.data;
        const contestHistory = userData?.userContestsInfo?.map((contest) => {
            return {
                contestId: contest.contestId,
                contestName: contest.contestName,
                contestDate: contest.date,
                newRating: contest.rating,
                rank:contest.rank,
            }
        })
        const data = {
            username : userData?.userInfo?.handle,
            rank: userData?.userInfo?.rank,
            rating: userData?.userInfo.rating,
            maxRating: userData?.userInfo?.maxRating,
            maxRank: userData?.userInfo?.maxRank,
            activeDays: userData?.userCalender?.totalActiveDays,
            solvedProblems: {
                easy:0,
                medium:0,
                hard:0,
                total:userData?.userInfo?.solvedProblems,
            },
            contests: contestHistory,
        }
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
} 