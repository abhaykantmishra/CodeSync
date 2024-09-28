"use client";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";

export function Providers({children}){

  const location = usePathname();

    const [isLoggedin , setLogin] = useState(false);

    const isLogin = () => {
      let token;
      if(typeof window !== undefined){
        token = localStorage.getItem("accessToken")
      }
      try {
        const decodedtoken = jwt.verify(token , process.env.NEXT_PUBLIC_TOKEN_SECRET);
        if(decodedtoken){
          setLogin(true);
        }else{
          setLogin(false);
        }
      } catch (error) {
        setLogin(false)
      }
    }

    useEffect(() => {
      isLogin();
    } , [location])

    return (
        <div>
           <Navbar loginState={isLoggedin} >{children}</Navbar>
        </div>
    )
}