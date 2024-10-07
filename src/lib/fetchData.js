import axios from "axios";
import dbService from "@/appwrite/db_service";

async function fetchPlatformsUserData(userId){
    try {
        const userData = await dbService.getUserData({userId:userId});
        if(!userData){
            return null;
        }
        const leetcodeusername = (userData.leetcodeusername) 
        const codechefusername = (userData.codechefusername)
        const codeforcesusername = (userData.codeforcesusername)
        const geeksforgeeksusername = (userData.geeksforgeeksusername)

        let platformData = {};

        if(leetcodeusername !== null && leetcodeusername !== "" ){
            const leetcodedata = await axios.get(`/api/plateform/leetcode/${leetcodeusername}`);
            if(leetcodedata.data.success === true){
                platformData = { ...platformData,"leetcodedata":leetcodedata?.data?.data};
            }
        }

        if(codechefusername !== null && codechefusername !== "" ){
            const codechefdata = await axios.get(`/api/plateform/codechef/${codechefusername}`);
            if(codechefdata.data.success === true){
                platformData = { ...platformData,"codechefdata":codechefdata?.data?.data};
            }
        }
        
        if(codeforcesusername !== null && codeforcesusername !== "" ){
            const codeforcesdata = await axios.get(`/api/plateform/codeforces/${codeforcesusername}`);
            if(codeforcesdata.data.success === true){
                platformData = { ...platformData,"codeforcesdata":codeforcesdata?.data?.data};
            }
        }

        if(geeksforgeeksusername !== null && geeksforgeeksusername !== "" ){
            const gfgdata = await axios.get(`/api/plateform/gfg/${geeksforgeeksusername}`);
            if(gfgdata.data.success === true){
                platformData = { ...platformData,"gfgdata":gfgdata?.data?.data};
            }
        }
        try {
            const data = JSON.stringify(platformData);
            const res = await dbService.updateUserData({userId:userId},{data:data , fieldname:"platformData"})
        } catch (error) {
            console.log(error);
        }
        return platformData;

    } catch (error) {
        console.log(error);
        return null;
    }
}


export {fetchPlatformsUserData};