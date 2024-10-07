import { NextResponse } from "next/server";

export async function GET(request){
    const pathname = String(request?.url).substring(36)
    let username = pathname.replace("gfg/","");
    username = username.replace('plateform/' , "");
    try {
        // console.log(username);
        const data = await getGFGData(username);
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

async function getGFGData(username){
    const data = {
        username
    }
    return data;
}