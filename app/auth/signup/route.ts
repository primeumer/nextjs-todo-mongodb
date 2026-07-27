import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/mongodb";
export async function POST(request: Request){
    const { email, password } = await request.json();
    if(!email || !password){
        return NextResponse.json(
            { error: "Email and Password must Required"},
            { status:400}
        );
    }
    const db = await connectDB();
    const userCollection = db.collection("users");
    const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already esists"},
                {status:400}
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userCollection.insertOne({
            email,
            password: hashedPassword,
        });
        return NextResponse.json({message: "Account Successfully Created"});

    }
