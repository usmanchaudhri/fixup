"use server";

import { cookies } from "next/headers";

export const getMe = async ()=>{
    const cookieStore = await cookies();


    const accessToken = cookieStore.get("accessToken")?.value;

    // console.log(accessToken)

    if(!accessToken){
        // throw new Error("User Not Logged In!")

        return{
            success: false,
            message: "User not logged in!"
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return {
                success: false,
                message: "User not logged in!"
            }
        }

        return await res.json();
    } catch {
        return {
            success: false,
            message: "User not logged in!"
        }
    }

}