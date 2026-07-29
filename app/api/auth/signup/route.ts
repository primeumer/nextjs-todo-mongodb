import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/mongodb";
import { isValidEmail, isValidPassword } from "@/lib/validator";
export async function POST(request: Request){
    const { email, password } = await request.json();
    if(!isValidEmail(email)){
        return NextResponse.json(
            { error: "Please Enter a valid email adress"},
            { status:400}
        );
    }
    if(!isValidPassword(password)){
        return NextResponse.json(
            {error: "Password must be atleast 8 characters"},
            { status:400 }
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
