import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { Users } from "lucide-react";

export async function POST(request: Request){
    const {email, password } = await request.json();
    if(!email || !password){
        return NextResponse.json(
            {error: "Email and password are required"},
            {status: 400}
        );
    }
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({email});
    if(!user){
        return NextResponse.json(
            {error: "Invalid Email or Password"},
            {status: 400}
        );
    }
    const token = jwt.sign(
        { userId:user._id},
        process.env.JWT_SECRET as string,
        { expiresIn: "7d"}
    );
    const response = NextResponse.json({message:"Login Successfully"});
    response.cookies.set("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
    });
return response;
}