import axios from "axios";
import { NextResponse } from "next/server";
import conf from "@/lib/confEnv";
const url = `${conf.backendapi}/api/codechef`

export async function GET(request){
    const pathname = String(request?.url)
    // console.log("PathName: ",pathname);
    const parts = pathname.split('/')
    // console.log("Parts:",parts)
    let username = parts[parts.length - 1];
    // console.log("Username: ", username);
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

async function getCodechefData(username){
    if(username?.trim()){
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
    }else{
        console.log("Please provide codechef username!")
        return null;
    }
}