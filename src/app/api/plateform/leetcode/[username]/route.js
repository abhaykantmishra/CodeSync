import { NextResponse } from "next/server";
import axios from "axios";
import conf from "@/lib/confEnv";
const url = `${conf.backendapi}/api/leetcode`


export async function GET(request){
    const pathname = String(request?.url).substring(36)
    const username = pathname.replace("leetcode/","");
    try {
        // console.log(username);
        let data;
        try {
            data = await getLeetcodeData(username);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
        
        // console.log("data:" , data);

        if(!data || !(data.username)){
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
            msg:"Something went wrong!",
            error:error
        })
    }
}

async function getLeetcodeData(username){
    if(username?.trim()){
        try {
            console.log(url,username);
            let res = {};
            try {
                res = await axios.get(`${url}/${username}`);
                console.log(res);
            } catch (error) {
                console.log(error);
                return null;
            }
            const userData = res.data;
            const topicwiseData = userData.topicwiseData.map((topic) => {
                return {topicName:topic.tagName , solvedProblem:topic.problemsSolved}
            })
            // console.log(topicwiseData)
            // console.log(userData);
            const data = {
                username:userData.username,
                rank: userData?.rank,
                maxRank: userData?.rank,
                // maxRating: ,
                activeDays: userData?.userCalender?.totalActiveDays,
                solvedProblems: {
                    easy: userData.problemsData?.submitStatsGlobal[1]?.count,
                    medium: userData.problemsData?.submitStatsGlobal[2]?.count,
                    hard: userData.problemsData?.submitStatsGlobal[3]?.count,
                },
                // contests: [
                //     { contestId: 123, contestName: 'LeetCode Weekly Contest 200', contestDate: '2023-08-12', newRating: 1600 },
                //     { contestId: 124, contestName: 'LeetCode Biweekly Contest 101', contestDate: '2023-08-26', newRating: 1550 },
                //     { contestId: 125, contestName: 'LeetCode Weekly Contest 202', contestDate: '2023-09-10', newRating: 1700 },
                // ],
                topicwiseData:topicwiseData,
            }
            return data;
        } catch (error) {
            console.log(error);
            // throw error
            return null;
        }
    }else{
        console.log("Please provide a username")
        return null
    }
}